import React from "react";
import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

import { ducks } from "../../data";
import { myContext } from "../components/ContextProvider.jsx";
import P from "../components/P";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);

function DescSectionThree() {
  const { activeDuck } = myContext();
  const ref = useRef();

  useGSAP(() => {
    gsap.to(".reveal", {
      duration: 2,
      text: "Alright, it's time. Let's start the text, Share your code and I'll do my best!",
    });
  });

  return (
    <section
      className="h-[200vh] flex items-end flex-col  justify-center"
      id="s5"
      ref={ref}
    >
      <P
        style={`w-[20rem] text-sm mb-5 text-[${ducks[activeDuck].secondaryClr}]`}
      >
        <span className="reveal"></span>
      </P>
    </section>
  );
}

export default DescSectionThree;
