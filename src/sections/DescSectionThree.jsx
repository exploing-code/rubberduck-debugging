import React from "react";
import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

import { ducks } from "../../data";
import { myContext } from "../components/ContextProvider.jsx";
import P from "../components/P";
import speechBubble from "../assets/speechBubble.svg";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);

function DescSectionThree() {
  const { activeDuck } = myContext();
  const refS3 = useRef();

  useGSAP(
    () => {
      gsap.to(".reveal", {
        duration: 2,
        text: "Alright, it's time. Let's start the text, Share your code and I'll do my best!",
      });
    },
    { scope: refS3 }
  );

  const textColor = "[${ducks[activeDuck].secondaryClr}]";

  return (
    <section className="h-[200vh]" id="s5" ref={refS3}>
      <div
        style={{
          backgroundImage: `url(${speechBubble}`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          height: "18rem",
        }}
        className="relative"
      >
        <P>
          <span className="reveal w-[18rem] text-xs text-amber-200 absolute top-[8rem] left-[1rem]"></span>
        </P>
      </div>
    </section>
  );
}

export default DescSectionThree;
