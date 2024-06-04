import React from "react";
import { ducks } from "../../data";

import { myContext } from "./ContextProvider";

function P({ children, style, color }) {
	const { activeDuck } = myContext();
	const propColor = color === "primary" ? ducks[activeDuck].primaryClr : color === "secondary" ? ducks[activeDuck].secondaryClr : color === "third" ? ducks[activeDuck].thirdClr : null;

	return (
		<p
			className={`transition-colors duration-500 ease-in-out ${style} text-xs sm:text-sm `}
			style={{
				color: color ? propColor : ducks[activeDuck].secondaryClr,
			}}>
			{children}
		</p>
	);
}

export default P;
