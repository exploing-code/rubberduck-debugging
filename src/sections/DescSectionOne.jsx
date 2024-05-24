import React from 'react';

function DescSectionOne({ ducks, activeDuck }) {
  return (
    <section
      className='h-[200vh]  flex items-start flex-col pt-[2rem] justify-center'
      id='s3'
    >
      <p
        className='max-w-[30rem] ml-[15%]'
        style={{
          color: ducks[activeDuck].secondaryClr,
        }}
      >
        Now that you have chosen a duck it’s time to try your debugging luck!
      </p>
    </section>
  );
}

export default DescSectionOne;
