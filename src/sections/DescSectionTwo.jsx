import React, { useRef } from "react";
import emphasis from "../assets/emphasis.svg";
import SpeechBubble from "../components/SpeeachBubble.jsx";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

function DescSectionTwo() {
	const refS2 = useRef();
	const sectionRef = useRef();
	const bubbleRef = useRef();

	// // Opacity animation for wrapper
	// gsap.fromTo(
	// 	sectionRef.current,
	// 	{ opacity: 0 },
	// 	{
	// 		scrollTrigger: {
	// 			trigger: refS2.current,
	// 			start: "center center",
	// 			end: "bottom bottom",
	// 			pin: true,
	// 			toggleActions: "play reverse play reverse",
	// 		},
	// 		opacity: 1,
	// 		duration: 0.8,
	// 	}
	// );
	// // Scale animation for emphasis image
	// gsap.fromTo(
	// 	".emphasis",
	// 	{ scale: 0.8 },
	// 	{
	// 		scrollTrigger: {
	// 			trigger: refS2.current,
	// 			start: "center center",
	// 			end: "bottom bottom",
	// 		},
	// 		scale: 1.1,
	// 		repeat: -1,
	// 		ease: "power1.inOut",
	// 		yoyo: true,
	// 	}
	// );

	return (
		<section ref={refS2} id="s4">
			<div ref={sectionRef} className="h-[100lvh] flex items-center justify-around">
				<div>
					<img src={emphasis} />
				</div>

				<div ref={bubbleRef} className={"relative flex items-center  w-96"}>
					<SpeechBubble
						direction="right"
						textReveal1="So now that you have chosen a duck it's time to try your debugging luck!"
						textReveal2="Let's go through your code and make sure that it doesn't suck!"
						sectionRef={refS2}
					/>
				</div>
			</div>
		</section>
	);
}

export default DescSectionTwo;
