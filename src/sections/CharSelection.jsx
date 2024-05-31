import React, { useRef } from "react";
import P from "../components/P";

import { ducks } from "../../data";

// components
import CharSelectButton from "../components/CharSelectButton";
import { myContext } from "../components/ContextProvider.jsx";

function CharSelection() {
	const { activeDuck } = myContext();
	const sectionRef = useRef(null);

	return (
		<section id="s2" ref={sectionRef} className=" flex flex-col justify-between text-center md:justify-end  z-10 py-6 h-screen">
			<div className=" flex flex-col md:flex-col-reverse ">
				<div className=" flex items-center justify-center">
					<span className=" hidden md:block">
						<CharSelectButton version="left" />
					</span>
					<P>So if you are stuck, Choose a duck!</P>
					<span className=" hidden md:block">
						<CharSelectButton version="right" />
					</span>
				</div>
				<h2
					className=" uppercase text-[15vw] md:text-[10vw] leading-[9vw] m-4"
					style={{
						color: ducks[activeDuck].secondaryClr,
					}}>
					{ducks[activeDuck].name}
				</h2>
			</div>
			<div className=" flex items-center justify-around  leading-[4vw] md:*:hidden ">
				<CharSelectButton version="left" sectionRef={sectionRef}  />
				<CharSelectButton version="right" sectionRef={sectionRef}  />
			</div>
		</section>
	);
}

export default CharSelection;
