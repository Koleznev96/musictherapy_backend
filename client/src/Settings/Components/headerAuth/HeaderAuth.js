import React from "react";
import s from "./HeaderAuth.module.scss";
import GlobalStyle from "../GlobalStyle.module.scss";
import logo from "./logo.png";
import { checkLanguageConst } from "../../../hooks/translashion";

export const HeaderAuth = ({ data, translations }) => {
    return (
        <div className={s.body}>
            <div className={s.block}>
                <img src={logo} className={s.logo} />

                <div
                    className={GlobalStyle.BellotaFontBold + " " + s.text_glav}
                >
                    {checkLanguageConst("ApplicationName", translations)}
                </div>
            </div>
        </div>
    );
};
