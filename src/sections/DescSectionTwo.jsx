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
  const sectionRef = useRef()
  const bubbleRef = useRef()

  useGSAP(() => {
    // Opacity animation for wrapper
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      {
        scrollTrigger: {
          trigger: refS2.current,
          start: "center center",
          end: "bottom bottom",
          pin: true,
          toggleActions: "play reverse play reverse",
        },
        opacity: 1,
        duration: 0.8,
      }
    )

    // Scale animation for emphasis image
    gsap.fromTo(
      ".emphasis",
      { scale: 0.8 },
      {
        scrollTrigger: {
          trigger: refS2.current,
          start: "center center",
          end: "bottom bottom",
        },
        scale: 1.1,
        repeat: -1,
        ease: "power1.inOut",
        yoyo: true,
      }
    )

    // Animation for speech bubble and text
    gsap.fromTo(
      bubbleRef.current,
      { y: -5 },
      {
        scrollTrigger: {
          trigger: refS2.current,
          start: "center center",
          end: "bottom bottom",
        },
        y: 5,
        duration: 1,
        repeat: -1,
        ease: "power1.inOut",
        yoyo: true,
      }
    )

    const bubbleTl = gsap.timeline({
      scrollTrigger: {
        trigger: refS2.current,
        start: "center center",
        end: "bottom bottom",
        markers: true,
      },
    })

    bubbleTl
      .to(".revealSectionTwo1", {
        duration: 2,
        text: "So now that you have chosen a duck it's time to try your debugging luck!",
      })
      .to(".revealSectionTwo2", {
        duration: 2,
        text: "Let's go through your code and make sure that it doesn't suck!",
      })
  })

  // const colour = "${ducks[activeDuck].PrimaryClr}"

  return (
    <section
      ref={refS2}
      className="h-[200vh] flex items-start flex-col justify-center"
      id="s4"
    >
      <div
        ref={sectionRef}
        className="w-full relative grid md:grid-cols-2 h-[100lvh]"
      >
        <div className="justify-center items-start w-full relative hidden lg:flex">
          <img
            src={emphasis}
            className="emphasis w-[10rem] h-auto absolute top-[10%] left-[30%]"
          />
        </div>

        <div
          ref={bubbleRef}
          className="flex flex-col px-10 justify-center h-[90vmin] md:h-[70vmin] lg:h-[60vmin] w-[90vmin] lg:w-[60vmin] text-sm md:text-md lg:text-lg"
          style={{
            backgroundImage: `url(${speechBubble}`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        >
          <P style={`mb-3 left-2 `}>
            <span className={`revealSectionTwo1 text-amber-200`}></span>
          </P>
          <P style={``}>
            <span className={`revealSectionTwo2 text-amber-200`}></span>
          </P>
        </div>
      </div>
    </section>
  )
}

export default DescSectionTwo
