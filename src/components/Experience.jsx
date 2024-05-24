// three fiber
import { Float } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// react
import React, { useRef, Suspense } from 'react';

// gsap
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

import { myContext } from './ContextProvider.jsx';
import { ducks } from '../../data';

export default function Experience() {
  const { activeDuck } = myContext();

  const activeDuckUrl = ducks[activeDuck].path;
  const model = useLoader(GLTFLoader, activeDuckUrl);
  const modelRef = useRef();

  useGSAP(() => {
    if (model) {
      gsap.to(modelRef.current.rotation, {
        scrollTrigger: {
          trigger: '#s1',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
        y: modelRef.current.rotation.y + Math.PI * 2,
        x: 6,
      });
      gsap.to(modelRef.current.position, {
        scrollTrigger: {
          trigger: '#s1',
          start: 'top top',
          endTrigger: '#s2',
          end: 'bottom center',
          scrub: 1,
        },
        z: -3,
      });
      gsap.to(modelRef.current.position, {
        scrollTrigger: {
          trigger: '#s2',
          start: 'top top',
          pin: true,
          scrub: 1,
        },
      });

      gsap.to(modelRef.current.position, {
        scrollTrigger: {
          trigger: '#s3',
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: 1,
        },
        x: window.innerWidth / 500,
      });
      gsap.to(modelRef.current.rotation, {
        scrollTrigger: {
          trigger: '#s3',
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: 1,
        },
        y: 5.5,
      });
      gsap.to(modelRef.current.position, {
        scrollTrigger: {
          trigger: '#s6',
          start: 'top top',
          scrub: 1,
          pin: true,
        },
        x: 0,
      });
    }
  }, []);

  return (
    <>
      {/* <Perf position="top-left" /> */}
      {/* <OrbitControls makeDefault /> */}
      <perspectiveCamera position={[0, 0.5, 0]}>
        <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
        <ambientLight intensity={1.5} />
        <Suspense fallback={<h1>Loading...</h1>}>
          <Float speed={1} floatIntensity={-1}>
            <mesh ref={modelRef}>
              <primitive object={model.scene} scale={1} position-y={-1} />
            </mesh>
          </Float>
        </Suspense>
      </perspectiveCamera>
    </>
  );
}
