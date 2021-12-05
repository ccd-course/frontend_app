import CSS from "csstype";
import background from "../images/Background.jpg";

export const PageStyle: CSS.Properties = {
  height: "93.2%",
  width: "100%",
  backgroundImage: `linear-gradient(to right, rgba(34, 40, 49, 0.8), rgba(34, 40, 49, 0.6)), 
        url(${background})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  position: "relative",
};
