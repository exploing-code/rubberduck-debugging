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
        delay: 6,
      });
      gsap.to(".reveal", {
        duration: 4,
        delay: 6,
        text: "Rubber duck deging (or rubberducking) is a method of debugging code by articulating a problem in spoken or written in natural language, preferebly to someone who does not understand code.",
      });
    },
    { scope: ref }
  );

  return (
    <section
      className={`h-[300vh] w-[100vw] flex justify-center pt-[2rem]'
        `}
      id="s1"
    >
      <div
        ref={ref}
        className="h-screen relative flex flex-col items-center justify-between text-[14rem]"
      >
        <h1
          className="mt-3"
          style={{
            color: ducks[activeDuck].secondaryClr,
          }}
        >
          RUBBER DUCK
        </h1>
        <P
          style={`w-[25rem] text-sm absolute left-0 top-[27rem] text-[${ducks[activeDuck].secondaryClr}]`}
        >
          <span className="reveal"></span>
          <span className="cursor">_</span>
        </P>
        <h1
          className="z-10 text-[17rem]"
          style={{
            color: ducks[activeDuck].secondaryClr,
          }}
        >
          DEBUGGING
        </h1>
      </div>
    </section>
  );
}

export default Hero;
