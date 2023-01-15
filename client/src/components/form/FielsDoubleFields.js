import s from "../tableCard/Form.module.scss";
import React from "react";
import { listField } from "../../constants/OptionsTable";

export const FieldDoubleFields = ({
    fields,
    change,
    value,
    translations,
    lang,
    languages,
}) => {
    return (
        <div className={s.wrapper_full}>
            <div className={s.block_field}>
                {listField({
                    lang,
                    translations,
                    item: fields[0],
                    change: change,
                    value: value,
                    optionLanguages: languages,
                    st: true,
                })}
            </div>
            <div className={s.block_field}>
                {listField({
                    lang,
                    translations,
                    item: fields[1],
                    change: change,
                    value: value,
                    optionLanguages: languages,
                    st: true,
                })}
            </div>
        </div>
    );
};
