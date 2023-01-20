import React from "react";
import s from "./BackgroundLogo.module.scss";
import backgroundLogoImg from "./background-logo.png";

export const BackgroundLogo = () => (
    <img src={backgroundLogoImg} alt="Background Logo" className={s.main} />
);
