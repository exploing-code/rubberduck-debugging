import React from 'react';
import P from '../components/P';

function DescSectionOne() {
  return (
    <section
      className='h-[200vh]  flex items-start flex-col pt-[2rem] justify-center'
      id='s3'
    >
      <P>
        Now that you have chosen a duck it’s time to try your debugging luck!
      </P>
    </section>
  );
}

export default DescSectionOne;
