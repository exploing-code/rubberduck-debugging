import React, { useRef } from 'react';
import emphasis from '../assets/emphasis.svg';
import SpeechBubble from '../components/SpeeachBubble.jsx';
import { myContext } from '../components/ContextProvider.jsx';
import { ducks } from '../../data';

function DescSectionTwo() {
  const refS2 = useRef();
  const sectionRef = useRef();
  const bubbleRef = useRef();

  const { activeDuck } = myContext();

  return (
    <section ref={refS2} id='s4'>
      <div
        ref={sectionRef}
        className='h-[100lvh] flex items-center lg:items-start justify-around'
      >
        <div className='translate-y-[1rem] sm:translate-y-0 lg:translate-y-[6rem] lg:translate-x-[4rem]'>
          <img
            // style={{ fill: ducks[activeDuck].secondaryClr }}
            className={`rotate-[20deg] sm:rotate-[12deg]  lg:-rotate-12`}
            src={emphasis}
          />
        </div>

        <div
          ref={bubbleRef}
          className={
            'relative flex items-center w-96 -translate-y-[10rem] lg:translate-y-0'
          }
        >
          <SpeechBubble
            direction='right'
            textReveal1="So now that you have chosen a duck it's time to try your debugging luck!"
            textReveal2="Let's go through your code and make sure that it doesn't suck!"
            sectionRef={refS2}
          />
        </div>
      </div>
    </section>
  );
}

export default DescSectionTwo;
