import React, { useState, useEffect, useRef } from 'react';

import { ducks } from '../../data';
import { myContext } from '../components/ContextProvider.jsx';

import { TbArrowBigDownFilled } from 'react-icons/tb';
import { TbArrowBigUpFilled } from 'react-icons/tb';

function ScrollBtn() {
  const [arrow, setArrow] = useState(<TbArrowBigUpFilled />);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const iconRef = useRef(null);

  const iconWidth = iconRef.current?.offsetWidth;
  const iconHeight = iconRef.current?.offsetHeight;

  const {
    hover,
    setHover,
    isAudioCtxActivated,
    setIsAudioCtxActivated,
    activeDuck,
    activeSectionNumb,
    setActiveSectionNumb,
  } = myContext();

  useEffect(() => {
    const updateMouseCoordinates = (e) => {
      let y = e.clientY;

      setX(e.clientX);
      setY(e.clientY);

      const windowHeight = window.innerHeight;

      if (y > windowHeight / 2) {
        setArrow(<TbArrowBigDownFilled />);
      }
      if (y < windowHeight / 2) {
        setArrow(<TbArrowBigUpFilled />);
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
        setActiveSectionNumb((prevNumber) =>
          prevNumber < 6 ? prevNumber + 1 : prevNumber
        );
      }
      if (y < windowHeight / 2) {
        setActiveSectionNumb((prevNumber) =>
          prevNumber > 1 ? prevNumber - 1 : prevNumber
        );
      }
    };

    if (hover === 'not-hovered') {
      window.addEventListener('click', handleClick);
    }

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [y]);

  useEffect(() => {
    const section = document.getElementById('s' + activeSectionNumb);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeSectionNumb]);

  return (
    <div
      ref={iconRef}
      className={`fixed p-[20px] z-[500] text-[6rem] curer-pointer pointer-events-none ${
        hover === 'hovered' ? 'cursor-pointer' : 'cursor-none'
      }`}
      style={{
        top: `${y - iconHeight / 2}px`,
        left: `${x - iconWidth / 2}px`,
        color: ducks[activeDuck].secondaryClr,
      }}
    >
      {hover === 'hovered' ? '' : arrow}
    </div>
  );
}

export default ScrollBtn;
