import React from "react";
import s from "./PushInfo.module.scss";
import { GlobalSvgSelector } from "../../assets/icons/global/GlobalSvgSelector";
import GlobalStyle from "../GlobalStyle.module.scss";
import { usePopupForm } from "../../hooks/usePopupForm";
import { checkLanguageConst } from "../../hooks/translashion";

export const PushInfo = ({ value, translations }) => {
    const popupForm = usePopupForm();

    return (
        <div className={s.root_popup}>
            <div className={s.popup_header}>
                <div
                    className={
                        GlobalStyle.BellotaFontRegular + " " + s.popup_label
                    }
                >
                    {checkLanguageConst("Information", translations)}
                </div>
                <div
                    className={s.button_close}
                    onClick={() => popupForm.exitHandler()}
                >
                    <GlobalSvgSelector id="close" />
                </div>
            </div>

            <div
                className={GlobalStyle.CustomFontRegular + " " + s.popup_value}
            >
                {checkLanguageConst(value, translations)}
            </div>

            <div className={s.blcok_buttons}>
                <div
                    className={s.popup_button_ok}
                    onClick={() => popupForm.exitHandler()}
                >
                    <div
                        className={
                            GlobalStyle.CustomFontRegular +
                            " " +
                            s.popup_button_ok_text
                        }
                    >
                        {checkLanguageConst("Ok", translations)}
                    </div>
                </div>
            </div>
        </div>
    );
};
