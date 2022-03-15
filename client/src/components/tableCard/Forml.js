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
import {FieldInputTranslation} from "../form/FielsInputTranslation";
import {optionLanguages} from "../../constants/OptionsTable";
import {FieldFileTranslation} from "../form/FielsFileTranslation";
import {FieldTextTranslation} from "../form/FielsTextTranslation";
import cloneDeep from 'lodash/cloneDeep';


export const Form = ({data, option, reload, optionQuestionnaire, optionPassword, optionEdit, setNewData}) => {
    const popupForm = usePopupForm();
    const auth = useContext(AuthContext);
    const {request, error, clearError, loading} = useHttp();
    const [popupError, setPopupError] = useState('');
    const [popupOk, setPopupOk] = useState('');
    const [value, setValue] = useState({});
    const [questionnaire, setQuestionnaire] = useState({});
    const [password, setPassword] = useState({password: ''});
    const [activeMenu, setActiveMenu] = useState(0);

    const itemMenuHandler = (index) => {
        setActiveMenu(index);
    }

    useEffect(() => {
        let field = {};
        option?.fields?.forEach(item => {
            field[item.value] = data ? data[item.value] : cloneDeep(item.default);
        });
        setValue(field);
        if (optionQuestionnaire) {
            let fieldQuestionnaire = {};
            optionQuestionnaire?.fields?.forEach(item => {
                fieldQuestionnaire[item.value] = data?.questionnaire ? data.questionnaire[item.value] : item.default;
            });
            setQuestionnaire(fieldQuestionnaire);
        }
        if (optionPassword) {
            setPassword({password: data.password});
        }
    }, [option, popupForm.isOpen]);

    const changeRoot = (data) => {
        let new_data = {...value};
        new_data[data.name] = data.value;
        setValue(new_data);
    }

    const changeQuestionnaire = (data) => {
        let new_data = {...questionnaire};
        new_data[data.name] = data.value;
        setQuestionnaire(new_data);
    }

    const changePassword = (data) => {
        let new_data = {...password};
        new_data[data.name] = data.value;
        setPassword(new_data);
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
            const newData = await request(`/api/admin_panel${option?.url}`, 'POST',
                {data: value, _id: data?._id, password: optionPassword ? password.password : null, questionnaire: optionQuestionnaire ? questionnaire : null},
                {
                    Authorization: `${auth.token}`
                }
            );
            setPopupOk(data ? 'Изменения сохранены.' : 'Добавлено.');
            reload(0, "null");
            if (!data) {
                popupForm.openHandler(<Form
                    data={newData}
                    option={optionEdit}
                    reload={reload}
                />)
                // setNewData(newData);
            }
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
        if (item.type === 'inputarrea_translation') return <FieldTextTranslation label={item.label} name={item.value} change={change} value={value[item.value]} languages={optionLanguages} />;
        if (item.type === 'img_translation') return <FieldFileTranslation label={item.label} name={item.value} change={change} value={value[item.value]} languages={optionLanguages} />;
        if (item.type === 'input_translation') return <FieldInputTranslation label={item.label} name={item.value} change={change} value={value[item.value]} languages={optionLanguages} />;
        return null;
    }

    return (
        <div className={s.root_popup}>
            <div className={s.popup_header}>
                <div className={GlobalStyle.BellotaFontRegular + ' ' + s.popup_label}>
                    Редактирование
                </div>
                {option.delete_url ? (
                    <div className={s.block_buttons}>
                    <div
                        className={s.popup_button_delete}
                        onClick={() => deleteHandler()}
                    >
                        <div className={GlobalStyle.CustomFontRegular + ' ' + s.popup_button_exit_text}>
                            Удалить
                        </div>
                    </div>
                    <div className={s.button_close} onClick={() => popupForm.exitHandler()}>
                        <GlobalSvgSelector id='close' />
                    </div>
                    </div>
                ) : (
                    <div className={s.button_close} onClick={() => popupForm.exitHandler()}>
                        <GlobalSvgSelector id='close' />
                    </div>
                )}
            </div>
            {optionQuestionnaire ? (
                <div className={s.liner_menu}>
                    {["Информация", "Анкет", "Пароль"].map((item, index) => (
                        <div
                            onClick={() => itemMenuHandler(index)}
                            className={s.liner_menu_item + (activeMenu === index ? (' ' + s.liner_menu_item_active): '')}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            ) : null}
            <Scrollbars style={{width: '100%', height: '60vh', marginTop: 18}}>
                <div className={s.items}>
                    {
                        activeMenu === 0 ? (
                            option?.fields?.map(item => {
                                return listField(item, changeRoot, value)
                            })
                        ) : (
                            activeMenu === 1 ? (
                                optionQuestionnaire?.fields?.map(item => {
                                    return listField(item, changeQuestionnaire, questionnaire)
                                })
                            ) : (
                                optionPassword?.fields?.map(item => {
                                    return listField(item, changePassword, password)
                                })
                            )
                        )
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
                            {data ? "Сохранить" : "Добавить"}
                        </div>
                    )}
                </div>
                {/*<div className={s.blcok_buttons}>*/}
                {/*<div*/}
                {/*    className={s.popup_button_delete}*/}
                {/*    onClick={() => popupForm.exitHandler()}*/}
                {/*>*/}
                {/*    <div className={GlobalStyle.CustomFontRegular + ' ' + s.popup_button_exit_text}>*/}
                {/*        Удалить*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div
                    className={s.popup_button_exit}
                    onClick={() => popupForm.exitHandler()}
                >
                    <div className={GlobalStyle.CustomFontRegular + ' ' + s.popup_button_exit_text}>
                        Отмена
                    </div>
                </div>
                {/*</div>*/}
            </div>
        </div>
    );
}
