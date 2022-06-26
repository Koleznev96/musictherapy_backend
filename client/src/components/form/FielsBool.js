import GlobalStyle from "../GlobalStyle.module.scss";
import s from "../tableCard/Form.module.scss";
import React, {useEffect, useState} from "react";

export const FieldBool = ({label, name, change, value, list_value, st}) => {
    const [statusField, setStatusField] = useState(null);

    useEffect(() => {
        if (value && value.toString().length > 0) {
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
                {st ? (
                    <div className={s.root_click_}>
                        {list_value?.map((item, index) => (
                            <div key={index} className={s.button_input} onClick={() => clickHandler(item.value)}>
                                <div className={statusField === item.value ? s.clip_active : s.clip}/>
                                <div className={s.clip_text}>
                                    {item.label}
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
                                    {item.label}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={s.root_click}>
                        {list_value?.slice(((list_value.length % 2) === 0 && list_value.length !== 2) ? (list_value.length/2) : (list_value.length/2 + 1), list_value.length).map((item, index) => (
                            <div key={index} className={s.button_input} onClick={() => clickHandler(item.value)}>
                                <div className={statusField === item.value ? s.clip_active : s.clip}/>
                                <div className={s.clip_text}>
                                    {item.label}
                                </div>
                            </div>
                        ))}
                    </div>
                    </>
                )}
            </div>
        </>
    )
}
