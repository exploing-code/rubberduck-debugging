import React, { useContext, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export default function LoadingScreen({
  setIsLoaded,
  setRenderInitialLoading,
}) {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);
  countRef.current = count;
  const containerRef = useRef();

  function handleLoad() {
    setCount(Math.floor(countRef.current));

    if (countRef.current === 100) {
      setIsLoaded(true);
    }
  }

  useGSAP(() => {
    gsap.to(countRef, {
      duration: 5,
      current: 100,
      ease: 'power4.inOut',
      onUpdate: handleLoad,
      onComplete: () => {
        gsap.to(containerRef.current, {
          y: '-100vh',
          duration: 2,
          ease: 'power4.inOut',
          onComplete: () => {
            setRenderInitialLoading(false);
          },
        });
      },
    });
  }, []);

  return (
    <div
      className='bg-black h-[100vh] w-full z-[1000] fixed top-0 left-0 flex justify-center items-center'
      ref={containerRef}
    >
      <h1 className='m-0 text-[#FFEC43] lg:text-[20rem]'>{count}%</h1>
    </div>
  );
}
