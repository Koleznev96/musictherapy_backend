import GlobalStyle from "../GlobalStyle.module.scss";
import s from "../tableCard/Form.module.scss";
import React from "react";
import { GlobalSvgSelector } from "../../assets/icons/global/GlobalSvgSelector";
import { checkLanguageConst } from "../../hooks/translashion";

export const Lengs = ({
    languages,
    translations,
    setItemMenu,
    itemMenu = 0,
}) => {
    const newLanguage = () => {
        let new_itemMenu = itemMenu + 1;
        if (new_itemMenu > languages.length - 1) {
            new_itemMenu = 0;
        }
        setItemMenu(languages[new_itemMenu].code);
    };

    return (
        <div className={s.box_translation}>
            <div
                className={s.wrapper_language_label}
                onClick={() => newLanguage()}
            >
                <div
                    className={
                        GlobalStyle.CustomFontRegular + " " + s.language_label
                    }
                >
                    {languages
                        ? checkLanguageConst(
                              languages[itemMenu].name,
                              translations
                          )
                        : ""}
                </div>
                <GlobalSvgSelector id="arrow_mini" />
            </div>
        </div>
    );
};
