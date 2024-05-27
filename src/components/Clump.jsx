import * as THREE from "three";
import React, { useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Outlines } from "@react-three/drei";
import { useConvexPolyhedron } from "@react-three/cannon";
import { useControls } from "leva";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const rfs = THREE.MathUtils.randFloatSpread;

export default function Clump({
  model,
  geometry,
  activeDuckUrl,
  mat = new THREE.Matrix4(),
  vec = new THREE.Vector3(),
  ...props
}) {
  const { outlines } = useControls({
    outlines: { value: 0.0, step: 0.01, min: 0, max: 0.05 },
  });

  useEffect(() => {
    // Preload the active duck model
    useGLTF.preload(activeDuckUrl, GLTFLoader);
  }, [activeDuckUrl]);

  const { nodes, materials } = useGLTF(activeDuckUrl); // Ensure the GLTF is preloaded

  const vertices = geometry.attributes.position.array;
  const faces = [];
  for (let i = 0; i < geometry.index.array.length; i += 3) {
    faces.push([
      geometry.index.array[i],
      geometry.index.array[i + 1],
      geometry.index.array[i + 2],
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
      <primitive object={geometry} attach="geometry" />
      <primitive object={materials.material} attach="material" />
      <Outlines thickness={outlines} />
    </instancedMesh>
  );
}

export function Pointer({ geometry }) {
  const vertices = geometry.attributes.position.array;

  const viewport = useThree((state) => state.viewport);
  const [ref, api] = useConvexPolyhedron(() => ({
    type: "Kinematic",
    args: vertices.map((v, index) => [
      vertices[index * 3],
      vertices[index * 3 + 1],
      vertices[index * 3 + 2],
    ]),
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
