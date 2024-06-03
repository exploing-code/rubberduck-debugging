import React from "react"
import { useRef } from "react"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TextPlugin } from "gsap/TextPlugin"

import { ducks } from "../../data"
import { myContext } from "../components/ContextProvider.jsx"
import P from "../components/P"

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(TextPlugin)

function DescSectionThree() {
  const { activeDuck } = myContext()
  const refS3 = useRef()
  const bubbleRef3 = useRef()
  const sectionRef3 = useRef()

  useGSAP(() => {
    // Opacity animation for wrapper
    gsap.fromTo(
      bubbleRef3.current,
      { opacity: 0 },
      {
        scrollTrigger: {
          trigger: sectionRef3.current,
          start: "center bottom",
          end: "bottom bottom",
          pin: true,
          toggleActions: "play reverse play reverse",
          markers: true,
        },
        opacity: 1,
        duration: 0.8,
      }
    )

    // Animation for speech bubble and text
    gsap.fromTo(
      bubbleRef3.current,
      { y: -5 },
      {
        scrollTrigger: {
          trigger: refS3.current,
          start: "top top",
          end: "bottom bottom",
        },
        y: 5,
        duration: 1,
        repeat: -1,
        ease: "power1.inOut",
        yoyo: true,
      }
    )

    gsap.to(".revealSectionThree", {
      scrollTrigger: {
        trigger: refS3.current,
        start: "top top",
        end: "bottom bottom",
      },
      duration: 2,
      text: "Alright, it's time. Let's start the text, share your code and I'll do my best!",
    })
  })

  // const textColor = "[${ducks[activeDuck].secondaryClr}]"

  return (
    <section
      ref={refS3}
      className="h-[200vh] flex items-start flex-col justify-start"
      id="s5"
    >
      <div ref={sectionRef3} className="w-full relative h-full">
        <div
          ref={bubbleRef3}
          style={{
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
          className="flex absolute top-0 left-[60%] flex-col px-10 justify-center h-[90vmin] md:h-[70vmin] lg:h-[40vmin] w-[90vmin] lg:w-[40vmin] text-sm md:text-md lg:text-lg"
        >
          <P>
            <span className="revealSectionThree text-amber-200 "></span>
          </P>
        </div>
      </div>
    </section>
  )
}

export default DescSectionThree
