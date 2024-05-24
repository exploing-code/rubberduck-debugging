import React, { useRef } from "react";
import { gsap } from "gsap";

export default function AudioVisualizer() {
	const audioRef = useRef(null);
	const duckSoundEffectRef = useRef(null);
	const duckSoundEffect2Ref = useRef(null);
	const squareRef = document.querySelector(".square");

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

