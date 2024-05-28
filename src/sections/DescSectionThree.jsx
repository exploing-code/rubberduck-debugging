import React from "react";
import P from "../components/P";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function DescSectionThree() {
  const textRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      ".text",
      { x: -4000 },
      {
        scrollTrigger: {
          trigger: "#s5",
          start: "center center",
          markers: true,
          toggleActions: "restart pause resume reset",
        },
        x: 100,
        rotation: 355,
        stagger: 0.1,
        duration: 1,
        ease: "power2.in",
      }
    );
    gsap.fromTo(
      ".text2",
      { y: -1000000 },
      {
        scrollTrigger: {
          trigger: "#s5",
          start: "center center",
          markers: true,
          toggleActions: "restart pause resume reset",
        },
        x: -800,
        y: 300,
        rotation: 370,
        stagger: 0.1,
        duration: 1,
        ease: "power2.in",
        delay: 1,
      }
    );
  }, []);

  return (
    <section
      className="h-[200vh]  flex items-end flex-col  justify-center"
      id="s5"
      ref={textRef}
    >
      <div className="flex flex-col gap-[5rem] mr-[15rem]">
        <div className="text">
          <P>Explain your code, line by line</P>
        </div>
        <div className="text2">
          <P>Get ready to start, Be steady and smart</P>
        </div>
      </div>
    </section>
  );
}

export default DescSectionThree;
