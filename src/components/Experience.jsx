// three fiber
import { Float, Environment, useGLTF } from "@react-three/drei";
import { useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { EffectComposer, N8AO, SMAA } from "@react-three/postprocessing";

// react
import React, { useRef, Suspense, useEffect, useState } from "react";

// gsap
import { gsap } from "gsap";

import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

import { myContext } from "./ContextProvider.jsx";
import { ducks } from "../../data";

// ducks.forEach((duck) => useGLTF.preload(duck.path));

export default function Experience() {
  ducks.forEach((duck) => {
    useGLTF.preload(duck.path);
    console.log(`Preloaded model at path: ${duck.path}`);
  });

  const { activeDuck, setActiveDuck, pressedButton, setPressedButton } =
    myContext();

  //   const [activeDuckUrl, setActiveDuckUrl] = useState(ducks[0].path);
  const model = useGLTF(ducks[activeDuck].path);
  const modelRef = useRef();

  const { size } = useThree();
  const modelScale = size.width > 1280 ? [1, 1, 1] : [0.7, 0.7, 0.7];

  // Function to create GSAP animations
  const createAnimation = (
    target,
    scrollTriggerOptions,
    animationProperties
  ) => {
    gsap.to(target, {
      scrollTrigger: scrollTriggerOptions,
      ...animationProperties,
    });
  };

  // Function to create common scrollTrigger options
  const createScrollTrigger = (
    trigger,
    start,
    end,
    scrub = 1,
    pin = false,
    endTrigger = null
  ) => ({
    trigger,
    start,
    end,
    scrub,
    pin,
    endTrigger,
  });

  // Function to create GSAP timelines
  const createTimeline = (
    target,
    scrollTriggerOptions,
    animationProperties
  ) => {
    let timeline = gsap.timeline({
      scrollTrigger: scrollTriggerOptions,
    });

    timeline.to(target, animationProperties);

    return timeline;
  };

  let windowSize = window.innerWidth;
  let smallWindow = windowSize < 600;
  let mediumWindow = windowSize >= 600 && windowSize < 900;
  let largeWindow = windowSize >= 900;

  // Use GSAP
  useGSAP(() => {
    if (model) {
      // HERO SECTION
      createAnimation(
        modelRef.current.rotation,
        createScrollTrigger("#s1", "top top", "bottom bottom", 1, false, "#s2"),
        { y: modelRef.current.rotation.y + Math.PI * 2, x: 6.5 }
      );
      createAnimation(
        modelRef.current.position,
        createScrollTrigger("#s1", "top top", "bottom center", 1, false, "#s2"),
        { z: -4, y: mediumWindow ? 1.5 : largeWindow ? 1.5 : 0 }
      );

      // CHARACTER SELECTION SECTION
      createAnimation(
        modelRef.current.position,
        createScrollTrigger("#s2", "top top", "bottom center", 1, true),
        {}
      );

      // DESC SECTION 1
      createAnimation(
        modelRef.current.position,
        createScrollTrigger("#s3", "top bottom", "center center", 1),
        {
          x: smallWindow // SM
            ? windowSize / 300
            : mediumWindow // MD
            ? windowSize / 400
            : largeWindow //LG
            ? windowSize / 300
            : windowSize / 200,
        }
      );
      createAnimation(
        modelRef.current.rotation,
        createScrollTrigger("#s3", "top bottom", "bottom bottom", 1),
        { x: 1.5, y: -0.5, z: smallWindow ? 0 : 0.5 }
      );

      // DESC SECTION 2
      createTimeline(
        modelRef.current.position,
        createScrollTrigger("#s4", "top center", "bottom bottom", 1),
        {
          x: smallWindow ? -1.5 : mediumWindow ? -1 : largeWindow ? -2.4 : -2.5,
          y: smallWindow
            ? -0.8
            : mediumWindow
            ? -0.9
            : largeWindow
            ? -0.95
            : -1,
          z: smallWindow ? 0.5 : mediumWindow ? 1 : largeWindow ? 0.5 : 1.2,
        }
      );
      createTimeline(
        modelRef.current.rotation,
        createScrollTrigger("#s4", "top center", "bottom bottom", 1),
        {
          y: smallWindow ? 0.5 : mediumWindow ? 0.5 : largeWindow ? 0.6 : 0.8,
          x: 0,
          z: 0,
        }
      );

      // DESC SECTION 3
      createTimeline(
        modelRef.current.position,
        createScrollTrigger("#s5", "top bottom", "bottom bottom", 1),
        { x: 0, y: 0, z: -1 }
      );
      createTimeline(
        modelRef.current.rotation,
        createScrollTrigger("#s5", "top bottom", "bottom bottom", 1),
        { y: 0, x: 0.2 }
      );
    }
  }, []);

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
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
        modelRef.current.rotation.set(0, 0, 0);
      },
    });

    setPressedButton(null);
  }, [pressedButton, isAnimating]);

  return (
    <>
      {/* <Perf position="top-left" /> */}
      {/* <OrbitControls makeDefault /> */}
      <perspectiveCamera position={[0, 0.5, -5]} rotation={[0, 0, 0]}>
        <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
        <ambientLight intensity={1.5} />
        <Suspense fallback={null}>
          <Float speed={1} floatIntensity={-1}>
            <mesh ref={modelRef} rotation-x={0.3}>
              <primitive
                object={model.scene}
                scale={modelScale}
                position-y={size.width > 768 ? -1 : -2}
              />
            </mesh>
          </Float>
        </Suspense>
      </perspectiveCamera>
      <Environment files="/adamsbridge.hdr" />
      <EffectComposer disableNormalPass multisampling={0}>
        <N8AO
          halfRes
          color="black"
          aoRadius={2}
          intensity={1}
          aoSamples={6}
          denoiseSamples={4}
        />
        {/* <SMAA /> */}
      </EffectComposer>
    </>
  );
}
