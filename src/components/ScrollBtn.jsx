import React, { useState, useEffect } from 'react';

import { myContext } from '../components/ContextProvider.jsx';

function ScrollBtn() {
  const [arrow, setArrow] = useState('🔼');
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [number, setNumber] = useState(1);

  const { hover, setHover, isAudioCtxActivated, setIsAudioCtxActivated } =
    myContext();

  useEffect(() => {
    const updateMouseCoordinates = (e) => {
      let y = e.clientY;

      setX(e.clientX);
      setY(e.clientY);

      const windowHeight = window.innerHeight;

      if (y > windowHeight / 2) {
        setArrow('🔽');
      }
      if (y < windowHeight / 2) {
        setArrow('🔼');
      }
    };

    window.addEventListener('mousemove', updateMouseCoordinates);

    return () => {
      window.removeEventListener('mousemove', updateMouseCoordinates);
    };
  }, []);

  useEffect(() => {
    const handleClick = () => {
      const windowHeight = window.innerHeight;

      if (y > windowHeight / 2) {
        setNumber((prevNumber) =>
          prevNumber < 6 ? prevNumber + 1 : prevNumber
        );
      }
      if (y < windowHeight / 2) {
        setNumber((prevNumber) =>
          prevNumber > 1 ? prevNumber - 1 : prevNumber
        );
      }
    };

    if (hover === 'not-hovered') {
      window.addEventListener('click', handleClick);

      if (!isAudioCtxActivated) {
        setIsAudioCtxActivated(true);
      }
    }

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [y]);

  useEffect(() => {
    const section = document.getElementById('s' + number);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }, [number]);

  return (
    <div
      className={`fixed p-[20px] z-[500] text-[3rem] curer-pointer pointer-events-none  ${
        hover === 'hovered' ? 'cursor-pointer' : 'cursor-none'
      }`}
      style={{ top: `${y - 30}px`, left: `${x - 30}px` }}
    >
      {hover === 'hovered' ? '' : arrow}
    </div>
  );
}

export default ScrollBtn;
