import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ducks } from "../../data";
import { myContext } from "../components/ContextProvider";

// navigator.mediaDevices       <— a read only property that returns a built in object,
//                                 which provides access to connected media inputs such
//                                 as camera, microphone and screen sharing
//
// getUserMedia()               <— returns a promise that resolves in a media stream object
//                                 which contains microphone audio data
//
// cerateMediaStreamSource()    <— takes in raw media stream, in this case raw audio coming
//                                 from microphone and it converts it into audio nodes.

// todo - fix quack sound effect, change conditions of when it should render and refractor

export default function App() {
	const { activeDuck } = myContext();
	// DOM
	const [isDuckSoundOn, setIsDuckSoundOn] = useState(true);
	const duckSoundRef = useRef(null);
	const duckSoundRef2 = useRef(null);
	const visualizerRef = useRef(null);
	const titleRef = useRef(null);

	// For AudioContexts
	const [micCtx, setMicCtx] = useState(null);
	const [duckCtx, setDuckCtx] = useState(null);
	const [duck2Ctx, setDuck2Ctx] = useState(null);

	// Nodes
	const analyzerNodeRef = useRef(null);
	const duckSourceNodeRef = useRef(null);
	const duck2SourceNodeRef = useRef(null);

	// Initialize AudioContexts only once on mount
	useEffect(() => {
		if (!micCtx) {
			navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
				const ctx = new AudioContext();

				const sourceNode = ctx.createMediaStreamSource(stream);
				const analyzerNode = ctx.createAnalyser();
				analyzerNode.fftSize = 256;
				sourceNode.connect(analyzerNode);
				
				setMicCtx(ctx);
				// the analyzer makes the sound readable for the computer and is later used in the update function
				analyzerNodeRef.current = analyzerNode;
			});
		}
		if (!duckCtx) {
			const ctx = new AudioContext();
			setDuckCtx(ctx);
		}
		if (!duck2Ctx) {
			const ctx = new AudioContext();
			setDuck2Ctx(ctx);
		}
	}, []);

	// Set up and connect the nodes only once when the audio context is loaded
	useEffect(() => {
		if (duckCtx && !duckSourceNodeRef.current && duckSoundRef.current) {
			const duckSourceNode = duckCtx.createMediaElementSource(duckSoundRef.current);
			const duckGainNode = duckCtx.createGain();
			duckGainNode.gain.value = 0.3;

			duckSourceNode.connect(duckGainNode);
			duckGainNode.connect(duckCtx.destination);

			duckSourceNodeRef.current = duckSourceNode;
		}

		if (duck2Ctx && !duck2SourceNodeRef.current && duckSoundRef2.current) {
			const duck2SourceNode = duck2Ctx.createMediaElementSource(duckSoundRef2.current);
			const duck2GainNode = duck2Ctx.createGain();
			duck2GainNode.gain.value = 0.2;

			duck2SourceNode.connect(duck2GainNode);
			duck2GainNode.connect(duck2Ctx.destination);

			duck2SourceNodeRef.current = duck2SourceNode;
		}
	}, [duckCtx, duck2Ctx]);


	// Set animation frame with flags to check if the Text and sound effect should run
	useEffect(() => {
		const volumeThreshold = 30;
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
				const volumePercent = Math.sqrt(sum / data.length);
				if (visualizerRef.current) {
					visualizerRef.current.style.height = `${volumePercent}vh`;
				}

				// conditionally rendering animation
				if (volumePercent < volumeThreshold) {
					if (!isVolumeBelowThreshold) {
						isVolumeBelowThreshold = true;
						volumeBelowThresholdStartTime = Date.now();
						// console.log("Q?")
					} else {
						const currentTime = Date.now();
						const timePassed = currentTime - volumeBelowThresholdStartTime;
						if (timePassed >= awaitResponseTime && !animationRan) {
							// console.log("QUACK")
							// runAnimation();
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

	// Randomize 1 or 2 quacks
	function runDuckSoundEffect() {
		if (duckSoundRef.current && duckSoundRef2.current) {
			if (Math.random() > 0.5) {
				duckSoundRef.current.play();
			} else {
				duckSoundRef.current.play();
				setTimeout(() => {
					duckSoundRef2.current.play();
				}, 250);
			}
		}
	}

	// render animation with sound effect
	function runAnimation() {
		if (titleRef.current) {
			runDuckSoundEffect();
			var tl = gsap.timeline();
			tl.to(titleRef.current, { opacity: 1, scale: 1, duration: 0.2 });
			tl.to(titleRef.current, { opacity: 0, delay: 0.5, duration: 0.5 });
			tl.to(titleRef.current, { opacity: 0, scale: 0.1 });
		}
	}

	function handleOnClick() {
		setIsDuckSoundOn((prev) => !prev);
	}

	return (
		<section className=" relative flex items-center justify-center">
			<audio ref={duckSoundRef} src="../sound-effects/duckQuack.mp3"></audio>
			<audio ref={duckSoundRef2} src="../sound-effects/duckQuack.mp3"></audio>

			<div className=" absolute *:bg-black *:text-yellow-200 font-modak *:uppercase *:px-4 *:rounded-[1rem] text-7xl *:m-4 *:pt-2 top-0 z-20">
				<button onClick={handleOnClick}>{isDuckSoundOn ? "deactivate quack quack" : "Activate duck response"}</button>
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
