import { Canvas } from '@react-three/fiber';
import Experience from './components/Experience';
import { useGSAP } from '@gsap/react';
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { Path } from 'three';
gsap.registerPlugin(ScrollTrigger);

function App() {
  const canvasRef = useRef();
  const circleRef = useRef();
  const s1Ref = useRef();
  const s2Ref = useRef();
  const s3Ref = useRef();

  useGSAP(() => {
    gsap.to(canvasRef.current, {
      opacity: 1,
      duration: 3,
      ease: 'power1.inOut',
    });
    gsap.to(s1Ref.current, {
      opacity: 1,
      duration: 3,
      ease: 'power1.inOut',
    });
    gsap.to(s2Ref.current, {
      scrollTrigger: {
        trigger: '#s2',
        start: 'top center',
        end: 'bottom bottom',
        scrub: 1,
      },
      opacity: 1,
    });
    gsap.to(s3Ref.current, {
      scrollTrigger: {
        trigger: '#s3',
        start: 'top center',
        end: 'bottom bottom',
        scrub: 1,
      },
      opacity: 1,
    });
    gsap.to(circleRef.current, {
      scrollTrigger: {
        trigger: '#s4',
        start: 'top center+=30%',
        end: 'bottom bottom',
        scrub: 1,
      },
      y: '-100%',
      scale: 1.5,
    });
  }, []);

  const [activeDuck, setActiveDuck] = useState(0);

  const ducks = [
    {
      name: 'rubberDuck',
      path: './rubber_duck/scene.gltf',
      primaryClr: '#99A585',
      secondaryClr: '#F5D02A',
      thirdClr: '#E57C2B',
    },
    {
      name: 'demonDuck',
      path: './demon_duckling/scene.gltf',
      primaryClr: '#2E0B0B',
      secondaryClr: '#C34E0D',
      thirdClr: '#8F0405',
    },
    {
      name: 'sawDuck',
      path: './ducksaw/scene.gltf',
      primaryClr: '#4E94CE',
      secondaryClr: '#F1F3C3',
      thirdClr: '#A7E22E',
    },
  ];

  return (
    <main
      className='overflow-x-hidden'
      style={{
        backgroundColor: ducks[activeDuck].primaryClr,
      }}
    >
      <div
        className={`h-[400vh] w-[100vw] border-[1rem]  flex justify-center pt-[2rem]'
        id='s1`}
      >
        <div
          className='relative flex flex-col items-center opacity-0 z-[2]'
          ref={s1Ref}
        >
          <h1
            style={{
              color: ducks[activeDuck].secondaryClr,
            }}
            className='text-[4rem] font-bold'
          >
            FIRST SECTION
          </h1>
        </div>
      </div>

      <section
        className='h-lvh border flex-col flex items-center pt-[2rem]'
        id='s2'
      >
        <div
          className='relative flex flex-col items-center opacity-0 z-[2]'
          ref={s2Ref}
        >
          <h1
            style={{
              color: ducks[activeDuck].secondaryClr,
            }}
            className='text-[4rem] font-bold'
          >
            SECOND SECTION
          </h1>
          <button
            style={{
              backgroundColor: ducks[activeDuck].thirdClr,
            }}
            className='p-4 '
            onClick={() => {
              setActiveDuck((prev) => prev + 1);
              console.log('click');
            }}
          >
            CLICK
          </button>
        </div>
      </section>

      <section
        className='h-[100vh] border flex items-center flex-col pt-[2rem]'
        id='s3'
      >
        <div
          className='relative flex flex-col items-center opacity-0 z-[2]'
          ref={s3Ref}
        >
          <h1
            style={{
              color: ducks[activeDuck].secondaryClr,
            }}
            className='text-[4rem] font-bold'
          >
            THIRD SECTION
          </h1>
        </div>
      </section>

      <div className='relative z-10 round-background'>
        <svg
          ref={circleRef}
          width='110%'
          height='50%'
          viewBox='0 0 100 30'
          preserveAspectRatio='none'
          className='absolute bottom-[40%] left-[50%] translate-x-[-50%] z-[-1] scale-[2]'
        >
          <ellipse cx='50' cy='15' rx='50' ry='15' fill='#f87171' />
        </svg>
        <section
          className='h-lvh w-lvw flex  flex-col bg-[#f87171] z-[0] relative'
          id='s4'
        >
          <div className=' flex flex-col items-center'>
            <h1
              style={{
                color: ducks[activeDuck].secondaryClr,
              }}
              className='text-[4rem] font-bold'
            >
              LAST SECTION
            </h1>
          </div>
        </section>
      </div>

      <div
        ref={canvasRef}
        className='opacity-0 fixed top-0 left-0 h-full w-full z-[1] border-[0.5rem] border-orange-300'
      >
        <Canvas>
          <Experience duck={ducks[activeDuck].path} />
        </Canvas>
      </div>
    </main>
  );
}

export default App;
