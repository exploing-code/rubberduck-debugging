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

  // Rotation
  useGSAP(() => {
    if (model) {
      // HERO
      gsap.to(modelRef.current.rotation, {
        scrollTrigger: {
          trigger: '#s1',
          endTrigger: '#s2',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
        y: modelRef.current.rotation.y + Math.PI * 2,
        x: 6.5,
      });
      gsap.to(modelRef.current.position, {
        scrollTrigger: {
          trigger: '#s1',
          start: 'top top',
          end: 'bottom center',
          endTrigger: '#s2',
          scrub: 1,
        },
        z: -4,
      });

      // CHAR SELECTION
      gsap.to(modelRef.current.position, {
        scrollTrigger: {
          trigger: '#s2',
          pin: true,
          scrub: 1,
        },
      });

      //  DESC SECTION 1 (to the right from above )
      gsap.to(modelRef.current.position, {
        x: 6,
        scrollTrigger: {
          trigger: '#s3',
          start: 'top bottom',
          end: 'center center',
          scrub: 1,
        },
      });

      gsap.to(modelRef.current.rotation, {
        x: 1.5,
        y: -0.5,
        z: 0.5,
        scrollTrigger: {
          trigger: '#s3',
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: 1,
        },
      });

      //  DESC SECTION 2 (close left)
      let tl2Position = gsap.timeline({
        scrollTrigger: {
          trigger: '#s4',
          start: 'top center',
          end: 'bottom bottom',
          scrub: 1,
        },
      });

      tl2Position.to(modelRef.current.position, {
        x: -2.5, // left/right
        y: -1, // top/bottom
        z: 1.2, // size
      });

      let tl2Rotation = gsap.timeline({
        scrollTrigger: {
          trigger: '#s4',
          start: 'top center',
          end: 'bottom bottom',
          scrub: 1,
        },
      });

      tl2Rotation.to(modelRef.current.rotation, {
        y: 0.8, // left/right
        x: 0, // top/bottom
        z: 0,
      });

      //  DESC SECTION 3 (Original position and rotation)
      let tl3Position = gsap.timeline({
        scrollTrigger: {
          trigger: '#s5',
          start: 'top center',
          end: 'bottom bottom',
          scrub: 1,
        },
      });

      tl3Position.to(modelRef.current.position, {
        x: 0,
        y: 0,
        z: -1,
      });

      let tl3Rotation = gsap.timeline({
        scrollTrigger: {
          trigger: '#s5',
          start: 'top center',
          end: 'bottom bottom',
          scrub: 1,
        },
      });

      tl3Rotation.to(modelRef.current.rotation, {
        y: 0,
        x: 0.2,
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
