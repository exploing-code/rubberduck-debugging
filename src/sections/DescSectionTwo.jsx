import React from 'react';

function DescSectionTwo({ ducks, activeDuck }) {
  return (
    <section
      className='h-[200vh]  flex items-start flex-col pt-[2rem] justify-center'
      id='s4'
    >
      <p
        className='max-w-[50rem] ml-[15%]'
        style={{
          color: ducks[activeDuck].secondaryClr,
        }}
      >
        Let's go through your code and make sure that it doesn't suck!
      </p>
    </section>
  );
}

export default DescSectionTwo;
