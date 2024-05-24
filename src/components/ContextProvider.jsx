import React, { createContext, useContext, useEffect, useState } from 'react';

export const Context = createContext(null);

export const ContextProvider = ({ children }) => {
  const [activeDuck, setActiveDuck] = useState(0);

  const value = {
    activeDuck,
    setActiveDuck,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const myContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useAuth must be used within an AuthenticationProvider');
  }
  return context;
};
