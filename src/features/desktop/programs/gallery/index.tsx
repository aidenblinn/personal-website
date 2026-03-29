import React, { useEffect, useState, useRef } from "react";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import { Text3D, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { isMobileDevice } from "@/utils/deviceTypeUtils";
import { useAppSelector } from "@/app/hooks";

const Floor = ({ width }: { width: number }) => {
  const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] =
    useTexture([
      "img/gallery/floorTexture/Floor_BaseColor.png",
      "img/gallery/floorTexture/Floor_Displacement.png",
      "img/gallery/floorTexture/Floor_Normal.png",
      "img/gallery/floorTexture/Floor_Roughness.png",
      "img/gallery/floorTexture/Floor_AmbientOcclusion.png",
    ]).map((meshMap) => {
      meshMap.wrapS = THREE.RepeatWrapping;
      meshMap.wrapT = THREE.RepeatWrapping;
      meshMap.repeat.set(width, width);
      return meshMap;
    });

  return (
    <mesh
      position={[0, -1, 0]}
      rotation-x={-Math.PI / 2}
      scale={[width, width, 0]}
    >
      <planeGeometry />
      <meshStandardMaterial
        map={colorMap}
        displacementMap={displacementMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        aoMap={aoMap}
      />
    </mesh>
  );
};

const Wall = ({
  position,
  rotation,
  width,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  width: number;
}) => {
  const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] =
    useTexture([
      "img/gallery/wallTexture/Brick_BaseColor.png",
      "img/gallery/wallTexture/Brick_Displacement.png",
      "img/gallery/wallTexture/Brick_Normal.png",
      "img/gallery/wallTexture/Brick_Roughness.png",
      "img/gallery/wallTexture/Brick_AmbientOcclusion.png",
    ]).map((meshMap) => {
      meshMap.wrapS = THREE.RepeatWrapping;
      meshMap.wrapT = THREE.RepeatWrapping;
      meshMap.repeat.set(width / 2, width / 2);
      return meshMap;
    });

  return (
    <mesh position={position} rotation={rotation} scale={[width, width * 2, 0]}>
      <planeGeometry />
      <meshStandardMaterial
        map={colorMap}
        displacementMap={displacementMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        aoMap={aoMap}
      />
    </mesh>
  );
};

const SpinningText = () => {
  const welcomeText = useRef<THREE.Mesh>(null!);
  const instructionText = useRef<THREE.Mesh>(null!);
  const texture = useTexture("img/gallery/metalMatcap.png");

  useEffect(() => {
    if (welcomeText !== null) {
      welcomeText.current?.geometry?.computeBoundingBox();
      const boundingBox = welcomeText.current.geometry.boundingBox;
      const center = new THREE.Vector3();
      boundingBox?.getCenter(center);
      welcomeText.current.geometry.translate(-center.x, -center.y, -center.z);
    }
    if (instructionText !== null) {
      instructionText.current?.geometry?.computeBoundingBox();
      const boundingBox = instructionText.current.geometry.boundingBox;
      const center = new THREE.Vector3();
      boundingBox?.getCenter(center);
      instructionText.current.geometry.translate(
        -center.x,
        -center.y,
        -center.z
      );
    }
  }, [welcomeText, instructionText]);

  useFrame(({ clock }) => {
    welcomeText.current.rotation.y = clock.getElapsedTime() / 2;
    instructionText.current.rotation.y = clock.getElapsedTime();
  });

  return (
    <group>
      <Text3D
        font="fonts/windows-xp-tahoma.json"
        size={0.75}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
        ref={welcomeText}
      >
        Welcome!
        <meshMatcapMaterial matcap={texture} />
      </Text3D>
      <Text3D
        font="fonts/windows-xp-tahoma.json"
        size={0.3}
        height={0.1}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
        ref={instructionText}
        position={[0, -0.5, 0]}
      >
        &lt;use arrow keys to move&gt;
        <meshMatcapMaterial matcap={texture} />
      </Text3D>
    </group>
  );
};

/** A framed photo. Frame backing sits flush on the wall; photo is inset 0.01
 *  units in front to avoid z-fighting. Height is derived from the photo's
 *  actual aspect ratio so cropped images display without distortion. */
const PhotoFrame = ({
  position,
  rotation,
  texture,
  width,
  aspectRatio,
  frameColor,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  texture: THREE.Texture;
  width: number;
  aspectRatio: number;
  frameColor: string;
}) => {
  const height = width / aspectRatio;
  const border = 0.08;
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color={frameColor} />
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[width - border * 2, height - border * 2]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </group>
  );
};

/** Batch-loads all photo textures and renders every frame in the gallery. */
const PhotoFrames = () => {
  // Textures indexed 0–12 corresponding to photo-2 through photo-14
  // (photo-1 was removed; photo-10 is the wide panoramic shot)
  const textures = useTexture([
    "img/gallery/photos/photo-2.jpg",  // 0  AR≈1.32
    "img/gallery/photos/photo-3.jpg",  // 1  AR≈1.30
    "img/gallery/photos/photo-4.jpg",  // 2  AR≈1.51
    "img/gallery/photos/photo-5.jpg",  // 3  AR≈1.51
    "img/gallery/photos/photo-6.jpg",  // 4  AR≈1.51
    "img/gallery/photos/photo-7.jpg",  // 5  AR≈1.34
    "img/gallery/photos/photo-8.jpg",  // 6  AR≈1.50
    "img/gallery/photos/photo-9.jpg",  // 7  AR≈1.51
    "img/gallery/photos/photo-10.jpg", // 8  AR≈2.11  (panoramic)
    "img/gallery/photos/photo-11.jpg", // 9  AR≈1.51
    "img/gallery/photos/photo-12.jpg", // 10 AR≈1.50
    "img/gallery/photos/photo-13.jpg", // 11 AR≈1.51
    "img/gallery/photos/photo-14.jpg", // 12 AR≈1.51
  ]);

  const frames: {
    position: [number, number, number];
    rotation: [number, number, number];
    width: number;
    aspectRatio: number;
    frameColor: string;
    photoIndex: number;
  }[] = [
    // ── Front wall (z = -4.99, faces +z toward centre) ──────────────────────
    { position: [-3.3, 0.8, -4.99], rotation: [0, 0, 0], width: 1.8, aspectRatio: 1.324, frameColor: "#8b4513", photoIndex: 0  }, // photo-2  saddle-brown
    { position: [-0.2, 1.3, -4.99], rotation: [0, 0, 0], width: 2.4, aspectRatio: 1.509, frameColor: "#d4af37", photoIndex: 2  }, // photo-4  gold
    { position: [ 1.5, 3.1, -4.99], rotation: [0, 0, 0], width: 1.2, aspectRatio: 1.509, frameColor: "#c0c0c0", photoIndex: 4  }, // photo-6  silver – high
    { position: [ 3.3, 2.2, -4.99], rotation: [0, 0, 0], width: 1.8, aspectRatio: 1.508, frameColor: "#8b4513", photoIndex: 9  }, // photo-11 saddle-brown – higher right

    // ── Back wall (z = +4.99, faces -z toward centre) ────────────────────────
    { position: [ 3.2, 0.8,  4.99], rotation: [0, Math.PI, 0], width: 1.8, aspectRatio: 1.296, frameColor: "#2c2c2c", photoIndex: 1  }, // photo-3  charcoal
    { position: [ 0.0, 1.3,  4.99], rotation: [0, Math.PI, 0], width: 2.4, aspectRatio: 1.509, frameColor: "#1a0f05", photoIndex: 3  }, // photo-5  dark wood
    { position: [-3.0, 2.6,  4.99], rotation: [0, Math.PI, 0], width: 1.8, aspectRatio: 1.500, frameColor: "#ffffff", photoIndex: 10 }, // photo-12 white – high

    // ── Left wall (x = -4.99, faces +x toward centre) ────────────────────────
    { position: [-4.99, 0.9, -2.2], rotation: [0,  Math.PI / 2, 0], width: 1.8, aspectRatio: 1.337, frameColor: "#d4af37", photoIndex: 5  }, // photo-7  gold
    { position: [-4.99, 2.3,  0.4], rotation: [0,  Math.PI / 2, 0], width: 2.8, aspectRatio: 2.107, frameColor: "#c0c0c0", photoIndex: 8  }, // photo-10 silver – panoramic high
    { position: [-4.99, 1.0,  2.8], rotation: [0,  Math.PI / 2, 0], width: 1.2, aspectRatio: 1.508, frameColor: "#1a0f05", photoIndex: 11 }, // photo-13 dark wood

    // ── Right wall (x = +4.99, faces -x toward centre) ───────────────────────
    { position: [ 4.99, 1.3,  0.0], rotation: [0, -Math.PI / 2, 0], width: 2.4, aspectRatio: 1.501, frameColor: "#1c3a1c", photoIndex: 6  }, // photo-8  dark green – centrepiece
    { position: [ 4.99, 2.6, -2.0], rotation: [0, -Math.PI / 2, 0], width: 1.8, aspectRatio: 1.509, frameColor: "#2c2c2c", photoIndex: 7  }, // photo-9  charcoal – high
    { position: [ 4.99, 0.8,  2.5], rotation: [0, -Math.PI / 2, 0], width: 1.2, aspectRatio: 1.509, frameColor: "#d4af37", photoIndex: 12 }, // photo-14 gold
  ];

  return (
    <>
      {frames.map((frame, i) => (
        <PhotoFrame
          key={i}
          position={frame.position}
          rotation={frame.rotation}
          texture={textures[frame.photoIndex]}
          width={frame.width}
          aspectRatio={frame.aspectRatio}
          frameColor={frame.frameColor}
        />
      ))}
    </>
  );
};

function Gallery({
  moveForward,
  moveBackward,
  rotateLeft,
  rotateRight,
}: {
  moveForward: boolean;
  moveBackward: boolean;
  rotateLeft: boolean;
  rotateRight: boolean;
}) {
  const { camera } = useThree();
  const floorWidth = 10;

  useFrame(() => {
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);

    if (moveForward) {
      camera.position.addScaledVector(direction, 0.1);
    } else if (moveBackward) {
      camera.position.addScaledVector(direction, -0.1);
    }

    if (rotateLeft) {
      camera.rotation.y += 0.02;
    } else if (rotateRight) {
      camera.rotation.y -= 0.02;
    }

    const cameraBoundary = 0.92 * (floorWidth / 2);
    camera.position.x = THREE.MathUtils.clamp(camera.position.x, -cameraBoundary, cameraBoundary);
    camera.position.z = THREE.MathUtils.clamp(camera.position.z, -cameraBoundary, cameraBoundary);
    camera.updateProjectionMatrix();
  });

  return (
    <React.Fragment>
      <ambientLight color="white" intensity={4} />
      <SpinningText />
      <Floor width={floorWidth} />
      <Wall position={[0, 0, -floorWidth / 2]} rotation={[0, 0, 0]}            width={floorWidth} />
      <Wall position={[0, 0,  floorWidth / 2]} rotation={[0, Math.PI, 0]}      width={floorWidth} />
      <Wall position={[-floorWidth / 2, 0, 0]} rotation={[0,  Math.PI / 2, 0]} width={floorWidth} />
      <Wall position={[ floorWidth / 2, 0, 0]} rotation={[0, -Math.PI / 2, 0]} width={floorWidth} />
      <PhotoFrames />
    </React.Fragment>
  );
}

const buttonStyles =
  "w-12 h-12 rounded-lg bg-gray-800 bg-opacity-50 text-white border-none flex items-center justify-center cursor-pointer m-1";

const MobileControls = ({
  handleKeyDown,
  handleKeyUp,
}: {
  handleKeyDown: (key: string) => void;
  handleKeyUp: (key: string) => void;
}) => (
  <div className="fixed bottom-5 left-5 z-50 flex flex-col items-center">
    <div className="flex flex-col items-center">
      <button className={buttonStyles} onTouchStart={() => handleKeyDown("ArrowUp")}    onTouchEnd={() => handleKeyUp("ArrowUp")}>↑</button>
      <div className="flex flex-row">
        <button className={buttonStyles} onTouchStart={() => handleKeyDown("ArrowLeft")}  onTouchEnd={() => handleKeyUp("ArrowLeft")}>←</button>
        <button className={buttonStyles} onTouchStart={() => handleKeyDown("ArrowRight")} onTouchEnd={() => handleKeyUp("ArrowRight")}>→</button>
      </div>
      <button className={buttonStyles} onTouchStart={() => handleKeyDown("ArrowDown")}  onTouchEnd={() => handleKeyUp("ArrowDown")}>↓</button>
    </div>
  </div>
);

export default function App() {
  const [moveForward,  setMoveForward]  = useState(false);
  const [moveBackward, setMoveBackward] = useState(false);
  const [rotateLeft,   setRotateLeft]   = useState(false);
  const [rotateRight,  setRotateRight]  = useState(false);

  const isActiveProgram =
    useAppSelector((state) => state.programs.activeProgram) === "Gallery";
  const isActiveProgramRef = useRef(isActiveProgram);

  useEffect(() => {
    isActiveProgramRef.current = isActiveProgram;
  }, [isActiveProgram]);

  const handleKeyDown = (key: string) => {
    if (isActiveProgramRef.current) {
      if      (key === "ArrowUp")    { setMoveBackward(false); setMoveForward(true);  }
      else if (key === "ArrowDown")  { setMoveForward(false);  setMoveBackward(true); }
      else if (key === "ArrowLeft")  { setRotateRight(false);  setRotateLeft(true);   }
      else if (key === "ArrowRight") { setRotateLeft(false);   setRotateRight(true);  }
    }
  };

  const handleKeyUp = (key: string) => {
    if      (key === "ArrowUp")    setMoveForward(false);
    else if (key === "ArrowDown")  setMoveBackward(false);
    else if (key === "ArrowLeft")  setRotateLeft(false);
    else if (key === "ArrowRight") setRotateRight(false);
  };

  useEffect(() => {
    const keyDownEvent = (e: KeyboardEvent) => handleKeyDown(e.key);
    const keyUpEvent   = (e: KeyboardEvent) => handleKeyUp(e.key);
    window.addEventListener("keydown", keyDownEvent);
    window.addEventListener("keyup",   keyUpEvent);
    return () => {
      window.removeEventListener("keydown", keyDownEvent);
      window.removeEventListener("keyup",   keyUpEvent);
    };
  }, []);

  return (
    <>
      <Canvas>
        <Gallery
          moveForward={moveForward}
          moveBackward={moveBackward}
          rotateLeft={rotateLeft}
          rotateRight={rotateRight}
        />
      </Canvas>
      {isMobileDevice && (
        <MobileControls handleKeyDown={handleKeyDown} handleKeyUp={handleKeyUp} />
      )}
    </>
  );
}
