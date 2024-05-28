import React from 'react';
import { ducks } from '../../data';

import { myContext } from './ContextProvider';

function P({ children }) {
  const { activeDuck, setActiveDuck } = myContext();

  return (
    <p
      className='max-w-[50rem] text-base'
      style={{
        color: ducks[activeDuck].secondaryClr,
      }}
    >
      {children}
    </p>
  );
}

export default P;
