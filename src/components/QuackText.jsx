import React from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ducks } from "../../data";
import { myContext } from "./ContextProvider";

export default function QuackText() {
	const title = useRef();
	const titleString = "YOU QUACKED THE CODE!";
	const { activeDuck } = myContext();

	useGSAP(() => {
		gsap.fromTo(
			title.current.children,
			{ y: 40, opacity: 0 },
			{
				y: 0,
				ease: "elastic",
				stagger: 0.05,
				duration: 2,
				opacity: 1,
			}
		);
	}, []);

	return (
		<h1 className="m-0 absolute top-0 left-[50%] translate-x-[-50%] lg:text-[7vw] flex" ref={title} style={{ color: ducks[activeDuck].secondaryClr }}>
			{titleString
				.replace(/ /g, "\u00a0")
				.split("")
				.map((item, index) => (
					<span className="reveal relative" key={index}>
						{item}
					</span>
				))}
		</h1>
	);
}
