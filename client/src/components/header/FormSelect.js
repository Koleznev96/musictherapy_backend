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

export const FormSelect = ({
    title,
    data,
    value_code,
    label_code,
    select_handler,
    selectedValue,
}) => {
    const popupForm = usePopupForm();
    const auth = useContext(AuthContext);
    const { request, error, clearError, loading } = useHttp();
    const [popupError, setPopupError] = useState("");
    const [popupOk, setPopupOk] = useState("");
    const [value, setValue] = useState(selectedValue);

    const saveHandler = () => {
        select_handler(value);
        popupForm.exitHandler();
    };

    const clickHandler = (value) => {
        setValue(value[value_code]);
    };

    return (
        <div className={s.root_popup}>
            <div className={s.popup_header}>
                <div
                    className={
                        GlobalStyle.BellotaFontRegular + " " + s.popup_label
                    }
                >
                    {checkLanguageConst(title, auth.translations)}
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
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className={s.button_input}
                            onClick={() => clickHandler(item)}
                        >
                            <div
                                className={
                                    value === item[value_code]
                                        ? s.clip_active
                                        : s.clip
                                }
                            />
                            <div className={s.clip_text}>
                                {checkLanguageConst(
                                    item[label_code],
                                    auth.translations
                                )}
                            </div>
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
