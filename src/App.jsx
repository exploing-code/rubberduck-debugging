// libraries
import { Canvas } from '@react-three/fiber';
import React, { useContext, useRef, useState } from 'react';

// data
import { ducks } from '../data';

// components
import Experience from './components/Experience';

// sections
import Hero from './sections/Hero';
import CharSelectSection from './sections/CharSelection';
import DescSectionOne from './sections/DescSectionOne';
import DescSectionTwo from './sections/DescSectionTwo';
import DescSectionThree from './sections/DescSectionThree';
import AudioVisualizer from './sections/AudioVisualizer';
import Conclusion from './sections/Conclusion';

import { myContext } from './components/ContextProvider';

function App() {
  const { activeDuck, setActiveDuck } = myContext();

  const canvasRef = useRef();

  return (
    <div>
      <div
        className={`${activeDuck === 1 ? 'fire visible' : ' hidden '}`}
      ></div>

      <main
        className={`overflow-x-hidden transition-colors duration-500 ease-in-out`}
        style={{
          backgroundColor: ducks[activeDuck].primaryClr,
        }}
      >
        <Hero />
        <CharSelectSection />
        <DescSectionOne />
        <DescSectionTwo />
        <DescSectionThree />
        <AudioVisualizer />
        <Conclusion />
        <div ref={canvasRef} className='fixed top-0 left-0 h-full w-full z-[1]'>
          <Canvas>
            <Experience />
          </Canvas>
        </div>
      </main>
    </div>
  );
}

export default App;
