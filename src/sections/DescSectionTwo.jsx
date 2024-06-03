import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TextPlugin } from "gsap/TextPlugin";

import P from "../components/P";
import emphasis from "../assets/emphasis.svg";
import SpeechBubbleSVG from "../components/SpeeachBubbleSVG.jsx";

gsap.registerPlugin(TextPlugin);

function DescSectionTwo() {
	const refS2 = useRef();
	const sectionRef = useRef();
	const bubbleRef = useRef();

	// useGSAP(() => {
	// 	// Opacity animation for wrapper
	// 	// gsap.fromTo(
	// 	// 	sectionRef.current,
	// 	// 	{ opacity: 0 },
	// 	// 	{
	// 	// 		scrollTrigger: {
	// 	// 			trigger: refS2.current,
	// 	// 			start: "center center",
	// 	// 			end: "bottom bottom",
	// 	// 			pin: true,
	// 	// 			toggleActions: "play reverse play reverse",
	// 	// 		},
	// 	// 		opacity: 1,
	// 	// 		duration: 0.8,
	// 	// 	}
	// 	// );
	// 	// Scale animation for emphasis image
	// 	// gsap.fromTo(
	// 	// 	".emphasis",
	// 	// 	{ scale: 0.8 },
	// 	// 	{
	// 	// 		scrollTrigger: {
	// 	// 			trigger: refS2.current,
	// 	// 			start: "center center",
	// 	// 			end: "bottom bottom",
	// 	// 		},
	// 	// 		scale: 1.1,
	// 	// 		repeat: -1,
	// 	// 		ease: "power1.inOut",
	// 	// 		yoyo: true,
	// 	// 	}
	// 	// );
	// 	// Animation for speech bubble and text
	// 	// gsap.fromTo(
	// 	// 	bubbleRef.current,
	// 	// 	{ y: -5 },
	// 	// 	{
	// 	// 		scrollTrigger: {
	// 	// 			trigger: refS2.current,
	// 	// 			start: "center center",
	// 	// 			end: "bottom bottom",
	// 	// 		},
	// 	// 		y: 5,
	// 	// 		duration: 1,
	// 	// 		repeat: -1,
	// 	// 		ease: "power1.inOut",
	// 	// 		yoyo: true,
	// 	// 	}
	// 	// );
	// 	const bubbleTl = gsap.timeline({
	// 		scrollTrigger: {
	// 			trigger: refS2.current,
	// 			start: "center center",
	// 			end: "bottom bottom",
	// 			markers: true,
	// 		},
	// 	});
	// 	bubbleTl
	// 		.to(".revealSectionTwo1", {
	// 			duration: 2,
	// 			text: "So now that you have chosen a duck it's time to try your debugging luck!",
	// 		})
	// 		.to(".revealSectionTwo2", {
	// 			duration: 2,
	// 			text: "Let's go through your code and make sure that it doesn't suck!",
	// 		});
	// });

	// const colour = "${ducks[activeDuck].PrimaryClr}"

	return (
		<section ref={refS2} id="s4">
			<div ref={sectionRef} className="h-[100lvh]">
				<div>
					<img src={emphasis} />
				</div>

				<div ref={bubbleRef} className={"relative flex items-center justify-center bg-blue-300 w-96 h-96"}>
					<SpeechBubbleSVG
						direction="right"
						textReveal1="So now that you have chosen a duck it's time to try your debugging luck!"
						textReveal2={"Let's go through your code and make sure that it doesn't suck!"}
						sectionRef={refS2}
					/>
					<div className=" absolute">
						<P style={`mb-3 left-2 `}>
							<span className={`revealSectionTwo1`}></span>
						</P>
						<P>
							<span className={`revealSectionTwo2`}></span>
						</P>
					</div>
				</div>
			</div>
		</section>
	);
}

export default DescSectionTwo;
