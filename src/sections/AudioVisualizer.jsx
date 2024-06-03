import React, { useEffect, useRef, useState } from 'react';
import P from '../components/P';
import Visualizer from '../components/Vizualizer';
import { myContext } from '../components/ContextProvider';
import Button from '../components/Button';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ducks } from '../../data';

export default function AudioVisualizer() {
  const { setPartyOn, setRenderS2Loading, activeDuck } = myContext();
  const songRef = useRef(null);
  const textRef = useRef(null);
  const wrapperRef = useRef(null);
  const buttonsRef = useRef(null);
  const sectionRef = useRef(null);

  // disable scroll when entering the section
  //   useEffect(() => {
  //     function handleScroll() {
  //       if (sectionRef) {
  //         let yValue = sectionRef.current.getBoundingClientRect().y;
  //         if (yValue === 0) {
  //           document.body.style.overflow = 'hidden';
  //         }
  //       }
  //     }

  //     window.addEventListener('scroll', handleScroll);
  //     return () => {
  //       window.removeEventListener('scroll', handleScroll);
  //     };
  //   }, [sectionRef]);

  // Text and buttons enter
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
        },
      });
      tl.to(textRef.current, {
        delay: 7,
        duration: 2,
        text: `Are you still stuck?`,
      });
      tl.to(buttonsRef.current.children, {
        translateY: 0,
        ease: 'back.out',
        stagger: 0.1,
        duration: 0.2,
      });
    },
    { scope: sectionRef }
  );

  function handleClickNo() {
    setPartyOn(true);
    songRef.current.currentTime = 32.9;
    songRef.current.play().catch((err) => {
      console.error('Error playing song:', err);
    });

    gsap.to(wrapperRef.current, {
      opacity: 0,
    });
  }
  function handleClickYes() {
    setRenderS2Loading(true);
    document.body.style.overflow = 'auto';
  }

  return (
    <section
      ref={sectionRef}
      id='s6'
      className=' w-screen relative flex items-center justify-center h-screen'
    >
      <div ref={wrapperRef} className={` absolute top-4 left-6 z-[500]`}>
        <P style={'mb-2 ml-4'}>
          <span ref={textRef}></span>
        </P>
        <div
          ref={buttonsRef}
          className='flex gap-4 *:-translate-y-[100%] overflow-hidden'
        >
          <Button onClick={handleClickNo} text='no' />
          <Button onClick={handleClickYes} text='yes' />
        </div>
      </div>
      <audio ref={songRef} src='../sound-effects/Wobbly-duck.mp3'></audio>
      <Visualizer />
    </section>
  );
}
