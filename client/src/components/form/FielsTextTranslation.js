import GlobalStyle from "../GlobalStyle.module.scss";
import s from "../tableCard/Form.module.scss";
import React, {useEffect, useState} from "react";
import {GlobalSvgSelector} from "../../assets/icons/global/GlobalSvgSelector";
import {checkLanguageConst} from "../../hooks/translashion";

export const FieldTextTranslation = ({label, name, change, value, languages, translations}) => {
    const [boxField, setBoxField] = useState([{language: 'ru', value: ''}, {language: 'com', value: ''}]);
    const [itemMenu, setItemMenu] = useState(0);
    // const [status, setStatus] = useState(false);

    useEffect(() => {
        if (value && value.length > 0) {
            setBoxField(value);
        } else {
            setBoxField([{language: 'ru', value: ''}, {language: 'com', value: ''}]);
        }
    }, [value]);

    const newLanguage = () => {
        setItemMenu(itemMenu === 0 ? 1 : 0);
    }

    const editFiled = (value) => {
        let new_boxField = boxField;
        new_boxField[itemMenu].value = value;
        change({name, value: new_boxField});
    }

    return (
        <>
            <div className={s.wrpper_field_header}>
                <div className={GlobalStyle.CustomFontRegular + ' ' + s.placeholder}>
                    {checkLanguageConst(label, translations)}
                </div>
                <div className={s.box_translation}>
                    <div className={s.wrapper_language_label} onClick={() => newLanguage()}>
                        <div className={GlobalStyle.CustomFontRegular + ' ' + s.language_label}>
                            {checkLanguageConst(languages[itemMenu].label, translations)}
                        </div>
                        <GlobalSvgSelector id="arrow_mini" />
                    </div>
                </div>
            </div>
            <textarea
                rows="10"
                cols="45"
                value={boxField[itemMenu]?.value}
                className={s.inputarrea}
                onChange={(value) => editFiled(value.target.value)}
            />
        </>
    )
}
