import React from 'react';

import CharSelectButton from '../components/CharSelectButton';

function CharSelection({ ducks, activeDuck, setActiveDuck }) {
  return (
    <section
      className=' flex-col flex pt-[2rem] justify-between relative z-[1000]'
      id='s2'
    >
      <div className='relative flex flex-col items-center justify-between p-[5rem] z-[2] h-screen w-screen '>
        <p
          style={{
            color: ducks[activeDuck].secondaryClr,
          }}
        >
          Are you stuck? Choose a duck!
        </p>
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
        <p
          style={{
            color: ducks[activeDuck].secondaryClr,
          }}
        >
          {ducks[activeDuck].name}
        </p>
      </div>
    </section>
  );
}

export default CharSelection;
