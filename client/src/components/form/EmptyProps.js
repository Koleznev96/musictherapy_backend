import React from "react";
import {listField, optionLanguages} from "../../constants/OptionsTable";


export const EmptyProps = ({name, change, value, additional_functionality, id_data, st, translations, lang}) => {
    const changeRoot = (value_new) => {
        change({name, value: {...value, [value_new.name]: value_new.value}});
    }
    return (
        <>
            {additional_functionality?.map((item, index) => {
                return listField({lang, translations, item: item, change: changeRoot, value: value ? value : {}, optionLanguages: optionLanguages, id_data, st})
            })}
        </>
    )

}
