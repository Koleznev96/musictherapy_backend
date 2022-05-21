import GlobalStyle from "../GlobalStyle.module.scss";
import s from "../tableCard/Form.module.scss";
import React, {useEffect, useState} from "react";
import {GlobalSvgSelector} from "../../assets/icons/global/GlobalSvgSelector";
import MDEditor from '@uiw/react-md-editor';
import MarkdownEditor from '@uiw/react-markdown-editor';

export const FieldInputEditTranslation = ({label, name, change, value, languages}) => {
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
                    {label}
                </div>
                <div className={s.box_translation}>
                    <div className={s.wrapper_language_label} onClick={() => newLanguage()}>
                        <div className={GlobalStyle.CustomFontRegular + ' ' + s.language_label}>
                            {languages[itemMenu].label}
                        </div>
                        <GlobalSvgSelector id="arrow_mini" />
                    </div>
                </div>
            </div>
            {/*<MDEditor*/}
            {/*    value={boxField[itemMenu]?.value}*/}
            {/*    onChange={editFiled}*/}
            {/*/>*/}


            <MDEditor
                value={boxField[itemMenu]?.value}
                onChange={editFiled}
                preview={'edit'}
                className={s.markdown}
                height={220}
            />


            {/*<MarkdownEditor*/}
            {/*    value={boxField[itemMenu]?.value}*/}
            {/*    onChange={(editor, data, value) => editFiled(value)}*/}
            {/*    height={200}*/}
            {/*    className={s.markdown}*/}
            {/*/>*/}


            {/*<input*/}
            {/*    value={boxField[itemMenu]?.value}*/}
            {/*    type="email"*/}
            {/*    className={s.input}*/}
            {/*    onChange={(value) => editFiled(value.target.value)}*/}
            {/*/>*/}
        </>
    )
}
