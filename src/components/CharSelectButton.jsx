import React, { useEffect, useState } from "react";
import { myContext } from "../components/ContextProvider.jsx";
import { ducks } from "../../data.js";

// Icons
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";

export default function CharSelectButton({ version, sectionRef }) {
	const { activeDuck, setPressedButton, setIsAudioCtxActivated, isAudioCtxActivated, setIsCharSelected, isCharSelected } = myContext();

	const Icon = version === "right" ? IoIosArrowDroprightCircle : IoIosArrowDropleftCircle;

	// Eventlistener that stops the scrolling when the section reaches the top, and allows
	// scrolling as soon as the user has pressed the button at least once, this is because
	// the audio context needs to be allowed through a user pressing a button. And this way
	// we force the use to press a button atb least once!
	useEffect(() => {
		function handleScroll() {
			if (sectionRef) {
				let yValue = sectionRef.current.getBoundingClientRect().y;
				if (yValue === 0 && !isCharSelected) {
					document.body.style.overflow = "hidden";
				}
			}
		}

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [sectionRef, isCharSelected]);

	function handleOnClick() {
		setPressedButton(version);
		if (!isCharSelected) {
			setIsCharSelected(true);
			document.body.style.overflow = "auto";
		}
		if (!isAudioCtxActivated) {
			setIsAudioCtxActivated(true);
		}
	}

	return (
		<button className="p-4" onClick={handleOnClick}>
			<Icon
				className="text-[15vw] md:text-[5rem] lg:text-[3rem] ease-in-out hover:scale-105 active:scale-100 transition-all duration-200"
				style={{
					fill: ducks[activeDuck].secondaryClr,
				}}
			/>
		</button>
	);
}
