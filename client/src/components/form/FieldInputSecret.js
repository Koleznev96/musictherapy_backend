import GlobalStyle from "../GlobalStyle.module.scss";
import s from "../tableCard/Form.module.scss";
import React from "react";
import { checkLanguageConst } from "../../hooks/translashion";

export const FieldInputSecret = ({
    label,
    name,
    change,
    value,
    translations,
}) => {
    const [status, setStatus] = React.useState(false);

    return (
        <div className={s.jin}>
            <div
                className={GlobalStyle.CustomFontRegular + " " + s.placeholder}
            >
                {checkLanguageConst(label, translations)}
            </div>
            <input
                value={status ? value : "***"}
                type="email"
                className={s.input}
                onChange={(value) => {
                    change({ name, value: value.target.value });
                }}
                onClick={() => {
                    if (status) {
                        change({ name, value: "" });
                        setStatus(true);
                    }
                }}
            />
        </div>
    );
};
