import * as THREE from "three";
import React, { useEffect, useRef, useState } from "react";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import { useGLTF, useTexture, Outlines } from "@react-three/drei";
import { useSphere } from "@react-three/cannon";
import { useControls } from "leva";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { myContext } from "./ContextProvider";
import { ducks } from "../../data";

const rfs = THREE.MathUtils.randFloatSpread;

export default function Clump({
  geometry,
  material,
  mat = new THREE.Matrix4(),
  vec = new THREE.Vector3(),
  ...props
}) {
  const DUCKNUMBER = 10;

  const [ref, api] = useSphere(() => ({
    args: [1.4],
    mass: 1,
    angularDamping: 0.1,
    linearDamping: 0.65,
    position: [rfs(20), rfs(20), rfs(20)],
  }));

  useFrame((state) => {
    for (let i = 0; i < DUCKNUMBER; i++) {
      // Get current whereabouts of the instanced sphere
      ref.current.getMatrixAt(i, mat);
      // Normalize the position and multiply by a negative force.
      // This is enough to drive it towards the center-point.
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

  return (
    <instancedMesh
      ref={ref}
      castShadow
      receiveShadow
      args={[geometry, material, DUCKNUMBER]}
    ></instancedMesh>
  );
}

export function Pointer() {
  const viewport = useThree((state) => state.viewport);
  const [, api] = useSphere(() => ({
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
