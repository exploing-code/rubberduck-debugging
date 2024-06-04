import React, { useContext, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ducks } from "../../data";
import { myContext } from "./ContextProvider";

export default function LoadingScreenToSection({ sectionId, text }) {
	const containerRef = useRef();
	const title = useRef();
	const { activeDuck } = myContext();
	const titleString = text;



	useGSAP(() => {
		gsap.from(containerRef.current, {
			y: "100vh",
			duration: 2,
			ease: "power4.inOut",
			onStart: () => {
				document.body.style.overflow = "hidden";
			},
			onComplete: () => {
				const section = document.getElementById(sectionId);
				section.scrollIntoView({ behavior: "smooth" });

				// Re-enable scrolling after the scrollIntoView animation has finished
				setTimeout(() => {
					document.body.style.overflow = "auto";
				}, 1000); // Adjust this value as needed
			},
		});
		gsap.to(containerRef.current, {
			y: "-100vh",
			duration: 2,
			delay: 3,
			ease: "power4.inOut",
		});
		gsap.fromTo(
			title.current.children,
			{ y: 40 },
			{
				y: 0,
				ease: "elastic",
				stagger: 0.05,
				duration: 2,
				delay: 1,
			}
		);
	}, []);

	return (
		<div className=" h-[100vh] w-full z-[1000] fixed top-0 left-0 flex justify-center items-center" ref={containerRef} style={{ backgroundColor: ducks[activeDuck].secondaryClr }}>
			<h1 className="m-0 text-[#FBD652] lg:text-[5rem] flex" ref={title} style={{ color: ducks[activeDuck].primaryClr }}>
				{titleString
					.replace(/ /g, "\u00a0")
					.split("")
					.map((item, index) => (
						<span className="reveal relative uppercase" key={index}>
							{item}
						</span>
					))}
			</h1>
		</div>
	);
}
