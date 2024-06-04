import { Canvas } from "@react-three/fiber";
import React, { useContext, useRef, useState, useEffect } from "react";
import { ducks } from "../data";
import Experience from "./components/Experience";
import { Cluster } from "./components/Cluster";
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
import QuackText from "./components/QuackText";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

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
    triggerOnceScrollBtn,
    setTriggerOnceScrollBtn,
  } = myContext();
  const [isLoaded, setIsLoaded] = useState(true); // TRUE FOR DEVELOPMENT - FALSE FOR PRODUCTION
  const [renderInitialLoading, setRenderInitialLoading] = useState(true);
  const [triggeredOnce, setTriggeredOnce] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTriggerOnceScrollBtn(true);
      if (!triggeredOnce) {
        gsap.to(window, { duration: 0, scrollTo: 0 });
        console.log("In App GSAP: " + activeSectionNumb);
      }
      setTriggeredOnce(true);
    }, 1000);
  }, [triggeredOnce]);

  useEffect(() => {
    setActiveSectionNumb(1);
    console.log("In App Effect " + activeSectionNumb);
  }, []);

  return (
    <div className={`${partyOn ? "" : "cursor-none"}`}>
      {partyOn ? "" : <ScrollBtn />}
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
            {partyOn ? (
              <>
                <QuackText />
                <Canvas
                  className="z-50"
                  camera={{
                    position: [0, 25, 0], // Change the position values as needed
                    fov: 35,
                    near: 0.1,
                    far: 1000,
                  }}
                >
                  <Cluster />
                </Canvas>
              </>
            ) : (
              ""
            )}
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
