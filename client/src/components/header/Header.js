import React, {useContext, useEffect, useState} from 'react';
import s from './Header.module.scss';
import GlobalStyle from "../GlobalStyle.module.scss";
import {usePopupForm} from "../../hooks/usePopupForm";
import logo from '../../assets/images/logo-min.png';
import {NavLink} from "react-router-dom";
import {AuthContext} from "../../context/authContext";
import {FormReEmail} from "./FormReEmail";
import {FormRePassword} from "./FormRePassword";
import {optionTranslation, optionVersion} from "../../constants/OptionsTable";
import {useHttp} from "../../hooks/http.hook";
import {FormReTranslation} from "./FormReTranslation";

const label_menu = [
    {
        label: 'Пользователи',
        url: '/admin_panel/users'
    },
    {
        label: 'Видео',
        url: '/admin_panel/video'
    },
    {
        label: 'Аудио',
        url: '/admin_panel/audio'
    },
    {
        label: 'Афиши',
        url: '/admin_panel/posters'
    },
    // {
    //     label: 'Карты',
    //     url: '/admin_panel/maps'
    // },
    {
        label: 'Тесты',
        url: '/admin_panel/tests'
    },
    {
        label: 'Курсы',
        url: '/admin_panel/courses'
    },
    // {
    //     label: 'Консультант',
    //     url: '/admin_panel/consultant'
    // },
];

export const Header = () => {
    const popupForm = usePopupForm();
    const auth = useContext(AuthContext);
    const {request, error, clearError, loading} = useHttp();
    const [status, setStatus] = useState(false);
    const [dataTranslation, setDataTranslation] = useState(null);
    const [version, setVersion] = useState(null);

    const getTranslation = async () => {
        try {
            const answer = await request(`/api/admin_panel/translation`, 'GET', null, {
                Authorization: auth.token
            });
            setDataTranslation(answer);
        } catch (e){}
    }

    const getVersion = async () => {
        try {
            const answer = await request(`/api/data/version`, 'GET', null, {
                Authorization: auth.token
            });
            setVersion(answer.version);
        } catch (e){}
    }

    useEffect(() => {
        getTranslation();
        getVersion();
    }, [])

    const profileHandler = () => {
        setStatus(!status);
    }

    const reEmailHandler = () => {
        profileHandler();
        popupForm.openHandler(<FormReEmail />);
    }

    const rePasswordHandler = () => {
        profileHandler();
        popupForm.openHandler(<FormRePassword />);
    }

    const logoutHandler = () => {
        profileHandler();
        auth.logout();
    }

    const translationHandler = () => {
        profileHandler();
        popupForm.openHandler(
            <FormReTranslation data={dataTranslation} option={optionTranslation} reload={getTranslation} status={true} />
        );
    }

    const versionHandler = () => {
        profileHandler();
        popupForm.openHandler(<FormReTranslation data={version} option={optionVersion} reload={getVersion} status={false} />);
    }

    return (
        <>
        <div className={s.root}>
            <div className={s.block}>
                <img src={logo} alt="Logo" style={s.logo}/>

                <div className={GlobalStyle.BellotaFontRegular + ' ' + s.label}>
                    Музыкотерапия
                </div>

                <div className={s.menu}>
                    {label_menu.map((item, index) => (
                        <NavLink
                            to={item.url} key={item.label}
                            className={s.button_item}
                            activeClassName={s.button_item_active}
                        >
                            <div className={GlobalStyle.CustomFontRegular + ' ' + s.item_label}>
                                {item.label}
                            </div>
                        </NavLink >
                    ))}
                </div>
            </div>
            <div className={status ? s.block_profile_active : s.block_profile}>
                <div className={s.block_profile_header} onClick={() => profileHandler()}>
                    {status ? (
                        <div className={GlobalStyle.CustomFontMedium + ' ' + s.email}>
                            {auth.email}
                        </div>
                    ): null}
                    <div className={s.profile}>
                        <div className={GlobalStyle.CustomFontRegular + ' ' + s.label_profile}>
                            A
                        </div>
                    </div>
                </div>
                {status ? (
                    <div className={s.list_button}>
                        <div className={s.button_profile_item} onClick={() => versionHandler()}>
                            <div className={GlobalStyle.CustomFontMedium + ' ' + s.button_profile_item_text}>
                                Версия приложения
                            </div>
                        </div>
                        <div className={s.button_profile_item} onClick={() => translationHandler()}>
                            <div className={GlobalStyle.CustomFontMedium + ' ' + s.button_profile_item_text}>
                                Переводы
                            </div>
                        </div>
                        <div className={s.button_profile_item} onClick={() => rePasswordHandler()}>
                            <div className={GlobalStyle.CustomFontMedium + ' ' + s.button_profile_item_text}>
                                Изменить пароль
                            </div>
                        </div>
                        <div className={s.button_profile_item} onClick={() => reEmailHandler()}>
                            <div className={GlobalStyle.CustomFontMedium + ' ' + s.button_profile_item_text}>
                                Изменить e-mail
                            </div>
                        </div>
                        <div className={s.button_profile_item} onClick={() => logoutHandler()}>
                            <div className={GlobalStyle.CustomFontMedium + ' ' + s.button_profile_item_text}>
                                Выйти
                            </div>
                        </div>
                    </div>
                ): null}
            </div>
        </div>
        </>
    );
};
