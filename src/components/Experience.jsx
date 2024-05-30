// three fiber
import { Float } from "@react-three/drei";
import { useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// react
import React, { useRef, Suspense, useEffect, useState } from "react";

// gsap
import { gsap } from "gsap";

import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

import { myContext } from "./ContextProvider.jsx";
import { ducks } from "../../data";

export default function Experience() {
  const { activeDuck, setActiveDuck, pressedButton, setPressedButton } =
    myContext();

  //   const [activeDuckUrl, setActiveDuckUrl] = useState(ducks[0].path);
  const model = useLoader(GLTFLoader, ducks[activeDuck].path);
  const modelRef = useRef();

  const { size } = useThree();
  const modelScale = size.width > 768 ? [1, 1, 1] : [0.7, 0.7, 0.7];

  useGSAP(() => {
    if (model) {
      gsap.to(modelRef.current.rotation, {
        scrollTrigger: {
          trigger: "#s1",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
        y: modelRef.current.rotation.y + Math.PI * 2,
        x: 6.5,
      });
      gsap.to(modelRef.current.position, {
        scrollTrigger: {
          trigger: "#s1",
          start: "top top",
          endTrigger: "#s2",
          end: "bottom center",
          scrub: 1,
        },
        z: -3,
      });
      gsap.to(modelRef.current.position, {
        scrollTrigger: {
          trigger: "#s2",
          start: "top top",
          //   markers: true,
          pin: true,
          scrub: 1,
        },
      });

      gsap.to(modelRef.current.position, {
        scrollTrigger: {
          trigger: "#s3",
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1,
        },
        x: window.innerWidth / 500,
      });
      gsap.to(modelRef.current.rotation, {
        scrollTrigger: {
          trigger: "#s3",
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1,
        },
        y: 5.5,
      });
      gsap.to(modelRef.current.position, {
        scrollTrigger: {
          trigger: "#s6",
          start: "top top",
          scrub: 1,
          pin: true,
        },
        // x: 0,
      });
    }
  }, []);

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check if pressedButton is null or undefined or if the animation is already playing
    if (!pressedButton || isAnimating) {
      return;
    }

    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    });

    const direction = pressedButton === "right" ? 1 : -1;

    tl.to(modelRef.current.rotation, {
      duration: 0.3,
      y: "+=" + direction * Math.PI * 2,
      ease: "Power4.easeIn",
      onComplete: () => {
        if (pressedButton === "right") {
          setActiveDuck((prev) => (prev + 1) % ducks.length);
        } else {
          setActiveDuck((prev) => (prev - 1 < 0 ? ducks.length - 1 : prev - 1));
        }

        tl.to(modelRef.current.rotation, {
          duration: 1,
          y: "+=" + direction * Math.PI * 2 * 2,
          ease: "Power4.easeOut",
        });
      },
    });

    setPressedButton(null);
  }, [pressedButton, isAnimating]);

  return (
    <>
      {/* <Perf position="top-left" /> */}
      {/* <OrbitControls makeDefault /> */}
      <perspectiveCamera position={[0, 0.5, 0]}>
        <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
        <ambientLight intensity={1.5} />
        <Suspense fallback={<h1>Loading...</h1>}>
          <Float speed={1} floatIntensity={-1}>
            <mesh ref={modelRef} rotation-x={0.3}>
              <primitive
                object={model.scene}
                scale={modelScale}
                position-y={-1}
              />
            </mesh>
          </Float>
        </Suspense>
      </perspectiveCamera>
    </>
  );
}
