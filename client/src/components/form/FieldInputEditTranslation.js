import GlobalStyle from "../GlobalStyle.module.scss";
import s from "../tableCard/Form.module.scss";
import React, {useEffect, useState} from "react";
import {GlobalSvgSelector} from "../../assets/icons/global/GlobalSvgSelector";
import MDEditor from '@uiw/react-md-editor';
import MarkdownEditor from '@uiw/react-markdown-editor';
import {checkLanguageConst} from "../../hooks/translashion";

export const FieldInputEditTranslation = ({label, name, change, value, languages, translation, translations}) => {
    const [boxField, setBoxField] = useState(translation ? [{language: 'ru', value: ''}, {language: 'com', value: ''}] : '');
    const [itemMenu, setItemMenu] = useState(0);

    useEffect(() => {
        if (value && value.length > 0) {
            setBoxField(value);
        } else {
            setBoxField(translation ? [{language: 'ru', value: ''}, {language: 'com', value: ''}] : '');
        }
    }, [value]);

    const newLanguage = () => {
        setItemMenu(itemMenu === 0 ? 1 : 0);
    }

    const editFiled = (value) => {
        if (translation) {
            let new_boxField = boxField;
            new_boxField[itemMenu].value = value;
            change({name, value: new_boxField});
        } else {
            change({name, value});
        }
    }

    return (
        <div className={s.jin}>
            <div className={s.wrpper_field_header}>
                <div className={GlobalStyle.CustomFontRegular + ' ' + s.placeholder}>
                    {checkLanguageConst(label, translations)}
                </div>
                {translation ? (
                <div className={s.box_translation}>
                    <div className={s.wrapper_language_label} onClick={() => newLanguage()}>
                        <div className={GlobalStyle.CustomFontRegular + ' ' + s.language_label}>
                            {checkLanguageConst(languages[itemMenu].label, translations)}
                        </div>
                        <GlobalSvgSelector id="arrow_mini" />
                    </div>
                </div>
                ): null}
            </div>
            <MDEditor
                value={translation ? boxField[itemMenu]?.value : boxField}
                onChange={editFiled}
                preview={'edit'}
                className={s.markdown}
                height={220}
            />
        </div>
    )
}
