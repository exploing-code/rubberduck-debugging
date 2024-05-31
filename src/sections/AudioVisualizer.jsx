import React, { useEffect, useRef, useState } from "react";
import P from "../components/P";
import AudioVisualizerWave from "../components/Vizualizer";
import { myContext } from "../components/ContextProvider";
import Button from "../components/Button";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ducks } from "../../data";

export default function AudioVisualizer() {
	const songRef = useRef(null);
	const textRef = useRef(null);
	const buttonsRef = useRef(null);
	const sectionRef = useRef(null);
	const { setPartyOn, setRenderS2Loading, activeDuck } = myContext();

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

	useGSAP(
		() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top center",
					end: "bottom center",
				},
			});
			tl.to(textRef.current, {
				delay: 7,
				duration: 2,
				text: `Are you still stuck because ${ducks[activeDuck].name} is giving you no luck?`,
			});
			tl.to(buttonsRef.current.children, {
				translateY: 0,
				ease: "back.out",
				stagger: 0.1,
				duration: 0.2,
			});
		},
		{ scope: sectionRef }
	);

	return (
		<section ref={sectionRef} className=" w-screen relative flex items-center justify-center h-screen">
			<div className=" h-96 w-full absolute top-4 left-6 z-10 ">
				<P style={" w-96 mb-6"}>
					<span ref={textRef}></span>
				</P>
				<div ref={buttonsRef} className="flex gap-6 *:-translate-y-[100%] overflow-hidden">
					<Button onClick={handleClickNo} text="no" />
					<Button onClick={handleClickYes} text="yes" />
				</div>
			</div>

			<audio ref={songRef} src="../sound-effects/Wobbly-duck.mp3"></audio>
			<AudioVisualizerWave />
		</section>
	);
}
