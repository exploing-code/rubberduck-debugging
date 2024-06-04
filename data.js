import blueWater from "./src/assets/binaryWater/Blue.png";
import brownWater from "./src/assets/binaryWater/Brown.png";
import darkWater from "./src/assets/binaryWater/Dark.png";
import darkGreyWater from "./src/assets/binaryWater/DarkGrey.png";
import greenWater from "./src/assets/binaryWater/Green.png";
import greyWater from "./src/assets/binaryWater/Grey.png";
import orangeWater from "./src/assets/binaryWater/Orange.png";
import yellowWater from "./src/assets/binaryWater/Yellow.png";

export const ducks = [
	{
		name: "RubberDuck",
		path: "./rubber_duck/scene.gltf",
		primaryClr: "#FFEC43",
		secondaryClr: "black",
		thirdClr: "#37ADE0",
		waterImg: blueWater,
	},
	{
		name: "Beelzequack",
		path: "./demon_duckling/scene.gltf",
		primaryClr: "#720E06",
		secondaryClr: "#D95912",
		thirdClr: "#2E0B0B",
		waterImg: orangeWater,
	},
	{
		name: "SawDuck",
		path: "./ducksaw/scene.gltf",
		primaryClr: "#5F5B5B",
		secondaryClr: "#DFA03B",
		thirdClr: "#563821",
		waterImg: brownWater,
	},
	{
		name: "Roboduck",
		path: "./roboduck/scene.gltf",
		primaryClr: "#E0E0E0",
		secondaryClr: "#3696B9",
		thirdClr: "#828587",
		waterImg: greyWater,
	},
	{
    name: "quackana",
		path: "./banana_duck/scene.gltf",
		primaryClr: "#63472D",
		secondaryClr: "#AAD629",
		thirdClr: "#CC9329",
    waterImg: yellowWater,
	},
	{
		name: "Minequack",
		path: "./minecraftDuck/scene.gltf",
		primaryClr: "#5DA718",
		secondaryClr: "#724727",
		thirdClr: "#5A5C5E",
		waterImg: darkGreyWater,
	},
];
