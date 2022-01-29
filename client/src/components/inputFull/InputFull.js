import React, {useContext, useCallback, useEffect, useState} from 'react';
import {AuthContext} from "../../context/authContext";
import {useHttp} from "../../hooks/http.hook";
import s from "./InputFull.module.scss";
import GlobalStyle from "../GlobalStyle.module.scss";


export const InputFull = ({ data }) => {
    return (
        <>
            <input
                type={data.secret}
                value={data.value}
                // placeholderTextColor={'#F3F3F3'}
                className={s.input + ' ' + (data?.styles ? data.styles : '')}
                placeholder={data.placeholder}
                onChange={(value) => data.change(value.target.value)}
            />
            {data.error?.length ?
            <div className={GlobalStyle.CustomFontLite + ' ' + s.error_text}>
                    {data.error}
            </div>: null}
        </>
    );
}
