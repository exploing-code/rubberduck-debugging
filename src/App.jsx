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

import { myContext } from "./components/ContextProvider";
import LoadingScreen from "./components/LoadingScreenStart";
import LoadingScreenCharSelect from "./components/LoadingScreenCharSelect";
import ScrollBtn from "./components/ScrollBtn";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

import PartyComponent from "./components/PartyComponent";

gsap.registerPlugin(ScrollToPlugin);

function App() {
  const {
    activeDuck,
    setActiveDuck,
    partyOn,
    setPartyOn,
    renderS2Loading,
    setRenderS2Loading,
    activeSectionNumb,
    setActiveSectionNumb,
  } = myContext();
  const [isLoaded, setIsLoaded] = useState(true); // TRUE FOR DEVELOPMENT - FALSE FOR PRODUCTION
  const [renderInitialLoading, setRenderInitialLoading] = useState(true);

  useGSAP(() => {
    setTimeout(() => {
      gsap.to(window, { duration: 0, scrollTo: 0 });
    }, 1000);
  }, []);

  return (
    <div className={`${partyOn ? "" : "cursor-none"}`}>
      {partyOn ? "" : <ScrollBtn />}
      {renderInitialLoading && (
        <LoadingScreen
          setIsLoaded={setIsLoaded}
          setRenderInitialLoading={setRenderInitialLoading}
        />
      )}
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
          <AudioVisualizer />

          <div className="fixed top-0 left-0 h-full w-full z-[1]">
            {partyOn ? (
              ""
            ) : (
              <Canvas
                camera={{
                  fov: 35,
                }}
              >
                <Experience />
              </Canvas>
            )}
            {partyOn ? <PartyComponent /> : ""}
          </div>
          {renderS2Loading && (
            <LoadingScreenCharSelect setRenderS2Loading={setRenderS2Loading} />
          )}
        </main>
      )}
    </div>
  );
}

export default App;
