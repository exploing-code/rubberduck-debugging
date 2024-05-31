import React from "react"
import { useRef } from "react"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TextPlugin } from "gsap/TextPlugin"

import { ducks } from "../../data"
import { myContext } from "../components/ContextProvider.jsx"
import P from "../components/P"
import emphasis from "../assets/emphasis.svg"
import speechBubble from "../assets/speechBubble.svg"

gsap.registerPlugin(TextPlugin)

function DescSectionTwo() {
  const { activeDuck } = myContext()

  const refS2 = useRef()

  useGSAP(() => {
    // gsap.fromTo(
    //   ".emphasis",
    //   { scale: 0.8 },
    //   {
    //     scrollTrigger: {
    //       trigger: refS2.current,
    //       start: "bottom bottom",
    //       end: "bottom center",
    //     },
    //     scale: 1.1,
    //     repeat: -1,
    //     ease: "power1.inOut",
    //     yoyo: true,
    //   }
    // )

    gsap.to(".revealSectionTwo1", {
      scrollTrigger: {
        trigger: refS2.current,
        start: "bottom bottom",
        end: "bottom center",
        markers: true,
      },
      duration: 2,
      text: "So now that you have chosen a duck it's time to try your debugging luck!",
    })

    // gsap.to(".revealSectionTwo2", {
    //   scrollTrigger: {
    //     trigger: refS2.current,
    //     start: "bottom bottom",
    //     end: "bottom center",
    //   },
    //   duration: 2,
    //   text: "Let's go through your code and make sure that it doesn't suck!",
    // })
  })

  const colour = "${ducks[activeDuck].PrimaryClr}"

  return (
    <section
      ref={refS2}
      className="h-[200vh] flex items-start flex-col justify-center bg-red-300"
      id="s4"
    >
      <div className=" w-full relative">
        <img src={emphasis} className="emphasis absolute top-0 left-[15%]" />

        <div
          className="absolute top-[50%] left-[50%] w-[50vmin] h-[50vmin] flex flex-col px-10 justify-center"
          style={{
            backgroundImage: `url(${speechBubble}`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        >
          <P style={`mb-3 left-2 text-xs`}>
            <span className={`revealSectionTwo1 text-amber-200`}></span>
          </P>
          <P style={`text-xs`}>
            <span className={`revealSectionTwo2 text-amber-200`}></span>
          </P>
        </div>
      </div>
    </section>
  )
}

export default DescSectionTwo
