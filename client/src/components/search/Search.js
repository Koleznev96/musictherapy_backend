import React, {useEffect, useState} from 'react';
import s from './Search.module.scss';
import {GlobalSvgSelector} from "../../assets/icons/global/GlobalSvgSelector";


export const Search = ({value, callback, placeholder, handler}) => {
    return (
        <div className={s.root}>
            <input
                value={value}
                type='text'
                className={s.input}
                placeholder={placeholder}
                onChange={(value) => callback(value.target.value)}
            />
            <div className={s.button} onClick={() => handler(0)}>
                <GlobalSvgSelector id='search' />
            </div>
        </div>
    );
};
