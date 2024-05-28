import React from "react";
import P from "../components/P";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function DescSectionOne() {
  const textRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { x: -600 },
      {
        scrollTrigger: {
          trigger: "#s3",
          start: "center center",
          markers: true,
          toggleActions: "restart pause resume reset",
          // onEnter onLeave onEnterBack onLeaveBack
        },
        x: 300,
        y: 200,
        rotation: 340,
        duration: 1,
        ease: "power1.out",
      }
    );
  }, []);

  return (
    <section
      className="h-[200vh] flex items-start flex-col pt-[2rem] justify-center"
      id="s3"
    >
      <div ref={textRef}>
        <P className="text">
          Now that you have chosen a duck it’s time to try your debugging luck!
        </P>
      </div>
    </section>
  );
}

export default DescSectionOne;
