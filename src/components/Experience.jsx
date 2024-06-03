// three fiber
import { Float, Environment, useGLTF } from '@react-three/drei';
import { useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer, N8AO, SMAA } from '@react-three/postprocessing';

// react
import React, { useRef, Suspense, useEffect, useState } from 'react';

// gsap
import { gsap } from 'gsap';

import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

import { myContext } from './ContextProvider.jsx';
import { ducks } from '../../data';

// ducks.forEach((duck) => useGLTF.preload(duck.path));

export default function Experience() {
  ducks.forEach((duck) => {
    useGLTF.preload(duck.path);
    // console.log(`Preloaded model at path: ${duck.path}`);
  });

  const { activeDuck, setActiveDuck, pressedButton, setPressedButton } =
    myContext();

  //   const [activeDuckUrl, setActiveDuckUrl] = useState(ducks[0].path);
  const model = useGLTF(ducks[activeDuck].path);
  const modelRef = useRef();

  const { size } = useThree();
  const modelScale = size.width > 768 ? [1, 1, 1] : [0.7, 0.7, 0.7];

  let windowSize = window.innerWidth;
  let smallWindow = windowSize < 600;
  let mediumWindow = windowSize >= 600 && windowSize < 900;
  let largeWindow = windowSize >= 900;

  // Use GSAP
  useGSAP(() => {
    if (model) {
      // HERO SECTION
      gsap.to(modelRef.current.rotation, {
        scrollTrigger: {
          trigger: '#s1',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: false,
          endTrigger: '#s2',
        },
        y: modelRef.current.rotation.y + Math.PI * 2,
        x: 6.5,
      });

      gsap.to(modelRef.current.position, {
        scrollTrigger: {
          trigger: '#s1',
          start: 'top top',
          end: 'bottom center',
          scrub: 1,
          pin: false,
          endTrigger: '#s2',
        },
        z: -4,
        y: mediumWindow ? 1.5 : largeWindow ? 1.5 : 0,
      });

      // CHARACTER SELECTION SECTION
      gsap.to(modelRef.current.position, {
        scrollTrigger: {
          trigger: '#s2',
          start: 'top top',
          end: 'bottom center',
          scrub: 1,
          pin: true,
        },
      });

      // DESC SECTION 1
      gsap.to(modelRef.current.position, {
        scrollTrigger: {
          trigger: '#s3',
          start: 'top top',
          end: 'center center',
          scrub: 1,
          pin: true,
          endTrigger: '#s4',
        },
      });

      gsap.to(modelRef.current.position, {
        scrollTrigger: {
          trigger: '#s3',
          start: 'top bottom',
          end: 'center center',
          scrub: 1,
          pin: false,
          endTrigger: 's4',
        },
        x: smallWindow // SM
          ? windowSize / 300
          : mediumWindow // MD
          ? windowSize / 400
          : largeWindow //LG
          ? windowSize / 300
          : windowSize / 200,
      });

      gsap.to(modelRef.current.rotation, {
        scrollTrigger: {
          trigger: '#s3',
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: 1,
        },
        x: 1.5,
        y: -0.5,
        z: smallWindow ? 0 : 0.5,
      });

      // DESC SECTION 2
      gsap.to(modelRef.current.position, {
        scrollTrigger: {
          trigger: '#s4',
          start: 'top top',
          end: 'center center',
          scrub: 1,
          pin: true,
          endTrigger: '#s5',
        },
      });

      let timeline = gsap.timeline({
        scrollTrigger: {
          trigger: '#s4',
          start: 'top center',
          end: 'bottom bottom',
          scrub: 1,
        },
      });

      timeline.to(modelRef.current.position, {
        x: smallWindow ? -1.5 : mediumWindow ? -1 : largeWindow ? -2.4 : -2.5,
        y: smallWindow ? -0.8 : mediumWindow ? -0.9 : largeWindow ? -0.95 : -1,
        z: smallWindow ? 0.5 : mediumWindow ? 1 : largeWindow ? 0.5 : 1.2,
      });

      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: '#s4',
          start: 'top center',
          end: 'bottom bottom',
          scrub: 1,
          //   duration: 4,
        },
      });

      timeline.to(modelRef.current.rotation, {
        y: smallWindow ? 0.5 : mediumWindow ? 0.5 : largeWindow ? 0.6 : 0.8,
        x: 0,
        z: 0,
        scrub: 1,
      });

      // DESC SECTION 3
      gsap.to(modelRef.current.position, {
        scrollTrigger: {
          trigger: '#s5',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: true,
          endTrigger: '#s6',
        },
      });

      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: '#s5',
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: 1,
        },
      });

      timeline.to(modelRef.current.position, { x: 0, y: 0, z: -1 });

      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: '#s5',
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: 1,
        },
      });

      timeline.to(modelRef.current.rotation, { y: 0, x: 0.2 });
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
        modelRef.current.rotation.set(0, 0, 0);
      },
    });

    setPressedButton(null);
  }, [pressedButton, isAnimating]);

  return (
    <>
      <perspectiveCamera position={[0, 0.5, -7]}>
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
      <Environment files='/adamsbridge.hdr' />
      <EffectComposer disableNormalPass multisampling={0}>
        <N8AO
          halfRes
          color='black'
          aoRadius={2}
          intensity={1}
          aoSamples={6}
          denoiseSamples={4}
        />
      </EffectComposer>
    </>
  );
}
