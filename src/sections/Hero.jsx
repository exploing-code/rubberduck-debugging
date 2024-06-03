import React from "react";
import { useRef } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { TextPlugin } from "gsap/TextPlugin";

import { ducks } from "../../data";
import { myContext } from "../components/ContextProvider.jsx";
import P from "../components/P.jsx";

gsap.registerPlugin(TextPlugin);

function Hero() {
  const { activeDuck, setActiveDuck } = myContext();
  const ref = useRef();

  useGSAP(
    () => {
      gsap.to(".cursor", {
        opacity: 0,
        repeat: -1,
        yoyo: true,
      });
      gsap.to(".revealHero", {
        duration: 4,
        delay: 6,
        text: "Rubber duck debugging (or rubberducking) is a method of debugging code by articulating a problem in spoken or written in natural language, preferebly to someone who does not understand code (a.k.a talk to a rubber duck).",
      });
    },
    { scope: ref }
  );

  return (
    <section
      className={`h-[300vh] w-screen'
        `}
      id="s1"
    >
      <div
        ref={ref}
        className="h-[100vh] py-4  relative flex flex-col items-center sm:justify-between md:text-[7rem] lg:text-[12rem]"
      >
        <h1
          className="mt-[-4%] text-[15vw] text-center"
          style={{
            color: ducks[activeDuck].secondaryClr,
          }}
        >
          RUBBER DUCK
        </h1>
        <h1
          className="mt-[-5%] sm:mt-[8%] z-10 text-[18vw] text-center"
          style={{
            color: ducks[activeDuck].secondaryClr,
          }}
        >
          DEBUGGING
        </h1>
        <P
          style={`absolute max-w-[25rem] m-[5%] sm:m-0 text-xs md:text-sm left-[5%] sm:left-[8%]  top-[20%]  lg:top-[35%] lg:translate-y-[-50%] text-[${ducks[activeDuck].secondaryClr}] text-start  h-[7em] w-full`}
        >
          <span className="revealHero "></span>
          <span className="cursor">_</span>
        </P>
      </div>
    </section>
  );
}

export default Hero;
