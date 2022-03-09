import React, {useContext, useEffect, useState} from 'react';
import s from './PaginationTable.module.scss';
import GlobalStyle from "../GlobalStyle.module.scss";
import {usePopupForm} from "../../hooks/usePopupForm";
import logo from '../../assets/images/logo-min.png';
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/authContext";
import {GlobalSvgSelector} from "../../assets/icons/global/GlobalSvgSelector";


export const PaginationTable = ({page, endPage, startPage, getData}) => {

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

            {/*{page !== endPage ? (*/}
            {/*<>*/}
            {/*    <div className={s.item} onClick={() => getData(startPage, search)}>*/}
            {/*        {startPage + 1}*/}
            {/*    </div>*/}
            {/*    <div className={s.next_button} onClick={() => getData(page-1, search)}>*/}
            {/*        <GlobalSvgSelector id='arrow-left' />*/}
            {/*    </div>*/}
            {/*</>*/}
            {/*): null}*/}
            {/*<div className={s.current}>*/}
            {/*    {page + 1}*/}
            {/*</div>*/}
            {/*{page !== endPage ? (*/}
            {/*<>*/}
            {/*    <div className={s.next_button} onClick={() => getData(page+1, search)}>*/}
            {/*        <GlobalSvgSelector id='arrow-right' />*/}
            {/*    </div>*/}
            {/*    <div className={s.item} onClick={() => getData(endPage, search)}>*/}
            {/*        {endPage + 1}*/}
            {/*    </div>*/}
            {/*</>*/}
            {/*): null}*/}
        </div>
    );
};
