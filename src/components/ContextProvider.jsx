// ContextProvider.jsx
import React, { createContext, useState } from "react";

export const Context = createContext(null);

export const ContextProvider = ({ children }) => {
  const [activeDuck, setActiveDuck] = useState(3);
  const [pressedButton, setPressedButton] = useState(null);

  const value = {
    activeDuck,
    setActiveDuck,
    pressedButton,
    setPressedButton,
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
