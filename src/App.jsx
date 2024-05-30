// libraries
import { Canvas } from "@react-three/fiber";
import React, { useContext, useRef, useState, useEffect } from "react";

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
import LoadingScreen from "./components/LoadingScreenStart";
import LoadingScreenCharSelect from "./components/LoadingScreenCharSelect";

function App() {
  const { activeDuck, setActiveDuck, partyOn, setPartyOn } = myContext();
  const [isLoaded, setIsLoaded] = useState(true); // TRUE FOR DEVELOPMENT - FALSE FOR PRODUCTION
  const [renderInitialLoading, setRenderInitialLoading] = useState(true);
  const [renderS2Loading, setRenderS2Loading] = useState(false);

  return (
    <>
      {/* {renderInitialLoading && (
        <LoadingScreen
          setIsLoaded={setIsLoaded}
          setRenderInitialLoading={setRenderInitialLoading}
        />
      )} */}
      {isLoaded && (
        <main
          className={`overflow-x-hidden transition-colors duration-500 ease-in-out relative`}
          style={{
            backgroundColor: ducks[activeDuck].primaryClr,
          }}
        >
          <Hero />
          <CharSelectSection />
          <DescSectionOne />
          <DescSectionTwo />
          <DescSectionThree />
          <AudioVisualizer setRenderS2Loading={setRenderS2Loading} />
          <Conclusion />
          <div className="fixed top-0 left-0 h-full w-full z-[1]">
            {partyOn ? (
              ""
            ) : (
              <Canvas>
                <Experience />
              </Canvas>
            )}
            {partyOn ? (
              <Canvas
                camera={{
                  position: [0, 25, 0], // Change the position values as needed
                  fov: 35,
                  near: 0.1,
                  far: 1000,
                }}
              >
                <Cluster />
              </Canvas>
            ) : (
              ""
            )}
          </div>
          {renderS2Loading && (
            <LoadingScreenCharSelect setRenderS2Loading={setRenderS2Loading} />
          )}
        </main>
      )}
    </>
  );
}

export default App;

{
  /* <div
        className={`${
          ducks[activeDuck].name === 'DemonDuck' ? 'fire visible' : ' hidden '
        }`}
      /> */
}
