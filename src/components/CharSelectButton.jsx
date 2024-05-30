import React from 'react';

import { myContext } from '../components/ContextProvider.jsx';

// Icons
import { GoTriangleRight } from 'react-icons/go';
import { GoTriangleLeft } from 'react-icons/go';

function CharSelectButton({ ducks, version }) {
  const { activeDuck, setPressedButton } = myContext();

  const Icon = version === 'right' ? GoTriangleRight : GoTriangleLeft;

  return (
    <button className='p-4' onClick={() => setPressedButton(version)}>
      <Icon
        className='text-[5rem] md:text-[10rem] lg:text-[15rem] transition-colors duration-500 ease-in-out hover:scale-125 active:scale-100 opacity-75 hover:opacity-100'
        style={{
          fill: ducks[activeDuck].thirdClr,
        }}
      />
    </button>
  );
}

export default CharSelectButton;
