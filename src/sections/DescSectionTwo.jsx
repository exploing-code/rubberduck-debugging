import React from "react";
import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

import { ducks } from "../../data";
import { myContext } from "../components/ContextProvider.jsx";
import P from "../components/P";
import emphasis from "../assets/emphasis.svg";
import speechBubble from "../assets/speechBubble.svg";

gsap.registerPlugin(TextPlugin);

function DescSectionTwo() {
  const { activeDuck } = myContext();

  const refS2 = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({});
    tl.fromTo(
      ".emphasis",
      { opacity: 0 },
      {
        opacity: 1,
        repeat: 2,
        ease: "power1.inOut",
      }
    );
    tl.to(".reveal1", {
      duration: 2,
      text: "So now that you have chosen a duck it's time to try your debugging luck!",
    });
    tl.to(".reveal2", {
      duration: 2,
      text: "Let's go through your code and make sure that it doesn't suck!",
    });
  });

  const colour = "${ducks[activeDuck].PrimaryClr}";

  return (
    <section
      className="h-[200vh] flex items-start flex-col pt-[2rem] justify-center"
      id="s4"
    >
      <div ref={refS2}>
        <img src={emphasis} className="emphasis" />
        <div className="relative bg-amber-400">
          <div className="w-[17rem] absolute top-[3rem]">
            <P style={`mb-3 left-2 text-xs`}>
              <span className={`reveal1 text-amber-200`}></span>
            </P>
            <P style={`text-xs`}>
              <span className={`reveal2 text-amber-200`}></span>
            </P>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DescSectionTwo;
