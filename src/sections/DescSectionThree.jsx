import React, { useEffect, useRef, useState } from "react";
import SpeechBubble from "../components/SpeeachBubble";
import { myContext } from "../components/ContextProvider.jsx";
import MicIcon from "../components/Mic";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Button from "../components/Button";

function DescSectionThree() {
	const { setHover, setActiveSectionNumb, isAudioCtxActivated, setIsAudioCtxActivated, activeSectionNumb, partyOn, hover } = myContext();
	const refS3 = useRef();
	const sectionRef3 = useRef();
	const micRef = useRef(null);
	const [isMicOn, setIsMicOn] = useState(false);

	function handleOnClick() {
		setIsMicOn(true);
		setActiveSectionNumb(6);

		if (!isAudioCtxActivated) {
			setIsAudioCtxActivated(true);
		}
	}
	useEffect(() => {
		console.log(hover);
	}, [hover]);

	useGSAP(() => {
		// Generate unique class names
		gsap.fromTo(
			micRef.current,
			{ y: 0 },
			{
				scrollTrigger: {
					trigger: refS3.current,
					start: "center center",
					end: "bottom bottom",
					markers: true,
				},
				duration: 1,
				delay: 3,
				ease: "power3.inOut",
				bottom: 0,
			}
		);
	}, [refS3, micRef]);

	return (
		<section ref={refS3} id="s5" className="h-[100vh] flex items-start flex-col justify-start relative">
			{partyOn ? null : (
				<>
					<button
						onClick={handleOnClick}
						onMouseEnter={() => setHover("hovered")}
						onMouseLeave={() => setHover("not-hovered")}
						ref={micRef}
						className={` ${activeSectionNumb <= 5 ? "absolute" : "fixed"}  left-[7vw] bottom-[-50%] w-20 sm:w-40 z-[100]  `}>
						{isMicOn ? <MicIcon isOn={true} /> : <MicIcon isOn={false} />}
					</button>
				</>
			)}
			<div className="-translate-x-10 sm:translate-x-0 lg:translate-x-[10rem]" ref={sectionRef3}>
				<SpeechBubble
					direction="left"
					textReveal1="First, turn the mic on!"
					textReveal2="Then it's time to start the test, explain your code and I'll do my best! "
					sectionRef={refS3}
				/>
			</div>
		</section>
	);
}

export default DescSectionThree;
