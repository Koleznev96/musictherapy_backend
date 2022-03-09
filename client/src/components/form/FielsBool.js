import GlobalStyle from "../GlobalStyle.module.scss";
import s from "../tableCard/Form.module.scss";
import React, {useEffect, useState} from "react";

export const FieldBool = ({label, name, change, value, list_value}) => {
    const [statusField, setStatusField] = useState('classic');

    useEffect(() => {
        if (value && value.length > 0) {
            setStatusField(value);
        }
    }, [value]);

    const clickHandler = (data) => {
        change({name, value: data});
    }

    return (
        <>
            <div className={GlobalStyle.CustomFontRegular + ' ' + s.placeholder}>
                {label}
            </div>
            <div className={s.wrapper_bool}>
            <div className={s.root_click}>
                {list_value?.slice(0, list_value.length/2 + 1).map((item, index) => (
                    <div className={s.button_input} onClick={() => clickHandler(item.value)}>
                        <div className={statusField === item.value ? s.clip_active : s.clip}/>
                        <div className={s.clip_text}>
                            {item.label}
                        </div>
                    </div>
                ))}
            </div>
            <div className={s.root_click}>
                {list_value?.slice(list_value.length/2 + 1, list_value.length).map((item, index) => (
                    <div className={s.button_input} onClick={() => clickHandler(item.value)}>
                        <div className={statusField === item.value ? s.clip_active : s.clip}/>
                        <div className={s.clip_text}>
                            {item.label}
                        </div>
                    </div>
                ))}
            </div>
            </div>
        </>
    )
}
