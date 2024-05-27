import * as THREE from "three";
import React, { useRef, useEffect, useContext } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { Environment, useGLTF, Outlines } from "@react-three/drei";
import { Physics, useConvexPolyhedron } from "@react-three/cannon";
import { EffectComposer, N8AO, SMAA } from "@react-three/postprocessing";
import { useControls } from "leva";

// Model and Context
import { myContext } from "./ContextProvider";
import { ducks } from "../../data";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const rfs = THREE.MathUtils.randFloatSpread;

export const Cluster = () => {
  const { activeDuck } = useContext(myContext);

  const activeDuckUrl = ducks[activeDuck].path;
  console.log(activeDuckUrl);
  const model = useLoader(GLTFLoader, activeDuckUrl);
  const modelRef = useRef();

  return (
    <>
      <ambientLight intensity={0.5} />
      <color attach="background" args={["#dfdfdf"]} />
      <spotLight
        intensity={1}
        angle={0.2}
        penumbra={1}
        position={[30, 30, 30]}
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />
      <Physics gravity={[0, 2, 0]} iterations={10}>
        <Pointer />
        <Clump model={model} />
      </Physics>
      <Environment files="/adamsbridge.hdr" />
      <EffectComposer disableNormalPass multisampling={0}>
        <N8AO
          halfRes
          color="black"
          aoRadius={2}
          intensity={1}
          aoSamples={6}
          denoiseSamples={4}
        />
        <SMAA />
      </EffectComposer>
    </>
  );
};

function Clump({
  model,
  mat = new THREE.Matrix4(),
  vec = new THREE.Vector3(),
  ...props
}) {
  const { outlines } = useControls({
    outlines: { value: 0.0, step: 0.01, min: 0, max: 0.05 },
  });

  const { nodes, materials } = useGLTF(model); // Ensure the GLTF is preloaded

  const vertices = nodes.Duck.geometry.attributes.position.array;
  const faces = [];
  for (let i = 0; i < nodes.Duck.geometry.index.array.length; i += 3) {
    faces.push([
      nodes.Duck.geometry.index.array[i],
      nodes.Duck.geometry.index.array[i + 1],
      nodes.Duck.geometry.index.array[i + 2],
    ]);
  }

  const [ref, api] = useConvexPolyhedron(() => ({
    mass: 1,
    angularDamping: 0.1,
    linearDamping: 0.65,
    position: [rfs(20), rfs(20), rfs(20)],
    args: [vertices, faces],
  }));

  useFrame((state) => {
    for (let i = 0; i < 40; i++) {
      ref.current.getMatrixAt(i, mat);
      api
        .at(i)
        .applyForce(
          vec
            .setFromMatrixPosition(mat)
            .normalize()
            .multiplyScalar(-40)
            .toArray(),
          [0, 0, 0]
        );
    }
  });

  useEffect(() => {
    if (ref.current) {
      for (let i = 0; i < 40; i++) {
        ref.current.setMatrixAt(i, mat.identity());
      }
      ref.current.instanceMatrix.needsUpdate = true;
    }
  }, [ref]);

  return (
    <instancedMesh ref={ref} args={[null, null, 40]}>
      <primitive object={nodes.Duck.geometry} attach="geometry" />
      <primitive object={materials.Duck} attach="material" />
      <Outlines thickness={outlines} />
    </instancedMesh>
  );
}

function Pointer() {
  const viewport = useThree((state) => state.viewport);
  const [, api] = useConvexPolyhedron(() => ({
    type: "Kinematic",
    args: [3],
    position: [0, 0, 0],
  }));

  return useFrame((state) =>
    api.position.set(
      (state.mouse.x * viewport.width) / 2,
      (state.mouse.y * viewport.height) / 2,
      0
    )
  );
}

// Ensure the GLTF model path is correct
useGLTF.preload("/path/to/duck/model.gltf");
