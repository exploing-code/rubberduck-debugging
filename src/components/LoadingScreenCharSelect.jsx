import React, { useContext, useRef, useState, useEffect } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

export default function LoadingScreenCharSelect({ setRenderS2Loading }) {
  const containerRef = useRef()
  const title = useRef()

  useGSAP(() => {
    gsap.from(containerRef.current, {
      y: "100vh",
      duration: 2,
      ease: "power4.inOut",
      onComplete: () => {
        const s2 = document.getElementById("s2")
        s2.scrollIntoView({ behavior: "smooth" })
      },
    })
    gsap.to(containerRef.current, {
      y: "-100vh",
      duration: 2,
      delay: 3,
      ease: "power4.inOut",
      onComplete: () => {
        setRenderS2Loading(false)
      },
    })
    gsap.fromTo(
      title.current.children,
      { y: 40 },
      {
        y: 0,
        ease: "elastic",
        stagger: 0.1,
        duration: 2,
      }
    )
  }, [])

  const titleString = "CHOOSE ANOTHER DUCK"

  return (
    <div
      className="bg-black h-[100vh] w-full z-[1000] fixed top-0 left-0 flex justify-center items-center"
      ref={containerRef}
    >
      <h1 className="m-0 text-[#FBD652] lg:text-[5rem] flex" ref={title}>
        {titleString
          .replace(/ /g, "\u00a0")
          .split("")
          .map((item, index) => (
            <span className="reveal relative" key={index}>
              {item}
            </span>
          ))}
      </h1>
    </div>
  )
}
