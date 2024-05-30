import React from 'react';
import P from '../components/P';

import { ducks } from '../../data';

// components
import CharSelectButton from '../components/CharSelectButton';

import { myContext } from '../components/ContextProvider.jsx';

function CharSelection() {
  const { activeDuck } = myContext();

  return (
    <>
      <section
        className='flex-col flex pt-[2rem] justify-between relative bg-blue-200'
        id='s2'
      >
        <div className='relative flex flex-col items-center justify-center z-[2] h-screen w-screen'>
          <P style={'absolute top-[5rem]'}>Are you stuck? Choose a duck!</P>
          <div className='flex relative w-full justify-between z-[1000]'>
            <CharSelectButton ducks={ducks} version='left' />
            <CharSelectButton ducks={ducks} version='right' />
          </div>
          <h2
            style={{
              color: ducks[activeDuck].secondaryClr,
            }}
            className='text-[3rem] sm:text-[5rem] md:text-[8rem] lg:text-[10rem] absolute bottom-[5rem] md:bottom-[-2rem]'
          >
            {ducks[activeDuck].name}
          </h2>
        </div>
      </section>
    </>
  );
}

export default CharSelection;
