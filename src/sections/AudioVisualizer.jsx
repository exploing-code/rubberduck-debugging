import React, { useRef } from "react";
import P from "../components/P";
import AudioVisualizerWave from "../components/AudioVizualizerWave";
import { myContext } from "../components/ContextProvider";

export default function AudioVisualizer() {
	const songRef = useRef(null);

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
			<div className="flex gap-6 absolute top-0 ">
				<button onClick={handleClickNo} className="bg-yellow-400 py-4 px-6 rounded-md transition-all duration-200 hover:scale-110 hover:bg-yellow-200">
					NO
				</button>
				<button onClick={handleClickYes} className="bg-yellow-400 py-4 px-6 rounded-md transition-all duration-200 hover:scale-110 hover:bg-yellow-200">
					YES
				</button>
			</div>

			<audio ref={songRef} src="../sound-effects/Wobbly-duck.mp3"></audio>
			<AudioVisualizerWave />
		</section>
	);
}
