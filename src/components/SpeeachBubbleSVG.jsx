import React, { useContext } from "react";
import { ducks } from "../../data";
import { Context } from "./ContextProvider";
import P from "./P";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function SpeechBubbleSVG({ direction, textReveal1, textReveal2, sectionRef }) {
	const { activeDuck } = useContext(Context);
	const isLeft = direction === "left";
	const fillColor = ducks[activeDuck].thirdClr;

	useGSAP(() => {
		// Opacity animation for wrapper
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
		// Scale animation for emphasis image
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
		// Animation for speech bubble and text
		// gsap.fromTo(
		// 	bubbleRef.current,
		// 	{ y: -5 },
		// 	{
		// 		scrollTrigger: {
		// 			trigger: refS2.current,
		// 			start: "center center",
		// 			end: "bottom bottom",
		// 		},
		// 		y: 5,
		// 		duration: 1,
		// 		repeat: -1,
		// 		ease: "power1.inOut",
		// 		yoyo: true,
		// 	}
		// );
		const bubbleTl = gsap.timeline({
			scrollTrigger: {
				trigger: sectionRef.current,
				start: "center center",
				end: "bottom bottom",
				markers: true,
			},
		});
		bubbleTl
			.to(".revealSectionTwo1", {
				duration: 2,
				text: textReveal1,
			})
			.to(".revealSectionTwo2", {
				duration: 2,
				text: textReveal2,
			});
	});

	return (
		<div className="relative flex items-center  bg-blue-300 ">
			<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="-370 50 2000 1073" fill={fillColor} className={isLeft ? "" : "transform scale-x-[-1] "}>
				<path
					className="cls-1"
					d="M547.89,580.04c1.92,285.82,240.81,529.95,526.64,529.95,29.05.03,493.9-.03,505.08,0,4.86-83.11-47.15-169.41-131.62-192.87-51.82-13.72-76.2-13.47-124.84-4.63-20.63,4.42-23.58-17.69-10.32-22.11,4.44-1.47,10.29-3.08,17.69-4.42,64.85-11.79,129.7,5.9,129.7,5.9,82.27-91.85,134.86-182.34,134.12-315.41-27.84-696.15-1023.31-692.88-1046.45,3.6ZM1222.07,134.9c2.11-6.18,8.8-9.48,14.96-7.38,1.67.57,41.3,14.25,92.41,50.78,46.99,33.56,112.97,93.68,160.51,189.51,2.89,5.82.5,12.9-5.34,15.8-1.68.83-3.46,1.22-5.22,1.22-4.35,0-8.52-2.4-10.58-6.56-45.16-91.07-107.76-148.29-152.31-180.24-24.22-17.38-45.88-29.39-61.55-37.07-15.67-7.69-25.32-11.04-25.51-11.11-6.16-2.09-9.46-8.78-7.37-14.95Z"
				/>
			</svg>
			<div className="absolute w-[45%] bg-blue-500 ml-10">
				<P className="mb-3 left-2">
					<span className="revealSectionTwo1"></span>
				</P>
				<P>
					<span className="revealSectionTwo2"></span>
				</P>
			</div>
		</div>
	);
}
