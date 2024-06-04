import React, { useEffect, useRef, useState } from "react";
import P from "../components/P";
import Visualizer from "../components/Vizualizer";
import { myContext } from "../components/ContextProvider";
import Button from "../components/Button";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ducks } from "../../data";
import LoadingScreenToSection from "../components/LoadingScreenToSection";

export default function AudioVisualizer() {
	const { setPartyOn, setActiveSectionNumb } = myContext();
	const [renderLoadingYES, setRenderLoadingYES] = useState(false);
	const [renderLoadingNO, setRenderLoadingNO] = useState(false);

	// DOM
	const songRef = useRef(null);
	const textRef = useRef(null);
	const buttonTitleWrapperRef = useRef(null);
	const buttonsRef = useRef(null);
	const sectionRef = useRef(null);

	// Text and buttons enter
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
				text: `Are you still stuck?`,
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

	function handleClickNo() {
		setPartyOn(true);
		songRef.current.play().catch((err) => {
			console.error("Error playing song:", err);
		});

		gsap.to(buttonTitleWrapperRef.current, {
			opacity: 0,
		});

		let continueInterval = true;
		setInterval(() => {
			if (songRef.current.paused && continueInterval) {
				setRenderLoadingNO(true);
				setTimeout(() => {
					setPartyOn(false);
					setActiveSectionNumb(1);
				}, 1500);
				continueInterval = false;
			}
		}, 1000);
	}
	
	function handleClickYes() {
		setRenderLoadingYES(true);
		setTimeout(() => {
			setActiveSectionNumb(2);
		}, 1500);
	}

	return (
		<section ref={sectionRef} id="s6" className=" w-screen relative flex items-center justify-center h-screen">
			<div ref={buttonTitleWrapperRef} className={` absolute top-4 right-6 z-[500]`}>
				<P style={"mb-2 ml-4"}>
					<span ref={textRef}></span>
				</P>
				<div ref={buttonsRef} className="flex gap-4 *:-translate-y-[100%] overflow-hidden">
					<Button onClick={handleClickNo} text="no" />
					<Button onClick={handleClickYes} text="yes" />
				</div>
			</div>
			<audio id="myAudio" ref={songRef} src="../sound-effects/Wobbly-duck.mp3"></audio>
			<Visualizer />
			{renderLoadingYES ? <LoadingScreenToSection sectionId="s2" text="Try another duck!" /> : null}
			{renderLoadingNO ? <LoadingScreenToSection sectionId="s1" text="Party's over" /> : null}
		</section>
	);
}
