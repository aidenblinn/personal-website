import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { OrbitControls, Text3D, useTexture } from "@react-three/drei";
import * as THREE from "three";

const Floor = () => {
  const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] =
    useTexture([
      "img/gallery/floorTexture/Substance_Graph_BaseColor.jpg",
      "img/gallery/floorTexture/Substance_Graph_Displacement.jpg",
      "img/gallery/floorTexture/Substance_Graph_Normal.jpg",
      "img/gallery/floorTexture/Substance_Graph_Roughness.jpg",
      "img/gallery/floorTexture/Substance_Graph_AmbientOcclusion.jpg",
    ]).map((meshMap) => {
      meshMap.wrapS = THREE.RepeatWrapping;
      meshMap.wrapT = THREE.RepeatWrapping;
      meshMap.repeat.set(10, 10);
      return meshMap;
    });

  return (
    <mesh position={[0, -1, 0]} rotation-x={-Math.PI / 2} scale={[10, 10, 0]}>
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

const MatcapTexture = ({ location }: { location: string }) => {
  const welcomeText = useRef<THREE.Mesh>(null!);
  const texture = useTexture(location);

  useEffect(() => {
    if (welcomeText !== null) {
      welcomeText.current?.geometry?.computeBoundingBox();
      const boundingBox = welcomeText.current.geometry.boundingBox;
      const center = new THREE.Vector3();
      boundingBox?.getCenter(center);
      welcomeText.current.geometry.translate(-center.x, -center.y, -center.z);
    }
  }, [welcomeText]);

  useFrame(({ clock }) => {
    welcomeText.current.rotation.y = clock.getElapsedTime();
  });

  return (
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
  );
};

export default function Gallery() {
  return (
    <Canvas>
      <OrbitControls makeDefault />
      <ambientLight color="white" intensity={4} />
      <MatcapTexture location={"img/gallery/metalMatcap.png"} />
      <Floor />
    </Canvas>
  );
}
