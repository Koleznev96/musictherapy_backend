import React, {useEffect, useState} from 'react';
import s from './Search.module.scss';
import {GlobalSvgSelector} from "../../assets/icons/global/GlobalSvgSelector";
import {optionAudio} from "../../constants/OptionsTable";
import GlobalStyle from "../GlobalStyle.module.scss";
import {Form} from "../tableCard/Forml";
import {usePopupForm} from "../../hooks/usePopupForm";
import ClipLoader from "react-spinners/ClipLoader";
import {ColorsStyles} from "../../constants/ColorsStyles";


const Modal = ({section, value, callback, handler, list, exitHandler, placeholder}) => {
    const [active, setActive] = useState('');

    useEffect(() => {
        setActive(value);
    }, [value]);

    const newActive = (data) => {
        callback(data);
        setActive(data);
    }

    const itemHandler = () => {
        handler(0, "false", {[section]: active});
        exitHandler();
    }

    return (
        <div className={s.root_popup}>
            <div className={s.popup_header}>
                <div className={GlobalStyle.BellotaFontRegular + ' ' + s.popup_label}>
                    {placeholder}
                </div>
                <div className={s.button_close} onClick={() => exitHandler()}>
                    <GlobalSvgSelector id='close' />
                </div>
            </div>
            <div className={GlobalStyle.CustomFontRegular + ' ' + s.placeholder_i}>
                {list?.label}
            </div>
            <div className={s.wrapper_bool}>
                <div className={s.root_click}>
                    <div className={s.button_input} onClick={() => newActive('')}>
                        <div className={active?.length === 0 ? s.clip_active : s.clip}/>
                        <div className={s.clip_text}>
                            Все
                        </div>
                    </div>
                    {list?.list_value?.slice(0, list?.list_value.length/2).map((item, index) => (
                        <div className={s.button_input} onClick={() => newActive(item.value)}>
                            <div className={active === item.value ? s.clip_active : s.clip}/>
                            <div className={s.clip_text}>
                                {item.label}
                            </div>
                        </div>
                    ))}
                </div>
                <div className={s.root_click}>
                    {list?.list_value?.slice(list?.list_value.length/2, list?.list_value.length).map((item, index) => (
                        <div className={s.button_input} onClick={() => newActive(item.value)}>
                            <div className={active === item.value ? s.clip_active : s.clip}/>
                            <div className={s.clip_text}>
                                {item.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={s.popup_liner_button}>
                <div
                    className={s.popup_button_ok}
                    onClick={() => itemHandler()}
                >
                    <div className={GlobalStyle.CustomFontRegular + ' ' + s.popup_button_ok_text}>
                        Применить
                    </div>
                </div>
                <div
                    className={s.popup_button_exit}
                    onClick={() => exitHandler()}
                >
                    <div className={GlobalStyle.CustomFontRegular + ' ' + s.popup_button_exit_text}>
                        Отмена
                    </div>
                </div>
            </div>
        </div>
    )
}


export const Filter = ({section, value, callback, placeholder, handler, list}) => {
    const popupForm = usePopupForm();

    const exitHandler = () => {
        popupForm.exitHandler();
    }

    const openModal = () => {
        popupForm.openHandler(<Modal section={section} value={value} callback={callback} handler={handler} list={list} exitHandler={exitHandler} placeholder={placeholder}/>);
    }

    return (
        <div className={s.root} onClick={() => openModal()}>
            <div className={s.input}>
                <div className={GlobalStyle.CustomFontRegular + ' ' + (value ? s.value : s.placeholder)}>
                {value ? value : placeholder}
                </div>
            </div>
            <div className={s.button}>
                <GlobalSvgSelector id='filter' />
            </div>
        </div>
    );
};
