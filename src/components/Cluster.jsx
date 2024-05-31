import * as THREE from "three";
import React, { useRef, useEffect, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import { EffectComposer, N8AO, SMAA } from "@react-three/postprocessing";
import {} from "leva";

// Model and Context
import { myContext } from "./ContextProvider";
import { ducks } from "../../data";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import Clump from "./Clump";
import { Pointer } from "./Clump";

export const Cluster = () => {
  // const [isScaled, setIsScaled] = useState(false);
  const { activeDuck } = myContext();

  const [isScaled, setIsScaled] = useState(false);

  let activeDuckUrl;

  if (activeDuck === 3 || activeDuck === 4) {
    activeDuckUrl = ducks[0].path;
  } else {
    activeDuckUrl = ducks[activeDuck].path;
  }

  let geometry;
  let material;
  let duckScalar;

  useEffect(() => {
    // Preload the active duck model
    useGLTF.preload(activeDuckUrl, GLTFLoader);
  }, [activeDuckUrl]);

  const model = useLoader(GLTFLoader, activeDuckUrl);

  console.log(model);

  if (activeDuck === 0 || activeDuck === 3 || activeDuck === 4) {
    geometry =
      model.nodes.Sketchfab_model.children[0].children[0].children[0].geometry;
    material = model.materials.material;
    duckScalar = 0.01;
  } else if (activeDuck == 1) {
    geometry = model.nodes.Duckstage21_Material001_0.geometry;
    material = model.materials["Material.001"];
    duckScalar = 0.6;
  } else if (activeDuck == 2) {
    geometry = model.nodes.Ducksaw.children[0].geometry;
    material = model.materials["Ducksaw.001"];
    duckScalar = 0.35;
  } else if (activeDuck == 5) {
    geometry =
      model.nodes.Sketchfab_model.children[0].children[0].children[0].geometry;
    material = model.materials.material;
    duckScalar = 0.01;
  }

  function scaleGeometry() {
    geometry.scale(duckScalar, duckScalar, duckScalar);
    setIsScaled(true);
  }

  useEffect(() => {
    if (geometry) {
      scaleGeometry();
    }
  }, [geometry]);

  // console.log(model);

  return (
    <>
      <ambientLight intensity={0.5} />
      {/* <color attach="background" args={["#dfdfdf"]} /> */}
      <spotLight
        intensity={0.5}
        angle={0.2}
        penumbra={1}
        position={[30, 30, 30]}
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />

      {model && geometry && isScaled ? (
        <Physics gravity={[0, 2, 0]} iterations={10}>
          <Pointer geometry={geometry} />
          <Clump
            geometry={geometry}
            material={material}
            activeDuckUrl={activeDuckUrl}
          />
        </Physics>
      ) : (
        ""
      )}
      <Environment files="/adamsbridge.hdr" />
      {/* <EffectComposer disableNormalPass multisampling={0}>
        <N8AO
          halfRes
          color="black"
          aoRadius={2}
          intensity={1}
          aoSamples={6}
          denoiseSamples={4}
        />
        <SMAA />
      </EffectComposer> */}
    </>
  );
};
