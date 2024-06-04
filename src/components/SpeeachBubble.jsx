import React, { useContext, useRef, useEffect } from 'react';
import { ducks } from '../../data';
import { Context } from './ContextProvider';
import P from './P';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { v4 as uuidv4 } from 'uuid';

export default function SpeechBubble({
  direction,
  textReveal1,
  textReveal2,
  sectionRef,
}) {
  const { activeDuck } = useContext(Context);
  const bubbleRef = useRef(null);

  // create random id so that the first and the second bubble wont have the same text
  const uniqueClass1 = `textP1-${uuidv4()}`;
  const uniqueClass2 = `textP2-${uuidv4()}`;

  useGSAP(() => {
    // Generate unique class names
    gsap.fromTo(
      bubbleRef.current,
      { y: 0 },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'center center',
          end: 'bottom bottom',
        },
        duration: 1,
        ease: 'power1.inOut',
        yoyo: true,
      }
    );

    const bubbleTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'center center',
        end: 'bottom bottom',
      },
    });

    bubbleTl
      .to(`.${uniqueClass1}`, {
        duration: 1.2,
        text: textReveal1,
      })
      .to(`.${uniqueClass2}`, {
        duration: 1.2,
        text: textReveal2,
      });
  }, [textReveal1, textReveal2, sectionRef, uniqueClass1, uniqueClass2]);

  return (
    <div ref={bubbleRef} className='relative flex items-center justify-center'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox={'500 50 1100 1073'}
        fill={ducks[activeDuck].secondaryClr}
        className={`  w-[20em] sm:w-[27em] ${
          direction === 'left'
            ? ' rotate-12'
            : 'transform scale-x-[-1] -rotate-12'
        } sm:rotate-0`}
      >
        <path d='M547.89,580.04c1.92,285.82,240.81,529.95,526.64,529.95,29.05.03,493.9-.03,505.08,0,4.86-83.11-47.15-169.41-131.62-192.87-51.82-13.72-76.2-13.47-124.84-4.63-20.63,4.42-23.58-17.69-10.32-22.11,4.44-1.47,10.29-3.08,17.69-4.42,64.85-11.79,129.7,5.9,129.7,5.9,82.27-91.85,134.86-182.34,134.12-315.41-27.84-696.15-1023.31-692.88-1046.45,3.6ZM1222.07,134.9c2.11-6.18,8.8-9.48,14.96-7.38,1.67.57,41.3,14.25,92.41,50.78,46.99,33.56,112.97,93.68,160.51,189.51,2.89,5.82.5,12.9-5.34,15.8-1.68.83-3.46,1.22-5.22,1.22-4.35,0-8.52-2.4-10.58-6.56-45.16-91.07-107.76-148.29-152.31-180.24-24.22-17.38-45.88-29.39-61.55-37.07-15.67-7.69-25.32-11.04-25.51-11.11-6.16-2.09-9.46-8.78-7.37-14.95Z' />
      </svg>
      <div
        className={`absolute w-[70%] sm:w-[70%] ${
          direction === 'left' ? 'sm:ml-8 mt-3 ' : 'sm:-mt-4 '
        } -mt-8 text-center sm:text-left sm:mt-6 `}
      >
        <P color={activeDuck === 1 || activeDuck === 2 ? 'third' : 'primary'} style={"h-20"}>
          <span className={uniqueClass1}></span>
        </P>
        <P color={activeDuck === 1 || activeDuck === 2 ? 'third' : 'primary'} style={"h-20"}>
          <span className={uniqueClass2}></span>
        </P>
      </div>
    </div>
  );
}
