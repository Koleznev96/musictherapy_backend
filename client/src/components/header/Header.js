import React, {useContext, useEffect, useState} from 'react';
import s from './Header.module.scss';
import GlobalStyle from "../GlobalStyle.module.scss";
import {usePopupForm} from "../../hooks/usePopupForm";
import logo from '../../assets/images/logo-min.png';
import {NavLink} from "react-router-dom";
import {AuthContext} from "../../context/authContext";
import {FormReEmail} from "./FormReEmail";
import {FormRePassword} from "./FormRePassword";
import {optionTranslation, optionTranslationAdmin, optionVersion} from "../../constants/OptionsTable";
import {useHttp} from "../../hooks/http.hook";
import {FormReTranslation} from "./FormReTranslation";
import {checkLanguageConst} from "../../hooks/translashion";
import {FormReTranslationAdmin} from "./FormReTranslationAdmin";

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

const label_menu_fin = [
    {
        label: 'Пользователи',
        url: '/admin_panel/users_fin'
    },
];

export const Header = () => {
    const popupForm = usePopupForm();
    const auth = useContext(AuthContext);
    const {request, error, clearError, loading} = useHttp();
    const [status, setStatus] = useState(false);
    const [dataTranslation, setDataTranslation] = useState(null);
    const [dataTranslationAdmin, setDataTranslationAdmin] = useState(null);
    const [version, setVersion] = useState(null);
    const [active_list_menu, set_active_list_menu] = useState(label_menu_fin);

    const getTranslation = async () => {
        try {
            const answer = await request(`/api/admin_panel/translation`, 'GET', null, {
                Authorization: auth.token
            });
            const answerAdmin = await request(`/api/admin_panel/translation_admin`, 'GET', null, {
                Authorization: auth.token
            });
            setDataTranslation(answer);
            setDataTranslationAdmin(answerAdmin);
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
        if (auth.type_admin === 'Администратор') {
            set_active_list_menu(label_menu);
        }
    }, [auth.type_admin])

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

    const translationAdminHandler = () => {
        profileHandler();
        popupForm.openHandler(
            <FormReTranslationAdmin data={dataTranslationAdmin} option={optionTranslationAdmin} reload={getTranslation} status={true} />
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

                    {checkLanguageConst('Музыкотерапия', auth.translations)}
                </div>

                <div className={s.menu}>
                    {active_list_menu.map((item, index) => (
                        <NavLink
                            to={item.url} key={item.label}
                            className={s.button_item}
                            activeClassName={s.button_item_active}
                        >
                            <div className={GlobalStyle.CustomFontRegular + ' ' + s.item_label}>
                                {checkLanguageConst(item.label, auth.translations)}
                            </div>
                        </NavLink >
                    ))}
                </div>
            </div>
            <div className={s.lines}>
                <div className={s.lang}>
                    <div
                        onClick={() => auth.newLanguage('ru')}
                        className={GlobalStyle.CustomFontMedium + ' ' + (auth.language === 'ru' ? s.lang_item_active : s.lang_item)}
                    >
                        {checkLanguageConst('рус', auth.translations)}
                    </div>
                    <div
                        onClick={() => auth.newLanguage('com')}
                        className={GlobalStyle.CustomFontMedium + ' ' + (auth.language === 'com' ? s.lang_item_active : s.lang_item)}
                    >
                        {checkLanguageConst('eng', auth.translations)}
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
                        {auth.type_admin === 'Администратор' ? (
                            <>
                                <div className={s.button_profile_item} onClick={() => versionHandler()}>
                                    <div className={GlobalStyle.CustomFontMedium + ' ' + s.button_profile_item_text}>

                                        {checkLanguageConst('Версия приложения', auth.translations)}
                                    </div>
                                </div>
                                <div className={s.button_profile_item} onClick={() => translationHandler()}>
                                    <div className={GlobalStyle.CustomFontMedium + ' ' + s.button_profile_item_text}>

                                        {checkLanguageConst('Переводы приложения', auth.translations)}
                                    </div>
                                </div>
                                <div className={s.button_profile_item} onClick={() => translationAdminHandler()}>
                                    <div className={GlobalStyle.CustomFontMedium + ' ' + s.button_profile_item_text}>

                                        {checkLanguageConst('Переводы админки', auth.translations)}
                                    </div>
                                </div>
                            </>
                        ) : null}
                        <div className={s.button_profile_item} onClick={() => rePasswordHandler()}>
                            <div className={GlobalStyle.CustomFontMedium + ' ' + s.button_profile_item_text}>

                                {checkLanguageConst('Изменить пароль', auth.translations)}
                            </div>
                        </div>
                        <div className={s.button_profile_item} onClick={() => reEmailHandler()}>
                            <div className={GlobalStyle.CustomFontMedium + ' ' + s.button_profile_item_text}>

                                {checkLanguageConst('Изменить e-mail', auth.translations)}
                            </div>
                        </div>
                        <div className={s.button_profile_item} onClick={() => logoutHandler()}>
                            <div className={GlobalStyle.CustomFontMedium + ' ' + s.button_profile_item_text}>

                                {checkLanguageConst('Выйти', auth.translations)}
                            </div>
                        </div>
                    </div>
                ): null}
            </div>
            </div>
        </div>
        </>
    );
};
