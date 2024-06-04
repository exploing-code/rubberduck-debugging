import React, { useRef, useContext } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TextPlugin } from "gsap/TextPlugin";
import { ducks } from "../../data";
import { myContext } from "../components/ContextProvider.jsx";
import P from "../components/P";
import backgroundOrange from "../assets/background-orange.png";

gsap.registerPlugin(TextPlugin);

function DescSectionOne() {
	const { activeDuck } = myContext();
	const refS1 = useRef();

	useGSAP(
		() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: refS1.current,
					start: "top center",
					end: "bottom center",
				},
			});
			tl.to(".p1", {
				duration: 1.5,
				text: "The bug hunt can be a fickle game, fixing one can bring another to fame,",
			});
			tl.to(".p2", {
				duration: 1.5,
				text: "As the codebase shifts and grows, new bugs transpire from deep below.",
			});
			tl.to(".p3", {
				duration: 1.5,
				text: "For bugs will always have their way, still we push our code to prod anyway",
			});
			tl.to(".revealScratch", {
				delay: 3,
				duration: 0.5,
				width: "80%",
			});
			tl.to(".p4", {
				duration: 0.5,
				text: "(wait what??)",
			});
		},
		{ scope: refS1 }
	);

	return (
		<section
			ref={refS1}
			className="h-screen relative"
			id="s3"
			style={{
				backgroundImage: `url(${backgroundOrange})`,
				backgroundSize: "cover",
				backgroundPosition: "80% 0%",
			}}>
			{/* <img src={backgroundOrange} className={"absolute h-screen w-screen object-fill"}  /> */}
			<div
				style={{ backgroundColor: ducks[activeDuck].primaryClr }}
				className="absolute h-[12em] w-[18em] sm:h-[14.5em] sm:w-[24em] left-[10vw] bottom-[100px] *:py-2 pl-2 *:w-full z-20 ">
				<P>
					<span className="p1"></span>
				</P>
				<P style={"mr-8"}>
					<span className="p2"></span>
				</P>
				<div className="relative">
					<P>
						<span className="p3 relative"></span>
					</P>
					<div style={{ backgroundColor: ducks[activeDuck].secondaryClr }} className=" revealScratch absolute w-0 h-[1px] bottom-4 sm:bottom-5 right-4"></div>
				</div>
				<P>
					<span className="p4"></span>
				</P>
			</div>
		</section>
	);
}

export default DescSectionOne;
