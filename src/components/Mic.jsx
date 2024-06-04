import React, { useContext } from "react";
import { ducks } from "../../data";
import { Context } from "./ContextProvider";
import { FaPowerOff } from "react-icons/fa";


export default function MicIcon({ isOn }) {
	const { activeDuck } = useContext(Context);

	return (
		<div className=" flex items-center  relative">
			<FaPowerOff
				style={{ border: "solid 3px" + ducks[activeDuck].primaryClr, backgroundColor: ducks[activeDuck].primaryClr, color: ducks[activeDuck].secondaryClr }}
				className={`${isOn ? "opacity-0" : "opacity-100" } transition-all hover:scale-110 duration-200 rounded-full text-7xl absolute left-1 bottom-12`}
			/>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
				version="1.1"
				viewBox="20 2 35 60"
				xmlSpace="preserve"
				width="100%"
				height="100%"
				fill={ducks[activeDuck].secondaryClr}
				className= {isOn ? "opacity-100" : "opacity-60" }>
				<g>
					<path d="M39.87536,66.49539V66.5H18.00849v-0.00461c0-2.44387,1.98115-4.42502,4.42501-4.42502h13.01684   C37.89421,62.07037,39.87536,64.05152,39.87536,66.49539z" />
					<path d="M31.96408,30.68119v23.10226h-6.05061V30.75385c0.87181,0.59151,1.90965,0.9133,2.96826,0.9133   C30.00256,31.66715,31.07156,31.32465,31.96408,30.68119z" />
					<path d="M29.11003,21.16418l-2.65686,3.00975c-1.20386,1.35956-1.05861,3.42485,0.26985,4.59761   c1.35956,1.20393,3.42485,1.05861,4.608-0.28024c0.71611-0.80948,1.79544-2.02373,2.65686-2.9993L29.11003,21.16418z    M30.25163,26.81002c-0.47736,0.5397-1.31801,0.59157-1.86809,0.11421c-0.55002-0.49821-0.59158-1.32846-0.10376-1.86816   c0.47736-0.55002,1.30768-0.61229,1.86809-0.11415C30.68757,25.41935,30.73944,26.26,30.25163,26.81002z" />
					<path d="M50.0131,8.95433l-6.45962-5.72362c-1.20076-1.06394-3.03667-0.95302-4.10061,0.24774l-0.21284,0.2402l2.42103,2.14542   c0.42871,0.38007,0.46824,1.03581,0.08817,1.46453c-0.20473,0.23108-0.49054,0.34966-0.77635,0.34966   c-0.24527,0-0.49054-0.08615-0.68818-0.26149l-2.42072-2.1451l-0.78661,0.88771l2.42084,2.14421   c0.42871,0.38007,0.46926,1.03682,0.08919,1.46554c-0.20574,0.23108-0.49054,0.34966-0.77736,0.34966   c-0.24527,0-0.49054-0.08615-0.68818-0.26047l-2.42128-2.14459c-0.00006-0.00006-0.00013-0.00019-0.00019-0.00025L34.91461,8.6003   c0.00013,0.00013,0.00038,0.00013,0.00051,0.00025l2.42027,2.14459c0.42872,0.38007,0.46825,1.03581,0.08818,1.46453   c-0.20473,0.23108-0.49054,0.34966-0.77635,0.34966c-0.24527,0-0.49054-0.08615-0.68818-0.26149l-2.42027-2.14459   c-0.00006,0,0-0.00013-0.00006-0.00013l-0.78667,0.88784c0.00006,0.00006,0.00019,0.00006,0.00025,0.00013l2.42027,2.14561   c0.42871,0.38007,0.46824,1.03581,0.08818,1.46453c-0.20473,0.23209-0.49054,0.34966-0.77635,0.34966   c-0.24527,0-0.49054-0.08615-0.68818-0.26149l-2.42014-2.14548l-0.21322,0.24058c-0.84438,0.95296-0.93699,2.30067-0.3439,3.35036   l-1.16218,1.31155c-0.38013,0.42903-0.34054,1.08496,0.08849,1.46503l6.35789,5.63355   c0.42903,0.38013,1.08496,0.34048,1.46503-0.08856l1.17435-1.32529c1.10156,0.43011,2.39822,0.1666,3.22823-0.77014l0.21284-0.2402   c-0.00019-0.00013-0.00038-0.00019-0.00057-0.00032l-2.42027-2.14459c-0.42871-0.38007-0.46824-1.03581-0.08818-1.46453   c0.38007-0.42973,1.03581-0.46926,1.46453-0.08818l2.42027,2.14459c0.00006,0.00006,0.00006,0.00013,0.00013,0.00019   l0.78668-0.88784c-0.00006-0.00006-0.00026-0.00013-0.00032-0.00019l-2.42027-2.14459   c-0.42872-0.38007-0.46824-1.03581-0.08818-1.46453c0.38007-0.42973,1.03581-0.46824,1.46453-0.08817l2.4202,2.14453   l0.78661-0.88771l-0.00006-0.00006l-2.42027-2.14561c-0.42871-0.38007-0.46824-1.03581-0.08818-1.46453   c0.38007-0.43176,1.03581-0.46824,1.46453-0.08818l2.42002,2.14535l0.78712-0.88834   c-0.00013-0.00013-0.00025-0.00013-0.00038-0.00025l-2.42027-2.14459c-0.42872-0.38007-0.46824-1.03581-0.08818-1.46453   c0.37906-0.42973,1.03682-0.46824,1.46453-0.08818l2.42027,2.14459v0.00006l0.2129-0.24027   C51.32471,11.85418,51.21386,10.01827,50.0131,8.95433z" />
					<path d="M34.56907,56.82431v3.16539H23.3085v-3.16539c0-0.5397,0.43594-0.96518,0.97557-0.96518h9.31982   C34.14352,55.85913,34.56907,56.28462,34.56907,56.82431z" />
				</g>
			</svg>
		</div>
	);
}
