import React from 'react';
import { useRef } from 'react';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import SpeechBubble from '../components/SpeeachBubble';

import { ducks } from '../../data';
import { myContext } from '../components/ContextProvider.jsx';
import P from '../components/P';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);

function DescSectionThree() {
  const { activeDuck } = myContext();
  const refS3 = useRef();
  const sectionRef3 = useRef();

  return (
    <section
      ref={refS3}
      className='h-[100vh] flex items-start flex-col justify-start'
      id='s5'
    >
      <div ref={sectionRef3} className='-translate-x-12 lg:translate-x-[10rem]'>
        <SpeechBubble
          direction='left'
          textReveal1="Alright, it's time. Let's start the test, "
          textReveal2="share your code and I'll do my best!"
          sectionRef={refS3}
        />
      </div>
    </section>
  );
}

export default DescSectionThree;
