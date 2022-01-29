import GlobalStyle from "../GlobalStyle.module.scss";
import s from "../tableCard/Form.module.scss";
import React from "react";

export const FieldInput = ({label, name, change, value}) => {
    return (
        <>
            <div className={GlobalStyle.CustomFontRegular + ' ' + s.placeholder}>
                {label}
            </div>
            <input
                value={value}
                type="email"
                className={s.input}
                onChange={(value) => change({name, value: value.target.value})}
            />
        </>
    )
}
