import React, {useContext, useEffect, useState} from 'react';
import s from './Form.module.scss';
import {GlobalSvgSelector} from "../../assets/icons/global/GlobalSvgSelector";
import GlobalStyle from "../GlobalStyle.module.scss";
import {usePopupForm} from "../../hooks/usePopupForm";
import {AuthContext} from "../../context/authContext";
import ClipLoader from "react-spinners/ClipLoader";
import {ColorsStyles} from "../../constants/ColorsStyles";
import {useHttp} from "../../hooks/http.hook";
import {FieldInput} from "../form/FielsInput";
import {FieldDate} from "../form/FielsDate";
import {FieldFile} from "../form/FielsFile";
import {FieldText} from "../form/FielsText";
import {FieldVideo} from "../form/FielsVideo";
import {FieldBool} from "../form/FielsBool";
import {PushInfo} from "../pushInfo/PushInfo";
import {FieldBox} from "../form/FielsBox";
import Scrollbars from "react-custom-scrollbars-2";
import {Link, NavLink} from "react-router-dom";
import {httpServer} from "../../const";


export const FormReTranslation = ({data, option, reload, status}) => {
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
            popupForm.openHandler(<PushInfo value={'Запись удалена'} />);
            reload(0, "null");
        } catch (e) {
            setPopupError(data ? 'Ошибка.' : 'Ошибка.');
        }
    }

    const listField = (item, change, value) => {
        if (item.type === 'input') return <FieldInput label={item.label} name={item.value} change={change} value={value[item.value]} />;
        if (item.type === 'bool') return <FieldBool label={item.label} name={item.value} change={change} value={value[item.value]} list_value={item.list_value} />;
        if (item.type === 'box') return <FieldBox label={item.label} name={item.value} change={change} value={value[item.value]} list_value={item.list_value} />;
        if (item.type === 'date') return <FieldDate label={item.label} name={item.value} change={change} value={value[item.value]} />;
        if (item.type === 'img') return <FieldFile label={item.label} name={item.value} change={change} value={value[item.value]} />;
        if (item.type === 'video') return <FieldVideo label={item.label} name={item.value} change={change} value={value[item.value]} />;
        if (item.type === 'inputarrea') return <FieldText label={item.label} name={item.value} change={change} value={value[item.value]} />;
        return null;
    }

    const sampleTranslationHandler = () => {

    }

    return (
        <div className={s.root_popup}>
            <div className={s.popup_header}>
                <div className={GlobalStyle.BellotaFontRegular + ' ' + s.popup_label}>
                    Редактирование
                </div>
                <div className={s.button_close} onClick={() => popupForm.exitHandler()}>
                    <GlobalSvgSelector id='close' />
                </div>
            </div>
            <Scrollbars style={{width: '100%', height: '60vh', marginTop: 18}}>
                <div className={s.items}>
                    {status ? (
                    <a className={s.button_upload} href={httpServer + "/translations/sample_translation.json"} target="_blank">
                        <div
                            className={GlobalStyle.CustomFontRegular + s.button_upload_text}
                            onClick={() => sampleTranslationHandler()}
                        >
                            Посмотреть шаблон json файла
                        </div>
                    </a>
                    ): null}
                    {
                        option?.fields?.map(item => {
                            return listField(item, changeRoot, value)
                        })
                    }
                </div>
            </Scrollbars>
            <div className={GlobalStyle.CustomFontRegular + ' ' + (popupOk.length !== 0 ? s.popup_ok : s.popup_error)}>
                {popupOk || popupError}
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
                            {"Сохранить"}
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
