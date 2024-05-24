import React from 'react';
import { ducks } from '../../data';

import { myContext } from './ContextProvider';

function P({ children }) {
  const { activeDuck, setActiveDuck } = myContext();

  return (
    <p
      className='max-w-[30rem] ml-[15%]'
      style={{
        color: ducks[activeDuck].secondaryClr,
      }}
    >
      {children}
    </p>
  );
}

export default P;
