import GlobalStyle from "../GlobalStyle.module.scss";
import s from "../tableCard/Form.module.scss";
import React, { useEffect, useState } from "react";
import { GlobalSvgSelector } from "../../assets/icons/global/GlobalSvgSelector";
import MDEditor from "@uiw/react-md-editor";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { checkLanguageConst } from "../../hooks/translashion";
import { Lengs } from "./Lengs";

export const FieldInputEditTranslation = ({
    label,
    name,
    change,
    value,
    languages,
    translation,
    translations,
    lang,
}) => {
    const [boxField, setBoxField] = useState(
        translation
            ? languages?.map((item) => ({ language: item.code, value: "" }))
            : ""
    );
    const [itemMenu, setItemMenu] = useState(lang);

    useEffect(() => {
        if (value && value.length > 0) {
            setBoxField(value);
        } else {
            setBoxField(
                translation
                    ? languages?.map((item) => ({
                          language: item.code,
                          value: "",
                      }))
                    : ""
            );
        }
    }, [value]);

    const editFiled = (value) => {
        if (translation) {
            let new_boxField = boxField;
            const index_l = new_boxField.findIndex(
                (item) => item.language === itemMenu
            );
            if (index_l === -1) {
                new_boxField.push({
                    language: itemMenu,
                    value,
                });
            } else {
                new_boxField[index_l].value = value;
            }
            change({ name, value: new_boxField });
        } else {
            change({ name, value });
        }
    };

    return (
        <div className={s.jinl}>
            <div className={s.wrpper_field_header}>
                <div
                    className={
                        GlobalStyle.CustomFontRegular + " " + s.placeholder
                    }
                >
                    {checkLanguageConst(label, translations)}
                </div>
                {translation ? (
                    <Lengs
                        languages={languages}
                        translations={translations}
                        setItemMenu={setItemMenu}
                        itemMenu={languages.findIndex(
                            (item) => item.code === itemMenu
                        )}
                    />
                ) : null}
            </div>
            <MDEditor
                value={
                    translation
                        ? boxField?.find((item) => item.language === itemMenu)
                            ? boxField?.find(
                                  (item) => item.language === itemMenu
                              ).value
                            : ""
                        : boxField
                }
                onChange={editFiled}
                preview={"edit"}
                className={s.markdown}
                height={220}
            />
        </div>
    );
};
