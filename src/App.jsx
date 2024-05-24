// libraries
import { Canvas } from '@react-three/fiber';
import React, { useRef, useState } from 'react';

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

function App() {
  const canvasRef = useRef();
  const [activeDuck, setActiveDuck] = useState(0);

  return (
    <main
      className='overflow-x-hidden'
      style={{
        backgroundColor: ducks[activeDuck].primaryClr,
      }}
    >
      <Hero ducks={ducks} activeDuck={activeDuck} />
      <CharSelectSection
        ducks={ducks}
        activeDuck={activeDuck}
        setActiveDuck={setActiveDuck}
      />
      <DescSectionOne ducks={ducks} activeDuck={activeDuck} />
      <DescSectionTwo ducks={ducks} activeDuck={activeDuck} />
      <DescSectionThree ducks={ducks} activeDuck={activeDuck} />
      <AudioVisualizer />
      <Conclusion />

      <div ref={canvasRef} className='fixed top-0 left-0 h-full w-full z-[1]'>
        <Canvas>
          <Experience
            activeDuck={ducks[activeDuck].path}
            size={ducks[activeDuck].size}
          />
        </Canvas>
      </div>
    </main>
  );
}

export default App;
