import GlobalStyle from "../GlobalStyle.module.scss";
import s from "../tableCard/Form.module.scss";
import React from "react";
import {checkLanguageConst} from "../../hooks/translashion";

export const FieldInput = ({label, name, change, value, translations}) => {
    return (
        <div className={s.jin}>
            <div className={GlobalStyle.CustomFontRegular + ' ' + s.placeholder}>
                {checkLanguageConst(label, translations)}
            </div>
            <input
                value={value}
                type="email"
                className={s.input}
                onChange={(value) => change({name, value: value.target.value})}
            />
        </div>
    )
}
