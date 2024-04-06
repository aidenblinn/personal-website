import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import * as dat from "lil-gui";
import ResizeObserver from "resize-observer-polyfill";
import { debounce } from "lodash";

export default function Gallery(): React.ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    /* GUI controls for debugging  */
    const gui = new dat.GUI();

    /* Scene */
    const scene = new THREE.Scene();

    // Add box to scene
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
      new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );
    scene.add(mesh);

    /* Camera */
    const camera = new THREE.PerspectiveCamera(
      75,
      canvasRef.current.offsetWidth / canvasRef.current.offsetHeight,
      0.1,
      1000
    );
    camera.position.z = 3;
    camera.lookAt(mesh.position);
    scene.add(camera);

    /* Renderer */
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
    });
    renderer.setSize(
      canvasRef.current.offsetWidth,
      canvasRef.current.offsetHeight
    );

    /* Controls */
    const controls = new OrbitControls(camera, canvasRef.current);

    /* Modal resize responsiveness */
    // Listen to modal resizing events
    const resizeObserver = new ResizeObserver(
      // Throttle camera / renderer updates using debounce
      debounce((entries: ResizeObserverEntry[]) => {
        for (const entry of entries) {
          // Update camera dimensions
          const { width, height } = entry.contentRect;
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          // Update render to fill new modal size
          renderer.setSize(width, height);
        }
      }, 5)
    );
    resizeObserver.observe(canvasRef.current);

    /* Animation */
    const tick = () => {
      if (!canvasRef.current) return;
      controls.update();
      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };
    tick();

    return () => {
      renderer.dispose();
      gui.destroy();
    };
  });

  return <canvas ref={canvasRef} className="!w-full !h-full" />;
}
