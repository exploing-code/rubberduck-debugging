import React, { useRef, useContext } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TextPlugin } from "gsap/TextPlugin";
import { ducks } from "../../data";
import { myContext } from "../components/ContextProvider.jsx";
import P from "../components/P";

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
				width: "76%",
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
			className="h-screen relative"
			ref={refS1}
			id="s3"
			style={{
				backgroundImage: `url(${ducks[activeDuck].waterImg})`,
				backgroundSize: "cover",
				backgroundPosition: "80% 0%",
			}}>
			{/* <img src={backgroundOrange} className={"absolute h-screen w-screen object-fill"}  /> */}
			<div
				style={{ backgroundColor: ducks[activeDuck].primaryClr }}
				className="absolute h-[12em] w-[18em] sm:h-[13.2em] sm:w-[22em] left-[7vw] bottom-[103px] *:py-2 pl-2 *:w-full ">
				<P color={"secondary"}>
					<span className="p1"></span>
				</P>
				<P color={"secondary"} style={"mr-8"}>
					<span className="p2"></span>
				</P>
				<div className="relative">
					<P color={"secondary"}>
						<span className="p3 relative"></span>
					</P>
					<div style={{ backgroundColor: ducks[activeDuck].secondaryClr }} className=" revealScratch absolute w-0 h-[1px] bottom-4 sm:bottom-4 right-4 sm:right-8"></div>
				</div>
				<P color={"secondary"}>
					<span className="p4"></span>
				</P>
			</div>
		</section>
	);
}

export default DescSectionOne;
