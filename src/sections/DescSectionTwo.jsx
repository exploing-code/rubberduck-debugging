import React from "react";
import P from "../components/P";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function DescSectionTwo() {
  const textRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { x: 8000, y: 2000 },
      {
        scrollTrigger: {
          trigger: "#s4",
          start: "center center",
          markers: true,
          toggleActions: "restart reverse resume reset",
          // onEnter onLeave onEnterBack onLeaveBack
        },
        x: 1100,
        y: 200,
        rotation: -350,
        duration: 1,
        ease: "power1.out",
      }
    );
  }, []);
  return (
    <section
      className="h-[200vh] flex items-start flex-col pt-[2rem] justify-center"
      id="s4"
    >
      <div ref={textRef}>
        <P className="text">
          Let's go through your code and make sure that it doesn't suck!
        </P>
      </div>
    </section>
  );
}

export default DescSectionTwo;
