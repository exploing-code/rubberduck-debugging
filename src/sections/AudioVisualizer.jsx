import React, { useRef } from "react";
import P from "../components/P";
import AudioVisualizerWave from "../components/AudioVizualizerWave";
import { myContext } from "../components/ContextProvider";

export default function AudioVisualizer({ setRenderS2Loading }) {
  const songRef = useRef(null);

  const { setPartyOn } = myContext();

  function toggleSongPlaying(e) {
    if (e.target.checked) {
      songRef.current.currentTime = 32.9;
      songRef.current.play();
    } else {
      songRef.current.pause();
    }
  }

  function handleOnClick() {
    console.log("click");
  }

  function handleClickNo() {
    setPartyOn(true);
  }

  return (
    <section className=" w-screen relative flex items-center justify-center z-10">
      <div className="flex gap-6 absolute top-0 ">
        <button
          onClick={handleClickNo}
          className="bg-yellow-400 py-4 px-6 rounded-md transition-all duration-200 hover:scale-110 hover:bg-yellow-200"
        >
          NO
        </button>
        <button
          onClick={setRenderS2Loading}
          className="bg-yellow-400 py-4 px-6 rounded-md transition-all duration-200 hover:scale-110 hover:bg-yellow-200"
        >
          YES
        </button>
      </div>
      <button onClick={handleOnClick}>test</button>

      <div className=" uppercase px-4 rounded-[1rem] text-xl m-2 items-center flex border-black border-[1px] absolute top-0 left-0 ">
        <label htmlFor="partySongToggle">
          <P>play party song </P>
        </label>
        <input
          type="checkbox"
          id="partySongToggle"
          onChange={(e) => toggleSongPlaying(e)}
        />
      </div>

      <audio ref={songRef} src="../sound-effects/Wobbly-duck.mp3"></audio>
      <AudioVisualizerWave />
    </section>
  );
}
