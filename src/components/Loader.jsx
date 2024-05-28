import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Loader({ initSiteLoader }) {
  const [isOpen, setIsOpen] = useState(true);
  const [timer, setTimer] = useState(0);
  const componentRef = useRef(null);
  const tl = gsap.timeline();

  useEffect(() => {
    if (isOpen) {
      tl.to(componentRef.current, {
        y: 0,
        duration: 2,
        ease: 'power4.inOut',
      });
      tl.to(componentRef.current, {
        y: '-100vw',
        delay: 1,
        duration: 2,
        ease: 'power4.inOut',
      });
      tl.to(componentRef.current, {
        opacity: 0,
        zIndex: -1,
      });
      setIsOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (timer < 100) {
      const id = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 40);
      return () => clearInterval(id);
    }
  }, [timer]);

  return (
    <>
      <div
        ref={componentRef}
        className={`w-screen h-screen bg-[#000000] fixed  z-[4000] flex justify-center items-center text-4xl ${
          initSiteLoader ? '' : 'translate-y-[100vw]'
        }`}
        onLoad={() => setIsOpen(isOpen)}
      >
        <h1 className='text-[#FBD652] lg:text-[20rem]'>{timer}%</h1>
      </div>
    </>
  );
}
