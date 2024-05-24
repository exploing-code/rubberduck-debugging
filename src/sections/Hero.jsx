import React from 'react';

function Hero({ ducks, activeDuck }) {
  return (
    <section
      className={`h-[300vh] w-[100vw] flex justify-center pt-[2rem]'
        `}
      id='s1'
    >
      <div className='relative  flex flex-col items-center  text-[14rem]'>
        <h1
          className='relative'
          style={{
            color: ducks[activeDuck].secondaryClr,
          }}
        >
          RUBBER DUCK
        </h1>
        <h1
          className='absolute z-10 top-0 translate-y-[35rem] text-[17rem]'
          style={{
            color: ducks[activeDuck].secondaryClr,
          }}
        >
          DEBUGGING
        </h1>
      </div>
    </section>
  );
}

export default Hero;
