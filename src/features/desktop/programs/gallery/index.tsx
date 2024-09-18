import React, { useEffect, useState, useRef } from "react";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import { Text3D, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { isMobileDevice } from "@/utils/deviceTypeUtils";
import { useAppSelector } from "@/app/hooks";

const Floor = ({ width }: { width: number }) => {
  // Import floor textures
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
  // Import wall textures
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

  // Center welcome and instruction text in gallery
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

  // Rotate texts continuously
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

    // Move camera based on arrow key input
    if (moveForward) {
      camera.position.addScaledVector(direction, 0.1);
    } else if (moveBackward) {
      camera.position.addScaledVector(direction, -0.1);
    }

    // Rotate camera based on arrow key input
    if (rotateLeft) {
      camera.rotation.y += 0.02;
    } else if (rotateRight) {
      camera.rotation.y -= 0.02;
    }

    // Keep camera within gallery boundaries
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

  // Render gallery components
  return (
    <React.Fragment>
      <ambientLight color="white" intensity={4} />
      {/* Spinning welcome / instruction text */}
      <SpinningText />
      <Floor width={floorWidth} />
      {/* Render a wall joined to each edge of the floor */}
      <Wall
        position={[0, 0, -floorWidth / 2]}
        rotation={[0, 0, 0]}
        width={floorWidth}
      />
      <Wall
        position={[0, 0, floorWidth / 2]}
        rotation={[0, Math.PI, 0]}
        width={floorWidth}
      />
      <Wall
        position={[-floorWidth / 2, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        width={floorWidth}
      />
      <Wall
        position={[floorWidth / 2, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        width={floorWidth}
      />
    </React.Fragment>
  );
}

const buttonStyles =
  "w-12 h-12 rounded-lg bg-gray-800 bg-opacity-50 text-white border-none flex items-center justify-center cursor-pointer m-1";

// Arrow key buttons for mobile phone movement
const MobileControls = ({
  handleKeyDown,
  handleKeyUp,
}: {
  handleKeyDown: (key: string) => void;
  handleKeyUp: (key: string) => void;
}) => (
  <div className="fixed bottom-5 left-5 z-50 flex flex-col items-center">
    <div className="flex flex-col items-center">
      <button
        className={buttonStyles}
        onTouchStart={() => handleKeyDown("ArrowUp")}
        onTouchEnd={() => handleKeyUp("ArrowUp")}
      >
        ↑
      </button>
      <div className="flex flex-row">
        <button
          className={buttonStyles}
          onTouchStart={() => handleKeyDown("ArrowLeft")}
          onTouchEnd={() => handleKeyUp("ArrowLeft")}
        >
          ←
        </button>
        <button
          className={buttonStyles}
          onTouchStart={() => handleKeyDown("ArrowRight")}
          onTouchEnd={() => handleKeyUp("ArrowRight")}
        >
          →
        </button>
      </div>
      <button
        className={buttonStyles}
        onTouchStart={() => handleKeyDown("ArrowDown")}
        onTouchEnd={() => handleKeyUp("ArrowDown")}
      >
        ↓
      </button>
    </div>
  </div>
);

export default function App() {
  const [moveForward, setMoveForward] = useState(false);
  const [moveBackward, setMoveBackward] = useState(false);
  const [rotateLeft, setRotateLeft] = useState(false);
  const [rotateRight, setRotateRight] = useState(false);

  // Only initiate movement if Gallery is active program
  const isActiveProgram =
    useAppSelector((state) => state.active.activeProgram) === "Gallery";
  const isActiveProgramRef = useRef(isActiveProgram);

  // Update active program ref when active program changes
  useEffect(() => {
    isActiveProgramRef.current = isActiveProgram;
  }, [isActiveProgram]);

  // Update camera movement / rotation based on arrow key input
  const handleKeyDown = (key: string) => {
    // Only initiate movement if Gallery is active program
    if (isActiveProgramRef.current) {
      if (key === "ArrowUp") {
        setMoveBackward(false);
        setMoveForward(true);
      } else if (key === "ArrowDown") {
        setMoveForward(false);
        setMoveBackward(true);
      } else if (key === "ArrowLeft") {
        setRotateRight(false);
        setRotateLeft(true);
      } else if (key === "ArrowRight") {
        setRotateLeft(false);
        setRotateRight(true);
      }
    }
  };

  const handleKeyUp = (key: string) => {
    if (key === "ArrowUp") {
      setMoveForward(false);
    } else if (key === "ArrowDown") {
      setMoveBackward(false);
    } else if (key === "ArrowLeft") {
      setRotateLeft(false);
    } else if (key === "ArrowRight") {
      setRotateRight(false);
    }
  };

  useEffect(() => {
    // Add key event listeners for desktop movement throughout gallery
    const keyDownEvent = (event: KeyboardEvent) => handleKeyDown(event.key);
    const keyUpEvent = (event: KeyboardEvent) => handleKeyUp(event.key);

    window.addEventListener("keydown", keyDownEvent);
    window.addEventListener("keyup", keyUpEvent);

    return () => {
      // Remove key event listeners when component unmounts
      window.removeEventListener("keydown", keyDownEvent);
      window.removeEventListener("keyup", keyUpEvent);
    };
  }, []);

  // Render gallery inside of canvas
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
      {/* Render mobile controls for mobile devices */}
      {isMobileDevice && (
        <MobileControls
          handleKeyDown={handleKeyDown}
          handleKeyUp={handleKeyUp}
        />
      )}
    </>
  );
}
