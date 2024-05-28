import * as THREE from "three";
import React, { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useTexture, Outlines } from "@react-three/drei";
import { useSphere } from "@react-three/cannon";
import { useControls } from "leva";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const rfs = THREE.MathUtils.randFloatSpread;

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const baubleMaterial = new THREE.MeshStandardMaterial({
  color: "white",
  roughness: 0,
  envMapIntensity: 1,
});

export default function Clump({
  geometry,
  model,
  mat = new THREE.Matrix4(),
  vec = new THREE.Vector3(),
  ...props
}) {
  const { outlines } = useControls({
    outlines: { value: 0.0, step: 0.01, min: 0, max: 0.05 },
  });
  const material = model.materials.material;

  const [ref, api] = useSphere(() => ({
    args: [1],
    mass: 1,
    angularDamping: 0.1,
    linearDamping: 0.65,
    position: [rfs(20), rfs(20), rfs(20)],
  }));
  useFrame((state) => {
    for (let i = 0; i < 40; i++) {
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
      args={[geometry, material, 40]} // Use the provided geometry prop
      // material-map={texture}
      scale={[0.01, 0.01, 0.01]} // Scale the entire instanced mesh
    >
      <Outlines thickness={outlines} />
    </instancedMesh>
  );
}

export function Pointer() {
  const viewport = useThree((state) => state.viewport);
  const [, api] = useSphere(() => ({
    type: "Kinematic",
    args: [50],
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