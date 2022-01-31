import React from "react";
import { COLOR } from "../styles/Colors";

const Footer = () => (
  <div className="footer">
    <a
      style={{
        color: COLOR.FONT_SECONDARY,
        opacity: 0.6,
        height: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textDecoration: "none",
      }}
      target="_blank"
      href="https://github.com/ccd-course"
    >
      developed by dirty developers
      <img src={"github_icon.png"} style={{ width: 20, marginLeft: 10 }} />
    </a>
  </div>
);

export default Footer;
