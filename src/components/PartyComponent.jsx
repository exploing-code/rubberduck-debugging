import React from "react";
import { Canvas } from "@react-three/fiber";
import QuackText from "./QuackText";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { Cluster } from "./Cluster";

gsap.registerPlugin(ScrollToPlugin);
export default function PartyComponent() {
  useGSAP(() => {
    gsap.to(window, { duration: 0, scrollTo: "max" });
  }, []);

  return (
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
  );
}
