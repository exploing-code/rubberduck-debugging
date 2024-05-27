import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ducks } from "../../data";
import { myContext } from "../components/ContextProvider";

// The music and the play/pause buttons is temporary until i learn how to get the live mic input, its implemented so that
// you can test the visualizer and see how it works. If you check the consol you can se that the codes checks when it should run the animation.

export default function App() {
	const { activeDuck } = myContext();
	// DOM
	const [isDuckTalking, setIsDuckTalking] = useState(false);
	const duckSoundRef = useRef(null);
	const duckSoundRef2 = useRef(null);
	const visualizerRef = useRef(null);
	const titleRef = useRef(null);

	// For AudioContexts
	const [micCtx, setMicCtx] = useState(null);
	const [duckCtx, setDuckCtx] = useState(null);
	const [duck2Ctx, setDuck2Ctx] = useState(null);

	// Nodes
	const micSourceNodeRef = useRef(null);
	const analyzerNodeRef = useRef(null);
	const duckSourceNodeRef = useRef(null);
	const duckGainNodeRef = useRef(null);
	const duck2SourceNodeRef = useRef(null);
	const duck2GainNodeRef = useRef(null);

	//

	// Initialize AudioContexts only once
	useEffect(() => {
		if (!micCtx) {
			navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
				const context = new AudioContext();
				const sourceNode = context.createMediaStreamSource(stream);
				const analyzerNode = context.createAnalyser();
				analyzerNode.fftSize = 256;
				sourceNode.connect(analyzerNode);

				setMicCtx(context);
				micSourceNodeRef.current = sourceNode;
				analyzerNodeRef.current = analyzerNode;
			});
		}
		if (!duckCtx) {
			const context = new (window.AudioContext || window.webkitAudioContext)();
			setDuckCtx(context);
		}
		if (!duck2Ctx) {
			const context = new (window.AudioContext || window.webkitAudioContext)();
			setDuck2Ctx(context);
		}
	}, []);

	// Set up and connect the nodes only once when the audio context is loaded

	useEffect(() => {
		if (duckCtx && !duckSourceNodeRef.current && duckSoundRef.current) {
			const duckSoundEl = duckSoundRef.current;
			const duckSourceNode = duckCtx.createMediaElementSource(duckSoundEl);
			const duckGainNode = duckCtx.createGain();
			duckGainNode.gain.value = 0.3;
			duckSourceNode.connect(duckGainNode);
			duckGainNode.connect(duckCtx.destination);

			duckSourceNodeRef.current = duckSourceNode;
			duckGainNodeRef.current = duckGainNode;
		}
	}, [duckCtx]);

	useEffect(() => {
		if (duck2Ctx && !duck2SourceNodeRef.current && duckSoundRef2.current) {
			const duck2SourceNode = duck2Ctx.createMediaElementSource(duckSoundRef2.current);
			const duck2GainNode = duck2Ctx.createGain();
			duck2GainNode.gain.value = 0.2;
			duck2SourceNode.connect(duck2GainNode);
			duck2GainNode.connect(duck2Ctx.destination);

			duck2SourceNodeRef.current = duck2SourceNode;
			duck2GainNodeRef.current = duck2GainNode;
		}
	}, [duck2Ctx]);

	function runDuckSoundEffect() {
		if (Math.random() > 0.5) {
			duckSoundRef.current.play();
		} else {
			duckSoundRef.current.play();
			setTimeout(() => {
				duckSoundRef2.current.play();
			}, 250);
		}
	}

	function runAnimation() {
		runDuckSoundEffect();
		var tl = gsap.timeline();
		tl.to(titleRef.current, { opacity: 1, scale: 1, duration: 0.2 });
		tl.to(titleRef.current, { opacity: 0, delay: 0.5, duration: 0.5 });
		tl.to(titleRef.current, { opacity: 0, scale: 0.1 });
	}

	// Set animation frame with flags to check if the Text and sound effect should run
	useEffect(() => {
		const volumeThreshold = 20;
		let volumeBelowThresholdStartTime = null;
		let isVolumeBelowThreshold = false;
		let animationRan = false;
		const awaitResponseTime = 500;

		function update() {
			if (analyzerNodeRef.current) {
				const data = new Uint8Array(analyzerNodeRef.current.fftSize);
				analyzerNodeRef.current.getByteFrequencyData(data);

				// Calculate volume percent
				let sum = 0;
				for (let i = 0; i < data.length; i++) {
					sum += data[i] * data[i];
				}
				const volumePercent = Math.sqrt(sum / data.length) + 10 ;
				if (visualizerRef.current) {
					visualizerRef.current.style.height = `${volumePercent}vh`;
				}

				// conditionally rendering animation
				if (volumePercent < volumeThreshold && isDuckTalking) {
					if (!isVolumeBelowThreshold) {
						isVolumeBelowThreshold = true;
						volumeBelowThresholdStartTime = Date.now();
						console.log("Volume low — wait until allowed to run");
					} else {
						const currentTime = Date.now();
						const timePassed = currentTime - volumeBelowThresholdStartTime;
						if (timePassed >= awaitResponseTime && !animationRan) {
							console.log("ANIMATE");
							runAnimation();
							animationRan = true;
						}
					}
				} else {
					isVolumeBelowThreshold = false;
					volumeBelowThresholdStartTime = null;
					animationRan = false;
				}
			}
			window.requestAnimationFrame(update);
		}
		update();
	}, []);

	function handleOnClick(){
		setIsDuckTalking((prev) => !prev)
		console.log(isDuckTalking)
	}

	return (
		<section className=" relative flex items-center justify-center">
			<audio ref={duckSoundRef} src="../sound-effects/duckQuack.mp3"></audio>
			<audio ref={duckSoundRef2} src="../sound-effects/duckQuack.mp3"></audio>

			<div className=" absolute *:bg-black *:text-yellow-200 font-modak *:uppercase *:px-4 *:rounded-[1rem] text-7xl *:m-4 *:pt-2 top-0 z-20">
				<button onClick={handleOnClick}>{isDuckTalking ? "deactivate quack quack": "Activate duck response"}</button>
			</div>

			<div ref={visualizerRef} className=" absolute bottom-0 w-full bg-yellow-200 transition-all duration-[0.01s]"></div>
			<h1 ref={titleRef} style={{ color: ducks[activeDuck].secondaryClr }} className=" opacity-0 text-[30vw] leading-[25vw] z-50 pointer-events-none scale-0">
				QUACK
				<br />
				QUACK
			</h1>
		</section>
	);
}
