import React, { useEffect, useRef, useState } from "react";
import P from "../components/P";
import AudioVisualizerWave from "../components/Vizualizer";
import { myContext } from "../components/ContextProvider";
import Button from "../components/Button";

export default function AudioVisualizer() {
	const songRef = useRef(null);
	const buttonsRef = useRef(null);
	const sectionRef = useRef(null);
	const { setPartyOn, setRenderS2Loading } = myContext();

	useEffect(() => {
		function handleScroll() {
			if (sectionRef) {
				let yValue = sectionRef.current.getBoundingClientRect().y;
				if (yValue === 0) {
					document.body.style.overflow = "hidden";
				}
			}
		}

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [sectionRef]);

	function handleClickNo() {
		setPartyOn(true);
		songRef.current.currentTime = 32.9;
		songRef.current.play();
	}
	function handleClickYes() {
		setRenderS2Loading(true);
		document.body.style.overflow = "auto";
	}

	return (
		<section ref={sectionRef} className=" w-screen relative flex items-center justify-center h-screen">
			<div ref={buttonsRef} className="flex gap-6 absolute top-0 z-10">
				<Button onClick={handleClickNo} text="no" />
				<Button onClick={handleClickYes} text="yes" />
			</div>

			<audio ref={songRef} src="../sound-effects/Wobbly-duck.mp3"></audio>
			<AudioVisualizerWave />
		</section>
	);
}
