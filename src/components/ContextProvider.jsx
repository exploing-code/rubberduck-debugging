// ContextProvider.jsx
import React, { createContext, useState } from "react";

export const Context = createContext(null);

export const ContextProvider = ({ children }) => {
	const [activeDuck, setActiveDuck] = useState(0);
	const [pressedButton, setPressedButton] = useState(false);
	const [partyOn, setPartyOn] = useState(false);
	const [renderS2Loading, setRenderS2Loading] = useState(false);

	const value = {
		activeDuck,
		setActiveDuck,
		pressedButton,
		setPressedButton,
		partyOn,
		setPartyOn,
		renderS2Loading,
		setRenderS2Loading,
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
