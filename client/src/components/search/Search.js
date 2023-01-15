import React, {useEffect, useState} from 'react';
import s from './Search.module.scss';
import {GlobalSvgSelector} from "../../assets/icons/global/GlobalSvgSelector";
import {checkLanguageConst} from "../../hooks/translashion";


export const Search = ({value, callback, placeholder, handler, translations}) => {
    return (
        <div className={s.root}>
            <input
                value={value}
                type='text'
                className={s.input}
                placeholder={checkLanguageConst(placeholder, translations)}
                onChange={(value) => callback(value.target.value)}
            />
            <div className={s.button} onClick={() => handler(0)}>
                <GlobalSvgSelector id='search' />
            </div>
        </div>
    );
};
