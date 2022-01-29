import React, {useEffect, useState} from 'react';
import s from './Search.module.scss';
import {GlobalSvgSelector} from "../../assets/icons/global/GlobalSvgSelector";


export const Search = ({callback, placeholder}) => {
    const [value, setValue] = useState('');

    useEffect( () => {
        if (value.length === 0) callback(0, "null")
    }, [value]);

    return (
        <div className={s.root}>
            <input
                value={value}
                type='text'
                className={s.input}
                placeholder={placeholder}
                onChange={(value) => setValue(value.target.value)}
            />
            <div className={s.button} onClick={() => callback(0, value)}>
                <GlobalSvgSelector id='search' />
            </div>
        </div>
    );
};
