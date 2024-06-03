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

	const primaryClr = ducks[activeDuck].primaryClr;

	useGSAP(
		() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: refS1.current,
					start: "top center",
					end: "bottom center",
				},
			});
			tl.to(".revealSectionOne1", {
				duration: 1.5,
				text: "The bug hunt can be a fickle game, fixing one can bring another to fame,",
			});
			tl.to(".revealSectionOne2", {
				duration: 1.5,
				text: "As the codebase shifts and grows, new bugs transpire from deep below.",
			});
			tl.to(".revealSectionOne3", {
				duration: 1.5,
				text: "For bugs will always have their way, still we push our code to prod anyway",
			});
			tl.to(".revealScratch", {
				delay: 3,
				duration: 0.5,
				width: "80%",
			});
			tl.to(".revealSectionOne4", {
				duration: 0.5,
				text: "(wait what??)",
			});
		},
		{ scope: refS1 }
	);

	return (
		<section
			ref={refS1}
			className="h-screen  "
			id="s3"
			style={{
				backgroundImage: `url(${backgroundOrange})`,
				backgroundSize: "cover",
				backgroundPosition: "80% 0%",
			}}>
			{/* <img src={backgroundOrange} className={"absolute h-screen w-screen object-fill"}  /> */}
			<div style={{ backgroundColor: ducks[activeDuck].primaryClr }} className="absolute h-[12em] w-[18em] sm:h-[14.5em] sm:w-[24em] left-[10vw] bottom-[100px] *:py-2 pl-2 *:w-full ">
				<P>
					<span className="revealSectionOne1"></span>
				</P>
				<P style={"mr-8"}>
					<span className="revealSectionOne2"></span>
				</P>
				<P style={"relative"}>
					<span className="revealSectionOne3 relative"></span>
					<div style={{ backgroundColor: ducks[activeDuck].secondaryClr }} className=" revealScratch absolute w-0 h-[1px] bottom-4 sm:bottom-5 right-4"></div>
				</P>
				<P>
					<span className="revealSectionOne4"></span>
				</P>
			</div>
		</section>
	);
}

export default DescSectionOne;
