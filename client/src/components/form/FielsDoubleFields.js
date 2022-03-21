import GlobalStyle from "../GlobalStyle.module.scss";
import s from "../tableCard/Form.module.scss";
import React, {useEffect, useState} from "react";
import {FieldInput} from "./FielsInput";
import {FieldBool} from "./FielsBool";
import {FieldBox} from "./FielsBox";
import {FieldDate} from "./FielsDate";
import {FieldDateFull} from "./FielsDateFull";
import {FieldFile} from "./FielsFile";
import {FieldVideo} from "./FielsVideo";
import {FieldText} from "./FielsText";
import {FieldTextTranslation} from "./FielsTextTranslation";
import {optionLanguages} from "../../constants/OptionsTable";
import {FieldFileTranslation} from "./FielsFileTranslation";
import {FieldInputTranslation} from "./FielsInputTranslation";

export const FieldDoubleFields = ({fields, change, value}) => {
    const listField = (item, change, value) => {
        if (item.type === 'input') return <FieldInput label={item.label} name={item.value} change={change} value={value[item.value]} />;
        if (item.type === 'bool') return <FieldBool st={true} label={item.label} name={item.value} change={change} value={value[item.value]} list_value={item.list_value} />;
        if (item.type === 'box') return <FieldBox st={true} label={item.label} name={item.value} change={change} value={value[item.value]} list_value={item.list_value} />;
        if (item.type === 'date') return <FieldDate label={item.label} name={item.value} change={change} value={value[item.value]} />;
        if (item.type === 'date_full') return <FieldDateFull label={item.label} name={item.value} change={change} value={value[item.value]} />;
        if (item.type === 'img') return <FieldFile label={item.label} name={item.value} change={change} value={value[item.value]} />;
        if (item.type === 'video') return <FieldVideo label={item.label} name={item.value} change={change} value={value[item.value]} />;
        if (item.type === 'inputarrea') return <FieldText label={item.label} name={item.value} change={change} value={value[item.value]} />;
        if (item.type === 'inputarrea_translation') return <FieldTextTranslation label={item.label} name={item.value} change={change} value={value[item.value]} languages={optionLanguages} />;
        if (item.type === 'img_translation') return <FieldFileTranslation label={item.label} name={item.value} change={change} value={value[item.value]} languages={optionLanguages} />;
        if (item.type === 'input_translation') return <FieldInputTranslation label={item.label} name={item.value} change={change} value={value[item.value]} languages={optionLanguages} />;
        if (item.type === 'double_fields') return <FieldDoubleFields fields={item.fields} change={change} value={value} />;
        return null;
    }

    return (
        <div className={s.wrapper_full}>
            <div className={s.block_field}>
                {listField(fields[0], change, value)}
            </div>
            <div className={s.block_field}>
                {listField(fields[1], change, value)}
            </div>
        </div>
    )
}
