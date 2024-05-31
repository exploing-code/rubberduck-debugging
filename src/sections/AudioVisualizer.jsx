import React, { useEffect, useRef, useState } from "react";
import P from "../components/P";
import AudioVisualizerWave from "../components/AudioVizualizerWave";
import { myContext } from "../components/ContextProvider";
import Button from "../components/Button";

export default function AudioVisualizer() {
	const songRef = useRef(null);
	const buttonsRef = useRef(null);
	const { setPartyOn, setRenderS2Loading } = myContext();

	function handleClickNo() {
		setPartyOn(true);
		songRef.current.currentTime = 32.9;
		songRef.current.play();
	}
	function handleClickYes() {
		setRenderS2Loading(true);
	}

	return (
		<section className=" w-screen relative flex items-center justify-center z-10">
			<div ref={buttonsRef} className="flex gap-6 absolute top-0 ">
				<Button onClick={handleClickNo} text="no" />
				<Button onClick={handleClickYes} text="yes" />
			</div>

			<audio ref={songRef} src="../sound-effects/Wobbly-duck.mp3"></audio>
			<AudioVisualizerWave />
		</section>
	);
}
