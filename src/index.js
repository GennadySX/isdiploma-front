import "./assets/css/vendor/bootstrap.min.css";
import "react-circular-progressbar/dist/styles.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-table/react-table.css";

import { isMultiColorActive, defaultColor } from "./constants/defaultValues";
const color =
  isMultiColorActive && localStorage.getItem("themeColor")
    ? localStorage.getItem("themeColor")
    : defaultColor;

localStorage.setItem("themeColor", color);

require("./assets/css/sass/themes/gogo.light.blue.scss");
require("./assets/css/sass/themes/gogo.dark.blue.scss");

if(color === 'dark.blue') {
    require("./assets/css/sass/themes/gogo.dark.blue.scss");
} else {
    require("./assets/css/sass/themes/gogo.light.blue.scss");
}
require("./AppRenderer");
