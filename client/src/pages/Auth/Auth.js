import React, {useContext, useState} from 'react';
import s from './Auth.module.scss';
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/authContext";
import backgroundLogo from "../../assets/images/background-logo.png";
import {InputFull} from "../../components/inputFull/InputFull";
import {ButtonFull} from "../../components/buttonFull/ButtonFull";
import GlobalStyle from "../../components/GlobalStyle.module.scss";
import {HeaderAuth} from "../../components/headerAuth/HeaderAuth";
import {ColorsStyles} from "../../constants/ColorsStyles";
import ClipLoader from "react-spinners/ClipLoader";
import {checkLanguageConst} from "../../hooks/translashion";


export const Auth = () => {
    const auth = useContext(AuthContext);
    const {request, error, clearError, loading} = useHttp();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loader, setLoader] = useState(false);
    const [status, setStatus] = useState(false);
    const [errorField, setErrorField] = useState({
        email: '',
        password: '',
    });

    const AuthHandler = async () => {
        clearError();
        if (email.length === 0) {
            return setErrorField({
                name: '',
                fullName: '',
                telephone: '',
                email: 'Введите E-mail',
                password: '',
            });
        }
        if (password.length === 0) {
            return setErrorField({
                name: '',
                fullName: '',
                telephone: '',
                email: '',
                password: 'Введите пароль',
            });
        }
        setErrorField({
            email: '',
            password: '',
        });

        try {
            const data = await request(`/api/admin_panel/login`, 'POST', {email, password});
            if (data.errors) {
                setErrorField({...errorField, [data.errors[0][0]]: data.errors[0][1]});
            } else {
                auth.login(data.token, email, data.type_admin, data.name);
            }
        } catch (e) {}
    };

    const helpHandler = async () => {
        try {
            setLoader(true);
            await request(`/api/admin_panel/help_password`, 'POST', {});
            setStatus(true);
            setLoader(false);
        } catch (e) {}
    }

    return (
        <>
            <img src={backgroundLogo} alt="Background Logo" className={s.main}/>
            <div className={s.root}>
                <HeaderAuth />
                <div className={GlobalStyle.CustomFontRegular + ' '+ s.text_foot}>
                     {checkLanguageConst('Введите ваши данные', auth.translations)}
                </div>
                <div className={s.block}>
                    <InputFull translations={auth.translations} data={{value: email, change: setEmail, placeholder: 'E-mail', error: errorField.email, secret: "email"}}/>
                    <div className={s.top_input} />
                    <InputFull translations={auth.translations} data={{value: password, change: setPassword, placeholder: 'Пароль', error: errorField.password, secret: "password"}} />
                    <div className={s.top} />
                    <ButtonFull data={{value: 'Войти в аккаунт', change: AuthHandler, loading: loading}} translations={auth.translations} />
                    <div className={s.footer}>
                        {!loader ? (status ? (
                            <div className={GlobalStyle.CustomFontRegular + ' ' + s.button_footer_text}>

                                {checkLanguageConst('На вашу почту был отправлен пароль', auth.translations)}
                            </div>
                        ) : (
                            <div
                                className={s.button_footer}
                                onClick={() => helpHandler()}
                            >
                                <div className={GlobalStyle.CustomFontRegular + ' ' + s.button_footer_text}>

                                    {checkLanguageConst('Забыли пароль?', auth.translations)}
                                </div>
                            </div>
                        )) : (
                            <ClipLoader color={ColorsStyles.colorTextError} loading={true} css={s.loader} size={32} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
