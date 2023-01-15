import GlobalStyle from "../GlobalStyle.module.scss";
import s from "../tableCard/Form.module.scss";
import React, { useEffect, useState } from "react";
import { GlobalSvgSelector } from "../../assets/icons/global/GlobalSvgSelector";
import { checkLanguageConst } from "../../hooks/translashion";
import { Lengs } from "./Lengs";

export const FieldInputTranslation = ({
    label,
    name,
    change,
    value,
    languages,
    translations,
    lang,
}) => {
    const [boxField, setBoxField] = useState(
        languages?.map((item) => ({ language: item.code, value: "" }))
    );
    const [itemMenu, setItemMenu] = useState(lang);

    useEffect(() => {
        if (value && value.length > 0) {
            setBoxField(value);
        } else {
            setBoxField(
                languages?.map((item) => ({ language: item.code, value: "" }))
            );
        }
    }, [value]);

    const editFiled = (value) => {
        let new_boxField = boxField;
        const index_l = new_boxField.findIndex(
            (item) => item.language === itemMenu
        );
        if (index_l === -1) {
            new_boxField.push({ language: itemMenu, value });
        } else {
            new_boxField[index_l].value = value;
        }
        change({ name, value: new_boxField });
    };

    return (
        <div className={s.jin}>
            <div className={s.wrpper_field_header}>
                <div
                    className={
                        GlobalStyle.CustomFontRegular + " " + s.placeholder
                    }
                >
                    {checkLanguageConst(label, translations)}
                </div>
                <Lengs
                    languages={languages}
                    translations={translations}
                    setItemMenu={setItemMenu}
                    itemMenu={languages.findIndex(
                        (item) => item.code === itemMenu
                    )}
                />
            </div>
            <input
                value={
                    boxField?.find((item) => item.language === itemMenu)
                        ? boxField?.find((item) => item.language === itemMenu)
                              .value
                        : ""
                }
                type="email"
                className={s.input}
                onChange={(value) => editFiled(value.target.value)}
            />
        </div>
    );
};
