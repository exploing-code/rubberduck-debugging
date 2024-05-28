import * as THREE from "three";
import React, { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Outlines } from "@react-three/drei";
import { useConvexPolyhedron, useSphere } from "@react-three/cannon";
import { useControls } from "leva";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const rfs = THREE.MathUtils.randFloatSpread;

export default function Clump({
  geometry,
  activeDuckUrl,
  mat = new THREE.Matrix4(),
  vec = new THREE.Vector3(),
  ...props
}) {
  const { outlines } = useControls({
    outlines: { value: 0.0, step: 0.01, min: 0, max: 0.05 },
  });

  // State to track if the geometry is loaded
  const [isGeometryLoaded, setIsGeometryLoaded] = useState(false);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      activeDuckUrl,
      (gltf) => {
        setIsGeometryLoaded(true);
      },
      undefined,
      (error) => {
        console.error("Error loading GLTF model:", error);
      }
    );
  }, [activeDuckUrl]);

  useEffect(() => {
    if (isGeometryLoaded) {
      // Proceed with other hooks that depend on geometry
      const { nodes, materials } = useGLTF(activeDuckUrl);

      // Extract vertices
      const vertices = Array.from(geometry.attributes.position.array);

      // Extract faces from the index
      const indices = Array.from(geometry.index.array);
      const faces = [];
      for (let i = 0; i < indices.length; i += 3) {
        faces.push([indices[i], indices[i + 1], indices[i + 2]]);
      }

      // Further processing...
    }
  }, [isGeometryLoaded]);

  const { nodes, materials } = useGLTF(activeDuckUrl);

  // Extract vertices
  const vertices = Array.from(geometry.attributes.position.array);

  // Extract faces from the index
  const indices = Array.from(geometry.index.array);
  const faces = [];
  for (let i = 0; i < indices.length; i += 3) {
    faces.push([indices[i], indices[i + 1], indices[i + 2]]);
  }

  // console.log("Vertices: ", vertices);
  // console.log("Faces: ", faces);

  const ref = useRef();
  const [, api] = useConvexPolyhedron(() => ({
    mass: 1,
    angularDamping: 0.1,
    linearDamping: 0.65,
    position: [rfs(20), rfs(20), rfs(20)],
    args: [vertices, faces],
  }));

  useEffect(() => {
    // Access api here, after it's been initialized
    console.log("API:", api); // Log the API object
    console.log("API properties:", Object.keys(api)); // Log the keys of the API object
  }, [api]); // Make sure to include api in the dependency array

  useFrame(() => {
    if (ref.current) {
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
    } else {
      console.error("ref.current is null in useFrame");
    }
  });

  useEffect(() => {
    if (ref.current) {
      for (let i = 0; i < 40; i++) {
        ref.current.setMatrixAt(i, mat.identity());
      }
      ref.current.instanceMatrix.needsUpdate = true;
    } else {
      console.error("ref.current is null in useEffect");
    }
  }, [ref]);

  return (
    <instancedMesh ref={ref} args={[null, null, 40]}>
      <bufferGeometry attach="geometry" {...geometry} />
      <primitive object={materials.material} attach="material" />
      <Outlines thickness={outlines} />
    </instancedMesh>
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
