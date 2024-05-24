import React from 'react';

function DescSectionThree({ ducks, activeDuck }) {
  return (
    <section
      className='h-[200vh]  flex items-end flex-col  justify-center'
      id='s5'
    >
      <div className='flex flex-col gap-[5rem] mr-[15rem]'>
        <p
          className='max-w-[20rem] '
          style={{
            color: ducks[activeDuck].secondaryClr,
          }}
        >
          Explain your code, line by line
        </p>

        <p
          className='max-w-[20rem] -translate-x-[4rem]'
          style={{
            color: ducks[activeDuck].secondaryClr,
          }}
        >
          Get ready to start, Be steady and smart
        </p>
      </div>
    </section>
  );
}

export default DescSectionThree;
