import React, {useContext, useEffect, useState} from 'react';
import s from './Header.module.scss';
import {GlobalSvgSelector} from "../../assets/icons/global/GlobalSvgSelector";
import GlobalStyle from "../GlobalStyle.module.scss";
import {usePopupForm} from "../../hooks/usePopupForm";
import logo from '../../assets/images/logo-min.png';
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/authContext";
import ClipLoader from "react-spinners/ClipLoader";
import {ColorsStyles} from "../../constants/ColorsStyles";
import {useHttp} from "../../hooks/http.hook";

export const FormRePassword = () => {
    const popupForm = usePopupForm();
    const auth = useContext(AuthContext);
    const {request, error, clearError, loading} = useHttp();
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordRe, setNewPasswordRe] = useState('');
    const [popupError, setPopupError] = useState('');
    const [popupOk, setPopupOk] = useState('');

    const clearErrorPopup = () => {
        setPopupError('');
        setPopupOk('');
    }

    useEffect(() => {
        clearErrorPopup();
    }, [popupForm.isOpen]);

    const clearInput = () => {
        setNewPasswordRe('');
        setNewPassword('');
        setPassword('');
    }

    const sendNewPassword = async () => {
        clearErrorPopup();
        if (!newPassword || !newPasswordRe || !password.length) {
            return setPopupError('Заполните все поля.');
        }
        if (newPassword.length === 0 || newPasswordRe.length === 0 || password.length === 0) {
            return setPopupError('Заполните все поля.');
        }
        if (newPassword !== newPasswordRe) {
            return setPopupError('Пароли не совпадают.');
        }
        if (newPassword < 6) {
            return setPopupError('Пароль должен быть блинее 6 символов.');
        }
        clearErrorPopup();
        try {
            await request(`/api/admin_panel/re_password`, 'POST', {new_password: newPassword, password}, {
                Authorization: `${auth.token}`
            });
            clearInput();
            setPopupOk('Пароль изенен.');
        } catch (e) {
            setPopupError('Не верный пароль.');
        }
    }

    return (
        <div className={s.root_popup}>
            <div className={s.popup_header}>
                <div className={GlobalStyle.BellotaFontRegular + ' ' + s.popup_label}>
                    Изменение Пароля
                </div>
                <div className={s.button_close} onClick={() => popupForm.exitHandler()}>
                    <GlobalSvgSelector id='close' />
                </div>
            </div>
            <div className={GlobalStyle.CustomFontRegular + ' ' + s.placeholder}>
                Новый пароль
            </div>
            <input
                value={newPassword}
                type='password'
                className={s.input}
                onChange={(value) => setNewPassword(value.target.value)}
            />
            <div className={GlobalStyle.CustomFontRegular + ' ' + s.placeholder}>
                Повторите пароль
            </div>
            <input
                value={newPasswordRe}
                type='password'
                className={s.input}
                onChange={(value) => setNewPasswordRe(value.target.value)}
            />
            <div className={GlobalStyle.CustomFontRegular + ' ' + s.placeholder}>
                Текущий пароль
            </div>
            <input
                value={password}
                type='password'
                className={s.input}
                onChange={(value) => setPassword(value.target.value)}
            />
            <div className={GlobalStyle.CustomFontRegular + ' ' + (popupOk.length !== 0 ? s.popup_ok : s.popup_error)}>
                {popupError}
                {popupOk}
            </div>
            <div className={s.popup_liner_button}>
                <div
                    className={s.popup_button_ok}
                    onClick={() => sendNewPassword()}
                >
                    {loading ? (
                        <div className={s.popup_button_ok_loader}>
                            <ClipLoader color={ColorsStyles.colorTextError} loading={true} css={s.loader} size={32} />
                        </div>
                    ) : (
                        <div className={GlobalStyle.CustomFontRegular + ' ' + s.popup_button_ok_text}>
                            Сохранить
                        </div>
                    )}
                </div>
                <div
                    className={s.popup_button_exit}
                    onClick={() => popupForm.exitHandler()}
                >
                    <div className={GlobalStyle.CustomFontRegular + ' ' + s.popup_button_exit_text}>
                        Отмена
                    </div>
                </div>
            </div>
        </div>
    );
}
