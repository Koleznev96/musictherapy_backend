import React, {useContext, useCallback, useEffect, useState} from 'react';
import {AuthContext} from "../../context/authContext";
import {useHttp} from "../../hooks/http.hook";
import s from "./HeaderAuth.module.scss";
import GlobalStyle from "../GlobalStyle.module.scss";
import logo from '../../assets/images/logo.png';


export const HeaderAuth = ({ data }) => {
    return (
        <div className={s.body}>
            <div className={s.block}>
                <img src={logo} className={s.logo}/>

                <div className={GlobalStyle.BellotaFontBold + ' ' + s.text_glav}>
                    Музыкотерапия
                </div>
            </div>
        </div>
    );
}
