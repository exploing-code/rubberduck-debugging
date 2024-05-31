import React from "react";
import { ducks } from "../../data";
import { myContext } from "./ContextProvider";

export default function button(props) {
	const { activeDuck } = myContext();
	return (
		<button
			onClick={props.onClick}
			style={{ backgroundColor: ducks[activeDuck].secondaryClr, color: ducks[activeDuck].primaryClr }}
			className="relative py-4 px-8 font-modak uppercase text-5xl rounded-full transition-all duration-200 hover:scale-105 active:scale-100">
			<svg width="50" height="20" viewBox="0 0 35 11" fill="none" xmlns="http://www.w3.org/2000/svg" className=" absolute top-1 left-3">
				<path
					d="M0.999598 9.99959C1.9996 7.49959 3.99995 4.49927 8.50019 2.49943C13.0004 0.499592 22.8363 1.11601 34.0002 0.999869"
					stroke={ducks[activeDuck].primaryClr}
					strokeWidth="2"
					strokeLinecap="round"
				/>
			</svg>
			<p className=" -mb-2">{props.text}</p>
		</button>
	);
}
