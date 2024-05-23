import { Canvas } from '@react-three/fiber';
import Experience from './components/Experience';
import { useGSAP } from '@gsap/react';
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { GoTriangleRight } from 'react-icons/go';
import { GoTriangleLeft } from 'react-icons/go';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const canvasRef = useRef();
  const circleRef = useRef();
  const s1Ref = useRef();
  const s2Ref = useRef();
  const s3Ref = useRef();

  //   useGSAP(() => {
  //     gsap.to(canvasRef.current, {
  //       opacity: 1,
  //       duration: 3,
  //       ease: 'power1.inOut',
  //     });
  //     gsap.to(s1Ref.current, {
  //       opacity: 1,
  //       duration: 3,
  //       ease: 'power1.inOut',
  //     });
  //     gsap.to(s2Ref.current, {
  //       scrollTrigger: {
  //         trigger: '#s2',
  //         start: 'top center',
  //         end: 'bottom bottom',
  //         scrub: 1,
  //       },
  //       opacity: 1,
  //     });
  //     gsap.to(s3Ref.current, {
  //       scrollTrigger: {
  //         trigger: '#s3',
  //         start: 'top center',
  //         end: 'bottom bottom',
  //         scrub: 1,
  //       },
  //       opacity: 1,
  //     });
  //     gsap.to(circleRef.current, {
  //       scrollTrigger: {
  //         trigger: '#s4',
  //         start: 'top center+=30%',
  //         end: 'bottom bottom',
  //         scrub: 1,
  //       },
  //       y: '-100%',
  //       scale: 1.5,
  //     });
  //   }, []);

  const [activeDuck, setActiveDuck] = useState(0);

  const ducks = [
    {
      name: 'rubberDuck',
      path: './rubber_duck/scene.gltf',
      primaryClr: '#99A585',
      secondaryClr: 'black',
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
      thirdClr: '#DFC34D',
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
        className={`h-[300vh] w-[100vw] flex justify-center pt-[2rem]'
        `}
        id='s1'
      >
        <div
          className='relative  flex flex-col items-center  text-[14rem]'
          ref={s1Ref}
        >
          <h1
            className='relative'
            style={{
              color: ducks[activeDuck].secondaryClr,
            }}
          >
            RUBBER DUCK
          </h1>
          <h1
            className='absolute z-10 top-0 translate-y-[35rem] text-[17rem]'
            style={{
              color: ducks[activeDuck].secondaryClr,
            }}
          >
            DEBUGGING
          </h1>
        </div>
      </div>

      <section
        className=' flex-col flex pt-[2rem] justify-between relative z-[1000]'
        id='s2'
      >
        <div
          className='relative flex flex-col items-center justify-between p-[5rem] z-[2] h-screen w-screen '
          ref={s2Ref}
        >
          <p
            style={{
              color: ducks[activeDuck].secondaryClr,
            }}
          >
            Are you stuck? Choose a duck!
          </p>
          <div className='flex relative w-full justify-between z-[1000]'>
            <button
              className='p-4'
              onClick={() => {
                setActiveDuck((prev) =>
                  prev - 1 < 0 ? ducks.length - 1 : prev - 1
                );
              }}
            >
              <GoTriangleLeft
                className='text-[15rem]'
                style={{
                  fill: ducks[activeDuck].thirdClr,
                }}
              />
            </button>
            <button
              className='p-4 '
              onClick={() => {
                setActiveDuck((prev) => (prev + 1) % ducks.length);
              }}
            >
              <GoTriangleRight
                className='text-[15rem]'
                style={{
                  fill: ducks[activeDuck].thirdClr,
                }}
              />
            </button>
          </div>
          <p
            style={{
              color: ducks[activeDuck].secondaryClr,
            }}
          >
            {ducks[activeDuck].name}
          </p>
        </div>
      </section>

      <section
        className='h-[200vh]  flex items-start flex-col pt-[2rem] justify-center'
        id='s3'
      >
        <p
          className='max-w-[30rem] ml-[15%]'
          style={{
            color: ducks[activeDuck].secondaryClr,
          }}
        >
          Now that you have chosen a duck it’s time to try your debugging luck!
        </p>
      </section>
      <section
        className='h-[200vh]  flex items-start flex-col pt-[2rem] justify-center'
        id='s3'
      >
        <p
          className='max-w-[50rem] ml-[15%]'
          style={{
            color: ducks[activeDuck].secondaryClr,
          }}
        >
          Let's go through your code and make sure that it doesn't suck!
        </p>
      </section>

      <section
        className='h-[200vh]  flex items-end flex-col  justify-center'
        id='s3'
      >
        <div className='flex flex-col gap-[5rem] mr-[15rem]'>
          <p
            className='max-w-[20rem] '
            style={{
              color: ducks[activeDuck].secondaryClr,
            }}
          >
            Explain your code, line by line
          </p>

          <p
            className='max-w-[20rem] -translate-x-[4rem]'
            style={{
              color: ducks[activeDuck].secondaryClr,
            }}
          >
            Get ready to start, Be steady and smart
          </p>
        </div>
      </section>

      <section
        id='s6'
        className=' flex-col flex pt-[2rem] justify-between bg-white'
      >
        <div
          className='relative flex flex-col items-center justify-between p-[5rem] z-[2] h-[200vw] w-screen '
          ref={s2Ref}
        >
          <p
            style={{
              color: ducks[activeDuck].secondaryClr,
            }}
          >
            Are you stuck? Choose a duck!
          </p>
          <div className='flex w-full justify-between'>
            <button
              style={{
                backgroundColor: ducks[activeDuck].thirdClr,
              }}
              className='p-4 '
              onClick={() => {
                setActiveDuck((prev) => prev - 1);
              }}
            >
              LEFT
            </button>
            <button
              style={{
                backgroundColor: ducks[activeDuck].thirdClr,
              }}
              className='p-4 '
              onClick={() => {
                setActiveDuck((prev) => prev + 1);
              }}
            >
              RIGHT
            </button>
          </div>
          <p
            style={{
              color: ducks[activeDuck].secondaryClr,
            }}
          >
            {ducks[activeDuck].name}
          </p>
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
        <section className='h-lvh w-lvw flex  flex-col bg-[#f87171] z-[0] relative'>
          <div className=' flex flex-col items-center'>
            <h1
              style={{
                color: ducks[activeDuck].secondaryClr,
              }}
            >
              LAST SECTION
            </h1>
          </div>
        </section>
      </div>

      <div ref={canvasRef} className=' fixed top-0 left-0 h-full w-full z-[1]'>
        <Canvas>
          <Experience
            duck={ducks[activeDuck].path}
            size={ducks[activeDuck].size}
          />
        </Canvas>
      </div>
    </main>
  );
}

export default App;
