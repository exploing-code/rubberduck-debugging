import React, { useRef } from "react";
import SpeechBubble from "../components/SpeeachBubble";
import { myContext } from "../components/ContextProvider.jsx";

function DescSectionThree() {
	const { setHover, setActiveSectionNumb, isAudioCtxActivated, setIsAudioCtxActivated, activeSectionNumb } = myContext();
	const refS3 = useRef();
	const sectionRef3 = useRef();


	function handleOnClick() {
		setActiveSectionNumb(6);

		if (!isAudioCtxActivated) {
			setIsAudioCtxActivated(true);
		}
	}

	return (
		<section ref={refS3} 
      id="s5"
      className="h-[100vh] flex items-start flex-col justify-start relative">
			<button
				onClick={handleOnClick}
				onMouseEnter={() => setHover("hovered")}
				onMouseLeave={() => setHover("not-hovered")}
				className={` ${activeSectionNumb <= 5 ? "absolute" : "fixed"} left-[7vw] bottom-0 bg-red-400 w-20 h-20 z-50`}>


        </button>

			<div ref={sectionRef3}>
				<SpeechBubble 
          direction="left" 
          textReveal1="First, turn the mic on!" 
          textReveal2="Then it's time to start the test, share your code and I'll do my best! " 
          sectionRef={refS3} />
			</div>
		</section>
	);
}

export default DescSectionThree;
