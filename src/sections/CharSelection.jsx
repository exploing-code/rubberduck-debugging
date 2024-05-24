import React from 'react';
import P from '../components/P';

import { ducks } from '../../data';
import { myContext } from '../components/ContextProvider.jsx';

// components
import CharSelectButton from '../components/CharSelectButton';

function CharSelection() {
  const { activeDuck, setActiveDuck } = myContext();
  return (
    <section
      className=' flex-col flex pt-[2rem] justify-between relative z-[1000]'
      id='s2'
    >
      <div className='relative flex flex-col items-center justify-between p-[5rem] z-[2] h-screen w-screen '>
        <P>Are you stuck? Choose a duck!</P>
        <div className='flex relative w-full justify-between z-[1000]'>
          <CharSelectButton
            ducks={ducks}
            setActiveDuck={setActiveDuck}
            activeDuck={activeDuck}
            version='left'
          />
          <CharSelectButton
            ducks={ducks}
            setActiveDuck={setActiveDuck}
            activeDuck={activeDuck}
            version='right'
          />
        </div>
        <P>{ducks[activeDuck].name}</P>
      </div>
    </section>
  );
}

export default CharSelection;
