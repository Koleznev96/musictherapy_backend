import s from "../tableCard/Form.module.scss";
import React from "react";
import {listField, optionLanguages} from "../../constants/OptionsTable";

export const FieldDoubleFields = ({fields, change, value}) => {
    return (
        <div className={s.wrapper_full}>
            <div className={s.block_field}>
                {listField({item: fields[0], change: change, value: value, optionLanguages: optionLanguages, st: true})}
            </div>
            <div className={s.block_field}>
                {listField({item: fields[1], change: change, value: value, optionLanguages: optionLanguages, st: true})}
            </div>
        </div>
    )
}
