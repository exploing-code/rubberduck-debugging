// libraries
import { Canvas } from "@react-three/fiber";
import React, { useContext, useRef, useState } from "react";

// data
import { ducks } from "../data";

// components
import Experience from "./components/Experience";
import { Cluster } from "./components/Cluster";

// sections
import Hero from "./sections/Hero";
import CharSelectSection from "./sections/CharSelection";
import DescSectionOne from "./sections/DescSectionOne";
import DescSectionTwo from "./sections/DescSectionTwo";
import DescSectionThree from "./sections/DescSectionThree";
import AudioVisualizer from "./sections/AudioVisualizer";
import Conclusion from "./sections/Conclusion";

import { myContext } from "./components/ContextProvider";

function App() {
  const { activeDuck, setActiveDuck } = myContext();

  const canvasRef = useRef();

  return (
    <main
      className="overflow-x-hidden"
      style={{
        backgroundColor: ducks[activeDuck].primaryClr,
      }}
    >
      <Hero />
      <CharSelectSection />
      <DescSectionOne />
      <DescSectionTwo />
      <DescSectionThree />
      <AudioVisualizer />
      <Conclusion />

      <div ref={canvasRef} className="fixed top-0 left-0 h-full w-full z-[1]">
        <Canvas
          alpha="true"
          shadows
          gl={{ antialias: false }}
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 20], fov: 35, near: 1, far: 40 }}
        >
          {/* <Experience /> */}
          <Cluster />
        </Canvas>
      </div>
    </main>
  );
}

export default App;
