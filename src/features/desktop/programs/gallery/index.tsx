import React, { useEffect, useState, useRef } from "react";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import { Text3D, useTexture } from "@react-three/drei";
import * as THREE from "three";

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

function Gallery() {
  const { camera } = useThree();
  const [moveForward, setMoveForward] = useState(false);
  const [moveBackward, setMoveBackward] = useState(false);
  const [rotateLeft, setRotateLeft] = useState(false);
  const [rotateRight, setRotateRight] = useState(false);

  const floorWidth = 10;

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowUp") {
      setMoveBackward(false);
      setMoveForward(true);
    } else if (event.key === "ArrowDown") {
      setMoveForward(false);
      setMoveBackward(true);
    } else if (event.key === "ArrowLeft") {
      setRotateRight(false);
      setRotateLeft(true);
    } else if (event.key === "ArrowRight") {
      setRotateLeft(false);
      setRotateRight(true);
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === "ArrowUp") {
      setMoveForward(false);
    } else if (event.key === "ArrowDown") {
      setMoveBackward(false);
    } else if (event.key === "ArrowLeft") {
      setRotateLeft(false);
    } else if (event.key === "ArrowRight") {
      setRotateRight(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

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
    camera.position.x = THREE.MathUtils.clamp(
      camera.position.x,
      -cameraBoundary,
      cameraBoundary
    );
    camera.position.z = THREE.MathUtils.clamp(
      camera.position.z,
      -cameraBoundary,
      cameraBoundary
    );

    camera.updateProjectionMatrix();
  });

  return (
    <React.Fragment>
      <ambientLight color="white" intensity={4} />
      <MatcapTexture location={"img/gallery/metalMatcap.png"} />
      <Floor width={floorWidth} />
      <Wall
        position={[0, 0, -floorWidth / 2]}
        rotation={[0, 0, 0]}
        width={floorWidth}
      />{" "}
      {/* Front wall */}
      <Wall
        position={[0, 0, floorWidth / 2]}
        rotation={[0, Math.PI, 0]}
        width={floorWidth}
      />{" "}
      {/* Back wall */}
      <Wall
        position={[-floorWidth / 2, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        width={floorWidth}
      />{" "}
      {/* Left wall */}
      <Wall
        position={[floorWidth / 2, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        width={floorWidth}
      />{" "}
      {/* Right wall */}
    </React.Fragment>
  );
}

export default function App() {
  return (
    <Canvas>
      <Gallery />
    </Canvas>
  );
}
