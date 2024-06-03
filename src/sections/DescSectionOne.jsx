import React from 'react';
import { useRef } from 'react';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

import { ducks } from '../../data';
import { myContext } from '../components/ContextProvider.jsx';
import P from '../components/P';
import Background from '../components/Background.jsx';
import backgroundOrange from '../assets/background-orange.png';

gsap.registerPlugin(TextPlugin);

function DescSectionOne() {
  const { activeDuck } = myContext();
  const refS1 = useRef();

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: refS1.current,
          start: 'top center',
          end: 'bottom center',
        },
      });
      tl.to('.revealSectionOne1', {
        duration: 2,
        text: 'The bug hunt can be a fickle game, fixing one can bring another to fame,',
      });
      tl.to('.revealSectionOne2', {
        duration: 2,
        text: 'As the codebase shifts and grows, new bugs transpire from deep below.',
      });
      tl.to('.revealSectionOne3', {
        duration: 2,
        text: 'For bugs will always have their way, still we push our code to prod anyway (wait what?)',
      });
    },
    { scope: refS1 }
  );

  //   const textBgColour = '[${ducks[activeDuck].primaryClr}]';
  //   const textColour = '[${ducks[activeDuck].secondaryClr}]';
  return (
    <section
      ref={refS1}
      className='h-screen'
      id='s3'
      style={{
        backgroundImage: `url(${backgroundOrange})`,
        backgroundSize: 'contain',
      }}
    >
      {/* <img src={backgroundOrange} alt='' /> */}
      <div
        className={`ml-10 text-[${ducks[activeDuck].secondaryClr}] text-sm md:text-lg absolute top-[20rem] left-[10rem]`}
      >
        <P style={`w-[20rem] mb-5 bg-amber-100`}>
          <span className={`revealSectionOne1 `}></span>
        </P>
        <P style={`w-[20rem] mb-5 `}>
          <span className={`revealSectionOne2 bg-amber-100`}></span>
        </P>
        <P style={`w-[20rem] mb-5 bg-amber-100`}>
          <span className='revealSectionOne3'></span>
        </P>
      </div>
    </section>
  );
}

export default DescSectionOne;
