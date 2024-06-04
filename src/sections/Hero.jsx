import React, { useRef, useEffect } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { TextPlugin } from "gsap/TextPlugin";
gsap.registerPlugin(TextPlugin);

import { ducks } from "../../data";
import { myContext } from "../components/ContextProvider.jsx";
import P from "../components/P.jsx";

function Title({ text, size, zIndex }) {
	const { activeDuck } = myContext();
	const maxIndex = zIndex + text.length;
	return (
		<h1
			style={{
				color: ducks[activeDuck].secondaryClr,
				textShadow: `
          -0.1vw -0.1vw 0 ${ducks[activeDuck].primaryClr},
          0.1vw -0.1vw 0 ${ducks[activeDuck].primaryClr},
          -0.1vw 0.1vw 0 ${ducks[activeDuck].primaryClr},
          0.1vw 0.1vw 0 ${ducks[activeDuck].primaryClr},
          -0.4vw -0.4vw 0 ${ducks[activeDuck].primaryClr},
          0.4vw -0.4vw 0 ${ducks[activeDuck].primaryClr},
          -0.4vw 0.4vw 0 ${ducks[activeDuck].primaryClr},
          0.5vw 0.5vw 0 ${ducks[activeDuck].primaryClr},
          -0.5vw -0.5vw 0 ${ducks[activeDuck].primaryClr},
          0.5vw -0.5vw 0 ${ducks[activeDuck].primaryClr},
          -0.5vw 0.5vw 0 ${ducks[activeDuck].primaryClr},
          0.5vw 0.5vw 0 ${ducks[activeDuck].primaryClr}`,
			}}
			className={`text-[${size}vw] text-current `}>
			{text.split("").map((char, index) => (
				<span key={index} style={{ zIndex: maxIndex - index, position: "relative" }}>
					{char}
				</span>
			))}
		</h1>
	);
}

export default function Hero() {
	const ref = useRef();


	useGSAP(
		() => {
			gsap.to(".cursor", {
				opacity: 0,
				repeat: -1,
				yoyo: true,
			});
			gsap.to(".revealHero", {
				duration: 4,
				delay: 0,
				text: "Rubber duck debugging (or rubberducking) is a method of debugging code by articulating a problem in spoken or written in natural language, preferebly to someone who does not understand code (a.k.a talk to a rubber duck).",
			});
		},
		{ scope: ref }
	);

	return (
		<section className={`h-[300vh] w-screen`} id="s1">
			<div ref={ref} className="h-[100vh] py-4 relative flex flex-col items-center sm:justify-between [&>h1]:tracking-tight [&>h1]:leading-[15vw] [&>h1]:uppercase ">
        <Title text="rubber duck" size="16" zIndex={0} />
				<div className=" h-full w-full px-[4%] -mt-3">
					<P style={` max-w-[25rem]  h-[7em] w-full`}>
						<span className="revealHero "></span>
						<span className="cursor">_</span>
					</P>
				</div>
				<Title text="debugging" size="19" zIndex={30} />
			</div>
		</section>
	);
}
