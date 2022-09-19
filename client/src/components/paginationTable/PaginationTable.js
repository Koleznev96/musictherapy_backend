import React, {useContext, useEffect, useState} from 'react';
import s from './PaginationTable.module.scss';
import GlobalStyle from "../GlobalStyle.module.scss";
import {usePopupForm} from "../../hooks/usePopupForm";
import logo from '../../assets/images/logo-min.png';
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/authContext";
import {GlobalSvgSelector} from "../../assets/icons/global/GlobalSvgSelector";


export const PaginationTable = ({page, endPage, startPage, getData, setPage}) => {

    return (
        <div className={s.root}>
            <div className={page !== startPage ? s.next_button_active : s.next_button} onClick={() => page !== startPage ? getData(page-1) : false}>
                <GlobalSvgSelector id='arrow-left' />
            </div>
            <div className={s.liner}>
                <div className={GlobalStyle.CustomFontBold + ' ' + s.current}>
                    {page + 1}
                </div>
                <div className={GlobalStyle.CustomFontBold + ' ' + s.hr}>
                    /
                </div>
                <div className={GlobalStyle.CustomFontMedium + ' ' + s.end}>
                    {endPage + 1}
                </div>
            </div>
            <div className={page !== endPage ? s.next_button_active : s.next_button} onClick={() => page !== endPage ? getData(page+1) : false}>
                <GlobalSvgSelector id='arrow-right' />
            </div>
        </div>
    );
};
