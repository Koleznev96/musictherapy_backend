import React from "react";
import {listField, optionLanguages} from "../../constants/OptionsTable";


export const EmptyProps = ({name, change, value, additional_functionality, id_data, st, translations}) => {
    const changeRoot = (value) => {
        change({name, value: {[value.name]: value.value}});
    }
    return (
        <>
            {additional_functionality?.map((item, index) => {
                return listField({translations, item: item, change: changeRoot, value, optionLanguages: optionLanguages, id_data, st})
            })}
        </>
    )

}
