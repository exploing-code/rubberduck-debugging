import React, { useRef } from "react";
import { gsap } from "gsap";

export default function AudioVisualizer() {
	const audioRef = useRef(null);
	const duckSoundEffectRef = useRef(null);
	const duckSoundEffect2Ref = useRef(null);
	const squareRef = document.querySelector(".square");


	// set up audio contexts
	const micCtx = new AudioContext();
	const duckCtx = new AudioContext();
	const duck2Ctx = new AudioContext();

	//set up the different audio nodes that will be used
	const sourceNode = micCtx.createMediaElementSource(audioEl);
	const analyzerNode = micCtx.createAnalyser();
	// connect the nodes together in a chain to the context destination
	sourceNode.connect(analyzerNode);
	analyzerNode.connect(micCtx.destination);
	analyzerNode.fftSize = 256;

	// Audio nodes for Duck noise 1
	const duckSourceNode = duckCtx.createMediaElementSource(duckSoundEl);
	const duckGainNode = duckCtx.createGain();
	duckGainNode.gain.value = 0.3;
	duckSourceNode.connect(duckGainNode);
	duckGainNode.connect(duckCtx.destination);
  
	// Audio nodes for Duck noise 2
	const duck2SourceNode = duck2Ctx.createMediaElementSource(duckSoundEl2);
	const duck2GainNode = duck2Ctx.createGain();
	duck2GainNode.gain.value = 0.2;
	duck2SourceNode.connect(duck2GainNode);
	duck2GainNode.connect(duck2Ctx.destination);



	return (
		<section id="s6" className=" relative bg-white h-screen flex justify-center items-center">

			<div className="buttons absolute top-0 *:p-2 flex gap-4 *:bg-yellow-200">
				<button>play</button>
				<button>pause</button>
			</div>
      
			<h1 className="text-[30vw] leading-[25vw] opacity-1 scale-0 ">
				QUACK
				<br />
				QUACK
			</h1>
      
			<audio ref={audioRef} src="../sound-effects/Dizzee Rascal Bassline Junkie.mp3"></audio>
			<audio ref={duckSoundEffectRef}  src="../sound-effects/duckQuack.mp3"></audio>
			<audio ref={duckSoundEffect2Ref}  src="../sound-effects/duckQuack.mp3"></audio>

			<div ref={squareRef} className="absolute bottom-0 bg-[#1C53D8] w-screen "></div>
		</section>
	);
}

