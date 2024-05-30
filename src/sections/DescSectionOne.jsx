import React from 'react';
import { useRef } from 'react';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

import { ducks } from '../../data';
import { myContext } from '../components/ContextProvider.jsx';
import P from '../components/P';
import background from '../assets/background.png';

gsap.registerPlugin(TextPlugin);

function DescSectionOne() {
  const { activeDuck } = myContext();
  const ref = useRef();

  useGSAP(
    () => {
      const tl = gsap.timeline({});
      tl.to('.reveal1', {
        duration: 2,
        text: 'The bug hunt can be a fickle game, Fixing one can bring another to fame,',
      });
      tl.to('.reveal2', {
        duration: 2,
        text: 'As the codebase shifts and grows, New bugs transpire from deep below.',
      });
      tl.to('.reveal3', {
        duration: 2,
        text: 'For bugs will always have their way, Still we push our code to prod anyway (wait what?)',
      });
    },
    { scope: ref }
  );

  return (
    <section
      className='h-[200vh] flex items-start flex-col pt-[2rem] justify-center border border-t-2'
      id='s3'
      style={{ backgroundImage: `url(${background})` }}
    >
      <div ref={ref}>
        <P
          style={`w-[20rem] text-sm mb-5 text-[${ducks[activeDuck].secondaryClr}]`}
        >
          <span className='reveal1 bg-amber-200'></span>
        </P>
        <div></div>
        <P style={`w-[20rem] text-sm mb-5 bg-amber-200`}>
          <span className='reveal2'></span>
        </P>
        <P style={`w-[20rem] text-sm mb-5 bg-amber-200`}>
          <span className='reveal3'></span>
        </P>
      </div>
    </section>
  );
}

export default DescSectionOne;
