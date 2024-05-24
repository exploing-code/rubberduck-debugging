import React from "react";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { ducks } from "../../data";
import { myContext } from "../components/ContextProvider.jsx";

function Hero() {
  const { activeDuck, setActiveDuck } = myContext();
  const ref = useRef();

  useGSAP(
    () => {
      const tl = gsap.timeline({});
      tl.fromTo(
        ".reveal",
        { opacity: 0 },
        {
          opacity: 1,
          ease: "elastic",
          stagger: 0.1,
          duration: 1,
        }
      );
      tl.fromTo(
        ".reveal2",
        { opacity: 0 },
        {
          opacity: 1,
          ease: "elastic",
          stagger: 0.1,
          duration: 1,
        }
      );
      tl.resume();
    },
    { scope: ref }
  );

  const string = "RUBBER DUCK";
  const string2 = "DEBUGGING";

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
          {string.split("").map((item, index) => (
            <span className="reveal" key={index}>
              {item}
            </span>
          ))}
        </h1>
        <h1
          className="z-10 text-[17rem]"
          style={{
            color: ducks[activeDuck].secondaryClr,
          }}
        >
          {string2.split("").map((item, index) => (
            <span className="reveal2" key={index}>
              {item}
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
}

export default Hero;
