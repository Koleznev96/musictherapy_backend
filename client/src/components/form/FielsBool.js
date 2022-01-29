import GlobalStyle from "../GlobalStyle.module.scss";
import s from "../tableCard/Form.module.scss";
import React, {useEffect, useState} from "react";

export const FieldBool = ({label, name, change, value}) => {
    const [statusField, setStatusField] = useState(true);

    useEffect(() => {
        if (value && value.length > 0) {
            setStatusField(value === 'classic');
        } else {
            change({name, value: 'meditation'});
        }
    }, [value]);

    const clickHandler = (data) => {
        change({name, value: data ? 'classic' : 'meditation'});
    }

    return (
        <>
            <div className={GlobalStyle.CustomFontRegular + ' ' + s.placeholder}>
                {label}
            </div>
            <div className={s.root_click}>
                <div className={s.button_input} onClick={() => clickHandler(true)}>
                    <div className={statusField ? s.clip_active : s.clip}/>
                    <div className={s.clip_text}>
                        Классика HD
                    </div>
                </div>
                <div className={s.button_input} onClick={() => clickHandler(false)}>
                    <div className={statusField ? s.clip : s.clip_active}  />
                    <div className={s.clip_text}>
                        Медитация
                    </div>
                </div>
            </div>
        </>
    )
}
