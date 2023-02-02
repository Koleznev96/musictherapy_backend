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
import { httpServer } from "../../const";
import { listField, optionLanguages } from "../../constants/OptionsTable";
import { checkLanguageConst } from "../../hooks/translashion";

export const FormReTranslation = ({ option, status, fileName }) => {
    const popupForm = usePopupForm();
    const auth = useContext(AuthContext);
    const { request, error, clearError, loading } = useHttp();
    const [popupError, setPopupError] = useState("");
    const [popupOk, setPopupOk] = useState("");
    const [value, setValue] = useState([]);

    useEffect(() => {
        // let field = {};
        // option?.fields?.forEach(item => {
        //     field[item.value] = data ? data[item.value] : item.default;
        // });
        setValue(auth.languages_list);
    }, [auth.languages_list]);

    useEffect(() => {
        auth.get_list_lengs();
    }, []);

    const changeRoot = (_id, data) => {
        let new_data = [...value];
        let index = new_data.findIndex((item) => item._id === _id);
        new_data[index][data.name] = data.value;
        setValue(new_data);
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
            await request(
                `/api/admin_panel${option?.url}`,
                "POST",
                { data: value },
                {
                    Authorization: `${auth.token}`,
                }
            );
            setPopupOk("ChangesSaved");
        } catch (e) {
            setPopupError("Error");
        }
    };

    return (
        <div className={s.root_popup}>
            <div className={s.popup_header}>
                <div
                    className={
                        GlobalStyle.BellotaFontRegular + " " + s.popup_label
                    }
                >
                    {checkLanguageConst("Editing", auth.translations)}
                </div>
                <div
                    className={s.button_close}
                    onClick={() => popupForm.exitHandler()}
                >
                    <GlobalSvgSelector id="close" />
                </div>
            </div>
            <Scrollbars
                style={{ width: "100%", height: "60vh", marginTop: 18 }}
            >
                <div className={s.items}>
                    {status ? (
                        <a
                            className={s.button_upload}
                            href={
                                httpServer +
                                "/translations/" + fileName
                            }
                            target="_blank"
                        >
                            <div
                                className={
                                    GlobalStyle.CustomFontRegular +
                                    s.button_upload_text
                                }
                            >
                                {checkLanguageConst(
                                    "JsonTemplate",
                                    auth.translations
                                )}
                            </div>
                        </a>
                    ) : null}
                    {value?.map((item_data, index) => (
                        <div
                            key={index}
                            style={{
                                width: "100%",
                                marginTop: 16,
                            }}
                        >
                            <div
                                className={
                                    GlobalStyle.CustomFontRegular +
                                    " " +
                                    s.item_header_label
                                }
                            >
                                {item_data.name}
                            </div>
                            {option?.fields?.map((item) => {
                                return listField({
                                    lang: auth.language,
                                    translations: auth.translations,
                                    item: item,
                                    change: (data) =>
                                        changeRoot(item_data._id, data),
                                    value: value[index],
                                    optionLanguages: auth.languages_list,
                                });
                            })}
                        </div>
                    ))}
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
                            {checkLanguageConst("Save", auth.translations)}
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
