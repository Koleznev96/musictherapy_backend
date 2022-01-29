import GlobalStyle from "../GlobalStyle.module.scss";
import s from "../tableCard/Form.module.scss";
import React from "react";

export const FieldText = ({label, name, change, value}) => {
    return (
        <>
            <div className={GlobalStyle.CustomFontRegular + ' ' + s.placeholder}>
                {label}
            </div>
            <textarea
                rows="10"
                cols="45"
                value={value}
                className={s.inputarrea}
                onChange={(value) => change({name, value: value.target.value})}
            />
        </>
    )
}
