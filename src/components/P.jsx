import React from 'react';
import { ducks } from '../../data';

import { myContext } from './ContextProvider';

function P({ children, style }) {
  const { activeDuck, setActiveDuck } = myContext();

  return (
    <p
      className={`transition-colors duration-500 ease-in-out ${style}`}
      style={{
        color: ducks[activeDuck].secondaryClr,
      }}
    >
      {children}
    </p>
  );
}

export default P;
