import * as THREE from "three";
import React, { useRef, useEffect } from "react";
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
  const { activeDuck } = myContext();

  const activeDuckUrl = ducks[activeDuck].path;

  useEffect(() => {
    // Preload the active duck model
    useGLTF.preload(activeDuckUrl, GLTFLoader);
  }, [activeDuckUrl]);

  const model = useLoader(GLTFLoader, activeDuckUrl);

  const geometry =
    model.nodes.Sketchfab_model.children[0].children[0].children[0].geometry;

  console.log(model);
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
        <Pointer geometry={geometry} />
        <Clump
          model={model}
          geometry={geometry}
          activeDuckUrl={activeDuckUrl}
        />
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
