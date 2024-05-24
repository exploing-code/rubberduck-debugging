import React from 'react';

import { GoTriangleRight } from 'react-icons/go';
import { GoTriangleLeft } from 'react-icons/go';

function CharSelectButton({ ducks, setActiveDuck, version, activeDuck }) {
  return version === 'right' ? (
    <button
      className='p-4'
      onClick={() => setActiveDuck((prev) => (prev + 1) % ducks.length)}
    >
      <GoTriangleRight
        className='text-[15rem]'
        style={{
          fill: ducks[activeDuck].thirdClr,
        }}
      />
    </button>
  ) : (
    version === 'left' && (
      <button
        className='p-4'
        onClick={() =>
          setActiveDuck((prev) => (prev - 1 < 0 ? ducks.length - 1 : prev - 1))
        }
      >
        <GoTriangleLeft
          className='text-[15rem]'
          style={{
            fill: ducks[activeDuck].thirdClr,
          }}
        />
      </button>
    )
  );
}

export default CharSelectButton;
