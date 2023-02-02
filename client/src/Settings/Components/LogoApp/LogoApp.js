import React from "react";
import { checkLanguageConst } from "../../../hooks/translashion";
import s from "./LogoApp.module.scss";
import logo from "./logo.png";
import GlobalStyle from "../../../components/GlobalStyle.module.scss";

export const LogoApp = ({ translations }) => {
    return (
        <div className={s.logo_app}>
            <img src={logo} alt="Logo" style={s.logo} />

            <div className={GlobalStyle.BellotaFontRegular + " " + s.label}>
                {checkLanguageConst("ApplicationName", translations)}
            </div>
        </div>
    );
};
