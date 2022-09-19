import React, {useContext, useEffect, useState} from 'react';
import s from './Form.module.scss';
import {GlobalSvgSelector} from "../../assets/icons/global/GlobalSvgSelector";
import GlobalStyle from "../GlobalStyle.module.scss";
import {usePopupForm} from "../../hooks/usePopupForm";
import {AuthContext} from "../../context/authContext";
import ClipLoader from "react-spinners/ClipLoader";
import {ColorsStyles} from "../../constants/ColorsStyles";
import {useHttp} from "../../hooks/http.hook";
import {PushInfo} from "../pushInfo/PushInfo";
import Scrollbars from "react-custom-scrollbars-2";
import {httpServer} from "../../const";
import {listField, optionLanguages} from "../../constants/OptionsTable";
import {checkLanguageConst} from "../../hooks/translashion";


export const FormReTranslationAdmin = ({data, option, reload, status}) => {
    const popupForm = usePopupForm();
    const auth = useContext(AuthContext);
    const {request, error, clearError, loading} = useHttp();
    const [popupError, setPopupError] = useState('');
    const [popupOk, setPopupOk] = useState('');
    const [value, setValue] = useState({});

    useEffect(() => {
        let field = {};
        option?.fields?.forEach(item => {
            field[item.value] = data ? data[item.value] : item.default;
        });
        setValue(field);
    }, [option]);

    const changeRoot = (data) => {
        let new_data = {...value};
        new_data[data.name] = data.value;
        setValue(new_data);
    }

    const clearErrorPopup = () => {
        setPopupError('');
        setPopupOk('');
    }

    useEffect(() => {
        clearErrorPopup();
    }, [popupForm.isOpen]);

    const saveHandler = async () => {
        clearErrorPopup();
        try {
            await request(`/api/admin_panel${option?.url}`, 'POST',
                {data: value, _id: data?._id},
                {
                    Authorization: `${auth.token}`
                }
            );
            setPopupOk(data ? 'Изменения сохранены.' : 'Добавлено.');
            reload();
        } catch (e) {
            setPopupError(data ? 'Ошибка.' : 'Заполните все поля.');
        }
    }

    const deleteHandler = async () => {
        clearErrorPopup();
        try {
            await request(`/api/admin_panel${option?.delete_url}`, 'POST', {_id: data?._id}, {
                Authorization: `${auth.token}`
            });
            popupForm.exitHandler()
            popupForm.openHandler(<PushInfo translations={auth.translations} value={'Запись удалена'} />);
            reload(0, "null");
        } catch (e) {
            setPopupError(data ? 'Ошибка.' : 'Ошибка.');
        }
    }

    const sampleTranslationHandler = () => {

    }

    return (
        <div className={s.root_popup}>
            <div className={s.popup_header}>
                <div className={GlobalStyle.BellotaFontRegular + ' ' + s.popup_label}>

                    {checkLanguageConst('Редактирование', auth.translations)}
                </div>
                <div className={s.button_close} onClick={() => popupForm.exitHandler()}>
                    <GlobalSvgSelector id='close' />
                </div>
            </div>
            <Scrollbars style={{width: '100%', height: '60vh', marginTop: 18}}>
                <div className={s.items}>
                    {status ? (
                    <a className={s.button_upload} href={httpServer + "/translations/sample_translation_admin.json"} target="_blank">
                        <div
                            className={GlobalStyle.CustomFontRegular + s.button_upload_text}
                            onClick={() => sampleTranslationHandler()}
                        >

                            {checkLanguageConst('Посмотреть шаблон json файла', auth.translations)}
                        </div>
                    </a>
                    ): null}
                    {
                        option?.fields?.map(item => {
                            return listField({translations: auth.translations, item: item, change: changeRoot, value: value, optionLanguages: optionLanguages})
                        })
                    }
                </div>
            </Scrollbars>
            <div className={GlobalStyle.CustomFontRegular + ' ' + (popupOk.length !== 0 ? s.popup_ok : s.popup_error)}>
                {checkLanguageConst(popupOk || popupError, auth.translations)}
            </div>
            <div className={s.popup_liner_button}>
                <div
                    className={s.popup_button_ok}
                    onClick={() => saveHandler()}
                >
                    {loading ? (
                        <div className={s.popup_button_ok_loader}>
                            <ClipLoader color={ColorsStyles.colorTextError} loading={true} css={s.loader} size={32} />
                        </div>
                    ) : (
                        <div className={GlobalStyle.CustomFontRegular + ' ' + s.popup_button_ok_text}>
                            {checkLanguageConst('Сохранить', auth.translations)}
                        </div>
                    )}
                </div>
                <div
                    className={s.popup_button_exit}
                    onClick={() => popupForm.exitHandler()}
                >
                    <div className={GlobalStyle.CustomFontRegular + ' ' + s.popup_button_exit_text}>
                        {checkLanguageConst('Отмена', auth.translations)}
                    </div>
                </div>
            </div>
        </div>
    );
}
