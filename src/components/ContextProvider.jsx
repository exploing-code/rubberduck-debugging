// ContextProvider.jsx
import React, { createContext, useEffect, useState } from "react";

export const Context = createContext(null);

export const ContextProvider = ({ children }) => {
  const [activeDuck, setActiveDuck] = useState(0);
  const [pressedButton, setPressedButton] = useState(false);
  const [partyOn, setPartyOn] = useState(false);
  const [renderS2Loading, setRenderS2Loading] = useState(false);
  const [isAudioCtxActivated, setIsAudioCtxActivated] = useState(false);
  const [isCharSelected, setIsCharSelected] = useState(false);

  // for removing window event listener for scroll
  const [hover, setHover] = useState("not-hovered");
  const [activeSectionNumb, setActiveSectionNumb] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);

  const value = {
    activeDuck,
    setActiveDuck,
    pressedButton,
    setPressedButton,
    partyOn,
    setPartyOn,
    renderS2Loading,
    setRenderS2Loading,
    isAudioCtxActivated,
    setIsAudioCtxActivated,
    isCharSelected,
    setIsCharSelected,
    hover,
    setHover,
    activeSectionNumb,
    setActiveSectionNumb,
    hasClicked,
    setHasClicked,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const myContext = () => {
  const context = React.useContext(Context);
  if (!context) {
    throw new Error("useMyContext must be used within a ContextProvider");
  }
  return context;
};
