// three fiber
import { Float } from '@react-three/drei';
import { useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// react
import React, { useRef, Suspense, useEffect, useState } from 'react';

// gsap
import { gsap } from 'gsap';

import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

import { myContext } from './ContextProvider.jsx';
import { ducks } from '../../data';

export default function Experience() {
  const { activeDuck, setActiveDuck, pressedButton, setPressedButton } =
    myContext();

  //   const [activeDuckUrl, setActiveDuckUrl] = useState(ducks[0].path);
  const model = useLoader(GLTFLoader, ducks[activeDuck].path);
  const modelRef = useRef();

  const { size } = useThree();
  const modelScale = size.width > 768 ? [1, 1, 1] : [0.7, 0.7, 0.7];

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

  // Use GSAP
  useGSAP(() => {
    if (model) {
      // HERO SECTION
      createAnimation(
        modelRef.current.rotation,
        createScrollTrigger('#s1', 'top top', 'bottom bottom', 1, false, '#s2'),
        { y: modelRef.current.rotation.y + Math.PI * 2, x: 6.5 }
      );
      createAnimation(
        modelRef.current.position,
        createScrollTrigger('#s1', 'top top', 'bottom center', 1, false, '#s2'),
        { z: -4 }
      );

      // CHARACTER SELECTION SECTION
      createAnimation(
        modelRef.current.position,
        createScrollTrigger('#s2', 'top top', 'bottom center', 1, true),
        {}
      );

      // DESC SECTION 1
      createAnimation(
        modelRef.current.position,
        createScrollTrigger('#s3', 'top bottom', 'center center', 1),
        { x: 6 }
      );
      createAnimation(
        modelRef.current.rotation,
        createScrollTrigger('#s3', 'top bottom', 'bottom bottom', 1),
        { x: 1.5, y: -0.5, z: 0.5 }
      );

      // DESC SECTION 2
      createTimeline(
        modelRef.current.position,
        createScrollTrigger('#s4', 'top center', 'bottom bottom', 1),
        { x: -2.5, y: -1, z: 1.2 }
      );
      createTimeline(
        modelRef.current.rotation,
        createScrollTrigger('#s4', 'top center', 'bottom bottom', 1),
        { y: 0.8, x: 0, z: 0 }
      );

      // DESC SECTION 3
      createTimeline(
        modelRef.current.position,
        createScrollTrigger('#s5', 'top center', 'bottom bottom', 1),
        { x: 0, y: 0, z: -1 }
      );
      createTimeline(
        modelRef.current.rotation,
        createScrollTrigger('#s5', 'top center', 'bottom bottom', 1),
        { y: 0, x: 0.2 }
      );
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

    const direction = pressedButton === 'right' ? 1 : -1;

    tl.to(modelRef.current.rotation, {
      duration: 0.3,
      y: '+=' + direction * Math.PI * 2,
      ease: 'Power4.easeIn',
      onComplete: () => {
        if (pressedButton === 'right') {
          setActiveDuck((prev) => (prev + 1) % ducks.length);
        } else {
          setActiveDuck((prev) => (prev - 1 < 0 ? ducks.length - 1 : prev - 1));
        }

        tl.to(modelRef.current.rotation, {
          duration: 1,
          y: '+=' + direction * Math.PI * 2 * 2,
          ease: 'Power4.easeOut',
        });
        modelRef.current.rotation = 0;
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
