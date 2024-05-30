import React from "react";
import { myContext } from "../components/ContextProvider.jsx";
import { ducks } from "../../data.js";

// Icons
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";

function CharSelectButton({ version }) {
	const { activeDuck, setPressedButton } = myContext();

	const Icon = version === "right" ? IoIosArrowDroprightCircle : IoIosArrowDropleftCircle;

	return (
		<button className="p-4" onClick={() => setPressedButton(version)}>
			<Icon
				className="text-[15vw] md:text-[5rem] lg:text-[3rem] ease-in-out hover:scale-105 active:scale-100 transition-all duration-200 "
				style={{
					fill: ducks[activeDuck].secondaryClr,
				}}
			/>
		</button>
	);
}

export default CharSelectButton;
