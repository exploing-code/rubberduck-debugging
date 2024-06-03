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
			tl.to(".revealSectionOne4", {
				delay: 1,
				duration: 1,
				text: "(wait what??)",
			});
		},
		{ scope: refS1 }
	);

	return (
		<section
			ref={refS1}
			className="h-screen"
			id="s3"
			style={{
				backgroundImage: `url(${backgroundOrange})`,
				backgroundSize: "contain",
			}}>
			<div  style={{backgroundColor: ducks[activeDuck].primaryClr}} className="absolute h-[15em] left-[10vw] bottom-[100px] *:p-2 *:w-full w-[24em]">
				<P>
					<span className="revealSectionOne1"></span>
				</P>
				<P style={ "mr-8"}>
					<span className="revealSectionOne2"></span>
				</P>
				<P>
					<span className="revealSectionOne3"></span>
				</P>
				<P>
					<span className="revealSectionOne4"></span>
				</P>
			</div>
		</section>
	);
}

export default DescSectionOne;
