import nav from "./nav";
import { footer } from "./footer";
import makeButton from "./button";
import { makeColorStyle } from "./button-styles";
import makeImage from './image';
import imgURL from './cool-icon.jpg';
import Foo from './foo.ts';
import css from "./footer.css";
import buttonStyles from "./button.css";

const image = makeImage(imgURL);
const button = makeButton("Yay! A Button!");
button.style = makeColorStyle("cyan");
document.body.appendChild(button);
document.body.appendChild(image);
document.body.appendChild(footer);
