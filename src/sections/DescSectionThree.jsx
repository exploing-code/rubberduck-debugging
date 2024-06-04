import React, { useRef, useState } from "react";
import SpeechBubble from "../components/SpeeachBubble";
import { myContext } from "../components/ContextProvider.jsx";
import MicOn from "../assets/mic/MicOn.svg";
import MicOff from "../assets/mic/MicOff.svg";

function DescSectionThree() {
	const { setHover, setActiveSectionNumb, isAudioCtxActivated, setIsAudioCtxActivated, activeSectionNumb } = myContext();
	const refS3 = useRef();
	const sectionRef3 = useRef();
	const [isMicOn, setIsMicOn] = useState(false);

	function handleOnClick() {
		setIsMicOn(true);
		setActiveSectionNumb(6);

		if (!isAudioCtxActivated) {
			setIsAudioCtxActivated(true);
		}
	}

	return (
		<section ref={refS3} id="s5" className="h-[100vh] flex items-start flex-col justify-start relative">
			<button onClick={handleOnClick} className={` ${activeSectionNumb <= 5 ? "absolute" : "fixed"} left-[7vw] bottom-0 w-40 h-40 z-50`}>
				{isMicOn ? (
					<img src={MicOn} alt="" onMouseLeave={() => setHover("not-hovered")} />
				) : (
					<img src={MicOff} alt="" style={{ fill: "blue" }} onMouseEnter={() => setHover("hovered")} onMouseLeave={() => setHover("not-hovered")} />
				)}
			</button>

			<div ref={sectionRef3}>
				<SpeechBubble
					direction="left"
					textReveal1="First, turn the mic on!"
					textReveal2="Then it's time to start the test, share your code and I'll do my best! "
					sectionRef={refS3}
				/>
			</div>
		</section>
	);
}

export default DescSectionThree;
