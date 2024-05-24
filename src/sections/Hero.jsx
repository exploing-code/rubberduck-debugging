import React from 'react';

import { ducks } from '../../data';
import { myContext } from '../components/ContextProvider.jsx';

function Hero() {
  const { activeDuck, setActiveDuck } = myContext();

  return (
    <section
      className={`h-[300vh] w-[100vw] flex justify-center pt-[2rem]'
        `}
      id='s1'
    >
      <div className='relative  flex flex-col items-center  text-[14rem]'>
        <h1
          className='relative'
          style={{
            color: ducks[activeDuck].secondaryClr,
          }}
        >
          RUBBER DUCK
        </h1>
        <h1
          className='absolute z-10 top-0 translate-y-[35rem] text-[17rem]'
          style={{
            color: ducks[activeDuck].secondaryClr,
          }}
        >
          DEBUGGING
        </h1>
      </div>
    </section>
  );
}

export default Hero;
