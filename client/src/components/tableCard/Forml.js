import React, { useContext, useEffect, useState } from "react";
import s from "./Form.module.scss";
import { GlobalSvgSelector } from "../../assets/icons/global/GlobalSvgSelector";
import GlobalStyle from "../GlobalStyle.module.scss";
import { usePopupForm } from "../../hooks/usePopupForm";
import { AuthContext } from "../../context/authContext";
import ClipLoader from "react-spinners/ClipLoader";
import { ColorsStyles } from "../../constants/ColorsStyles";
import { useHttp } from "../../hooks/http.hook";
import { PushInfo } from "../pushInfo/PushInfo";
import Scrollbars from "react-custom-scrollbars-2";
import {
    listField,
    optionCustomAccess,
    optionLanguages,
} from "../../constants/OptionsTable";
import cloneDeep from "lodash/cloneDeep";
import { checkLanguageConst } from "../../hooks/translashion";

export const Form = ({
    data,
    option,
    reload,
    optionQuestionnaire,
    optionPassword,
    optionEdit,
    optionSettings,
    wigth_panel,
}) => {
    const popupForm = usePopupForm();
    const auth = useContext(AuthContext);
    const { request, error, clearError, loading } = useHttp();
    const [popupError, setPopupError] = useState("");
    const [popupOk, setPopupOk] = useState("");
    const [value, setValue] = useState({});
    const [questionnaire, setQuestionnaire] = useState({});
    const [password, setPassword] = useState({ password: "" });
    const [settings, setSettings] = useState({});
    const [activeMenu, setActiveMenu] = useState(0);
    const [isCustomAccess, setIsCustomAccess] = useState(false);
    const [new_option, setNew_option] = useState(option);

    const itemMenuHandler = (index) => {
        setActiveMenu(index);
    };

    useEffect(() => {
        let f_option = cloneDeep(option);
        if (data && data.access && data.access?.indexOf("custom") !== -1) {
            f_option.fields[0].labels.push("TabAccess");
            f_option.fields[0].list_menu_fields.push(optionCustomAccess);
            setIsCustomAccess(true);
        }
        setNew_option(f_option);
    }, [option]);

    useEffect(() => {
        let field = {};
        field.custom_access = data ? data.custom_access : [];
        option?.fields?.forEach((item) => {
            if (item.type === "list_menu") {
                item?.list_menu_fields?.forEach((item_menu) => {
                    item_menu?.forEach((element) => {
                        if (element.type === "double_fields") {
                            field[element.fields[0].value] = data
                                ? data[element.fields[0].value]
                                : cloneDeep(element.fields[0].default);
                            field[element.fields[1].value] = data
                                ? data[element.fields[1].value]
                                : cloneDeep(element.fields[1].default);
                        } else
                            field[element.value] = data
                                ? data[element.value]
                                : cloneDeep(element.default);
                    });
                });
                // field[item.fields[0].value] = data ? data[item.fields[0].value] : cloneDeep(item.fields[0].default);
                // field[item.fields[1].value] = data ? data[item.fields[1].value] : cloneDeep(item.fields[1].default);
            } else if (item.type === "double_fields") {
                field[item.fields[0].value] = data
                    ? data[item.fields[0].value]
                    : cloneDeep(item.fields[0].default);
                field[item.fields[1].value] = data
                    ? data[item.fields[1].value]
                    : cloneDeep(item.fields[1].default);
            } else
                field[item.value] = data
                    ? data[item.value]
                    : cloneDeep(item.default);
        });
        setValue(field);
        if (optionQuestionnaire) {
            let fieldQuestionnaire = {};
            optionQuestionnaire?.fields?.forEach((item) => {
                fieldQuestionnaire[item.value] = data?.questionnaire
                    ? data?.questionnaire[item.value]
                    : item.default;
            });
            setQuestionnaire(fieldQuestionnaire);
        }
        if (optionPassword) {
            setPassword({ password: data?.password ? data.password : "" });
        }
        if (optionSettings) {
            let fieldSettings = {};
            optionSettings?.fields?.forEach((item) => {
                fieldSettings[item.value] = data
                    ? data[item.value]
                    : cloneDeep(item.default);
            });
            setSettings(fieldSettings);
        }
    }, [option, popupForm.isOpen]);

    const changeRoot = (data) => {
        if (data.name === "access") {
            let f_option = cloneDeep(new_option);
            if (
                data.value &&
                data.value.length &&
                data.value.indexOf("custom") !== -1
            ) {
                f_option.fields[0].labels.push("TabAccess");
                f_option.fields[0].list_menu_fields.push(optionCustomAccess);
                setNew_option(f_option);
                setIsCustomAccess(true);
            } else {
                if (isCustomAccess) {
                    f_option.fields[0].labels.pop();
                    f_option.fields[0].list_menu_fields.pop();
                    setNew_option(f_option);
                    setIsCustomAccess(false);
                }
            }
        }
        let new_data = { ...value };
        new_data[data.name] = data.value;
        setValue(new_data);
    };

    const changeQuestionnaire = (data) => {
        let new_data = { ...questionnaire };
        new_data[data.name] = data.value;
        setQuestionnaire(new_data);
    };

    const changeSettings = (data) => {
        let new_data = { ...settings };
        new_data[data.name] = data.value;
        setSettings(new_data);
    };

    const changePassword = (data) => {
        let new_data = { ...password };
        new_data[data.name] = data.value;
        setPassword(new_data);
    };

    const clearErrorPopup = () => {
        setPopupError("");
        setPopupOk("");
    };

    useEffect(() => {
        clearErrorPopup();
    }, [popupForm.isOpen]);

    const saveHandler = async () => {
        clearErrorPopup();
        try {
            const newData = await request(
                `/api/admin_panel${option?.url}`,
                "POST",
                {
                    data: value,
                    _id: data?._id,
                    password: optionPassword ? password.password : null,
                    questionnaire: optionQuestionnaire ? questionnaire : null,
                    settings: optionSettings ? settings : null,
                },
                {
                    Authorization: `${auth.token}`,
                }
            );
            setPopupOk(data ? "ChangesSaved" : "Added");
            reload(0, "null");
            if (!data) {
                popupForm.openHandler(
                    <Form data={newData} option={optionEdit} reload={reload} />
                );
            }
        } catch (e) {
            setPopupError(data ? "Error" : "ErrorFields");
        }
    };

    const deleteHandler = async () => {
        clearErrorPopup();
        try {
            await request(
                `/api/admin_panel${option?.delete_url}`,
                "POST",
                { _id: data?._id },
                {
                    Authorization: `${auth.token}`,
                }
            );
            popupForm.exitHandler();
            popupForm.openHandler(
                <PushInfo
                    value={"EntryDeleted"}
                    translations={auth.translations}
                />
            );
            reload(0, "null");
        } catch (e) {
            setPopupError(data ? "Error" : "Error");
        }
    };

    return (
        <div style={{ width: wigth_panel ? wigth_panel : 400 }}>
            <div className={s.popup_header}>
                <div
                    className={
                        GlobalStyle.BellotaFontRegular + " " + s.popup_label
                    }
                >
                    {checkLanguageConst("Editing", auth.translations)}
                </div>
                {option.delete_url ? (
                    <div className={s.block_buttons}>
                        <div
                            className={s.popup_button_delete}
                            onClick={() => deleteHandler()}
                        >
                            <div
                                className={
                                    GlobalStyle.CustomFontRegular +
                                    " " +
                                    s.popup_button_exit_text
                                }
                            >
                                {checkLanguageConst(
                                    "Delete",
                                    auth.translations
                                )}
                            </div>
                        </div>
                        <div
                            className={s.button_close}
                            onClick={() => popupForm.exitHandler()}
                        >
                            <GlobalSvgSelector id="close" />
                        </div>
                    </div>
                ) : (
                    <div
                        className={s.button_close}
                        onClick={() => popupForm.exitHandler()}
                    >
                        <GlobalSvgSelector id="close" />
                    </div>
                )}
            </div>
            {optionQuestionnaire ? (
                <div className={s.liner_menu}>
                    {["UserTab1", "UserTab2", "UserTab3", "UserTab4"].map(
                        (item, index) => (
                            <div
                                onClick={() => itemMenuHandler(index)}
                                className={
                                    s.liner_menu_item +
                                    (activeMenu === index
                                        ? " " + s.liner_menu_item_active
                                        : "")
                                }
                            >
                                {checkLanguageConst(item, auth.translations)}
                            </div>
                        )
                    )}
                </div>
            ) : null}
            <Scrollbars
                renderThumbVertical={({ style, ...props }) => (
                    <div
                        {...props}
                        className={s.scrollThumbVertical}
                        style={{
                            ...style,
                            width: "6px",
                            borderRadius: "4px",
                            boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.16)",
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                        }}
                    />
                )}
                style={{ width: "100%", height: "60vh", marginTop: 18 }}
            >
                <div className={s.items}>
                    {activeMenu === 0 &&
                        new_option?.fields?.map((item) => {
                            return listField({
                                lang: auth.language,
                                translations: auth.translations,
                                item: item,
                                change: changeRoot,
                                value: value,
                                optionLanguages: auth.languages_list,
                                id_data: data?._id,
                            });
                        })}
                    {activeMenu === 1 &&
                        optionQuestionnaire?.fields?.map((item) => {
                            return listField({
                                lang: auth.language,
                                translations: auth.translations,
                                item: item,
                                change: changeQuestionnaire,
                                value: questionnaire,
                                optionLanguages: auth.languages_list,
                            });
                        })}
                    {activeMenu === 2 &&
                        optionPassword?.fields?.map((item) => {
                            return listField({
                                lang: auth.language,
                                translations: auth.translations,
                                item: item,
                                change: changePassword,
                                value: password,
                                optionLanguages: auth.languages_list,
                            });
                        })}
                    {activeMenu === 3 &&
                        optionSettings?.fields?.map((item) => {
                            return listField({
                                lang: auth.language,
                                translations: auth.translations,
                                item: item,
                                change: changeSettings,
                                value: settings,
                                optionLanguages: auth.languages_list,
                            });
                        })}
                </div>
            </Scrollbars>
            <div
                className={
                    GlobalStyle.CustomFontRegular +
                    " " +
                    (popupOk.length !== 0 ? s.popup_ok : s.popup_error)
                }
            >
                {checkLanguageConst(popupOk || popupError, auth.translations)}
            </div>
            <div className={s.popup_liner_button}>
                <div
                    className={s.popup_button_ok}
                    onClick={() => saveHandler()}
                >
                    {loading ? (
                        <div className={s.popup_button_ok_loader}>
                            <ClipLoader
                                color={ColorsStyles.colorTextError}
                                loading={true}
                                css={s.loader}
                                size={32}
                            />
                        </div>
                    ) : (
                        <div
                            className={
                                GlobalStyle.CustomFontRegular +
                                " " +
                                s.popup_button_ok_text
                            }
                        >
                            {checkLanguageConst(
                                data ? "Save" : "Add",
                                auth.translations
                            )}
                        </div>
                    )}
                </div>
                <div
                    className={s.popup_button_exit}
                    onClick={() => popupForm.exitHandler()}
                >
                    <div
                        className={
                            GlobalStyle.CustomFontRegular +
                            " " +
                            s.popup_button_exit_text
                        }
                    >
                        {checkLanguageConst("Cancel", auth.translations)}
                    </div>
                </div>
            </div>
        </div>
    );
};
