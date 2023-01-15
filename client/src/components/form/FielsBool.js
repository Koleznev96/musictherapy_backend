import GlobalStyle from "../GlobalStyle.module.scss";
import s from "../tableCard/Form.module.scss";
import React, {useEffect, useState} from "react";
import {checkLanguageConst} from "../../hooks/translashion";

export const FieldBool = ({label, name, change, value, list_value, st, translations}) => {
    const [statusField, setStatusField] = useState(null);

    useEffect(() => {
        if ((typeof value !== "boolean" && value && value.toString().length > 0) || value === true || value === false) {
            setStatusField(value);
        }
    }, [value]);

    const clickHandler = (data) => {
        change({name, value: data});
    }

    return (
        <div className={s.jin}>
            <div className={GlobalStyle.CustomFontRegular + ' ' + s.placeholder}>
                {checkLanguageConst(label, translations)}
            </div>
            <div className={s.wrapper_bool}>
                {st ? (
                    <div className={s.root_click_}>
                        {list_value?.map((item, index) => (
                            <div key={index} className={s.button_input} onClick={() => clickHandler(item.value)}>
                                <div className={statusField === item.value ? s.clip_active : s.clip}/>
                                <div className={s.clip_text}>
                                    {checkLanguageConst(item.label, translations)}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                    <div className={s.root_click}>
                        {list_value?.slice(0, ((list_value.length % 2) === 0 && list_value.length !== 2) ? (list_value.length/2) : (list_value.length/2 + 1)).map((item, index) => (
                            <div key={index} className={s.button_input} onClick={() => clickHandler(item.value)}>
                                <div className={statusField === item.value ? s.clip_active : s.clip}/>
                                <div className={s.clip_text}>
                                    {checkLanguageConst(item.label, translations)}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={s.root_click}>
                        {list_value?.slice(((list_value.length % 2) === 0 && list_value.length !== 2) ? (list_value.length/2) : (list_value.length/2 + 1), list_value.length).map((item, index) => (
                            <div key={index} className={s.button_input} onClick={() => clickHandler(item.value)}>
                                <div className={statusField === item.value ? s.clip_active : s.clip}/>
                                <div className={s.clip_text}>
                                    {checkLanguageConst(item.label, translations)}
                                </div>
                            </div>
                        ))}
                    </div>
                    </>
                )}
            </div>
        </div>
    )
}
