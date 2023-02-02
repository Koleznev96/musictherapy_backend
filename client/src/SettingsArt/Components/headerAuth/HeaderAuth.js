import React from "react";
import s from "./HeaderAuth.module.scss";
import logo from "./logo.png";

export const HeaderAuth = ({ data, translations }) => {
    return (
        <div className={s.body}>
            <div className={s.block}>
                <img src={logo} className={s.logo} />
            </div>
        </div>
    );
};
