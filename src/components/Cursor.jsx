import React, { useState, useEffect, useRef } from "react";
import { ducks } from "../../data";
import { myContext } from "./ContextProvider.jsx";

function Cursor() {
	const { hover, activeDuck, activeSectionNumb, setActiveSectionNumb, partyOn } = myContext();
	const [mouseCoord, setMouseCoord] = useState({ x: -100, y: -500 });
	const [isCursorPointingUp, setIsCursorPointingUp] = useState(false);

	const iconRef = useRef(null);
	const iconWidth = iconRef.current?.offsetWidth;
	const iconHeight = iconRef.current?.offsetHeight;

	useEffect(() => {
		const updateMouseCoordinates = (e) => {
			setMouseCoord({ x: e.clientX, y: e.clientY });
		};

		window.addEventListener("mousemove", updateMouseCoordinates);
		return () => {
			window.removeEventListener("mousemove", updateMouseCoordinates);
		};
	}, []);

	useEffect(() => {
		const halfWindowHeight = window.innerHeight / 2;

		if (activeSectionNumb === 1) {
			setIsCursorPointingUp(false);
		} else if (activeSectionNumb === 5) {
			setIsCursorPointingUp(true);
		} else {
			setIsCursorPointingUp(mouseCoord.y < halfWindowHeight ? true : false);
		}

		const handleClick = () => {
			if (isCursorPointingUp) {
				setActiveSectionNumb((prevNumber) => prevNumber - 1);
			} else {
				setActiveSectionNumb((prevNumber) => prevNumber + 1);
			}
		};

		if (hover === false) {
			window.addEventListener("click", handleClick);
			return () => {
				window.removeEventListener("click", handleClick);
			};
		}
	}, [mouseCoord.y]);

	useEffect(() => {
		const section = document.getElementById("s" + activeSectionNumb);
		if (section) {
			section.scrollIntoView({ behavior: "smooth" });
		}
	}, [activeSectionNumb]);

	return (
		<div
			ref={iconRef}
			className={`fixed z-[500] pointer-events-none  flex items-center justify-center *:transition-colors *:duration-200 w-20 h-24 `}
			style={{
				top: `${mouseCoord.y - iconHeight / 2}px`,
				left: `${mouseCoord.x - iconWidth / 2}px`,
				color: ducks[activeDuck].secondaryClr,
				transform: isCursorPointingUp ? "scaleY(-1)" : "scaleY(1)",
			}}>
			{hover || partyOn || activeSectionNumb === 6 ? (
				<div
					style={{
						backgroundColor: ducks[activeDuck].secondaryClr,
						border: `solid 4px ${ducks[activeDuck].primaryClr}`,
					}}
					className=" w-6 h-6 rounded-full"
				/>
			) : (
				<svg width="73" height="84" viewBox="0 0 73 84" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M51.5784 40.2576V5.77016C51.5784 5.77016 45.5191 3.00023 35.9974 3C26.4757 2.99977 20.4164 5.77016 20.4164 5.77016V40.2576H11.0576C4.0908 40.2576 0.419875 47.841 5.08644 52.5928L30.5289 78.5C33.7225 81.752 39.2775 81.752 42.4711 78.5L67.9136 52.5928C72.5801 47.841 68.9092 40.2576 61.9424 40.2576H51.5784Z"
						fill={ducks[activeDuck].secondaryClr}
						stroke={ducks[activeDuck].primaryClr}
						strokeWidth="6"
					/>
				</svg>
			)}
		</div>
	);
}

export default Cursor;
