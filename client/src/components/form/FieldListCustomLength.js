import GlobalStyle from "../GlobalStyle.module.scss";
import s from "../tableCard/Form.module.scss";
import React, { useEffect, useState } from "react";
import { GlobalSvgSelector } from "../../assets/icons/global/GlobalSvgSelector";
import cloneDeep from "lodash/cloneDeep";
import { FieldInput } from "./FielsInput";
import { checkLanguageConst } from "../../hooks/translashion";
import { Lengs } from "./Lengs";
import { FieldSelectList } from "./FieldSelectList";

export const FieldListCustomLength = ({
    label,
    name,
    change,
    value,
    languages,
    add_data,
    title_add,
    translations,
    lang,
    fields,
}) => {
    const [field, setField] = useState([]);

    useEffect(() => {
        if (value && value.length > 0) {
            setField(value);
        } else {
            setField([]);
        }
    }, [value]);

    const changeRoot = (value) => {
        change({ name, value });
    };

    const editValue = (value, index) => {
        let new_data = [...field];
        new_data[index] = value;
        changeRoot(new_data);
    };

    const addData = () => {
        let new_data = [...field];
        new_data.push(cloneDeep(add_data));
        changeRoot(new_data);
    };

    const deleteHandler = (index) => {
        let new_data = [...field];
        new_data.splice(index, 1);
        change({ name, value: new_data });
    };

    return (
        <>
            {field?.map((item, index) => (
                <>
                    <div className={s.wrapper_st_s}>
                        <FieldSelectList
                            label={label}
                            name="name"
                            change={(value) => editValue(value, index)}
                            value={item}
                            url_get_data={fields[0].url_get_data}
                            url_get_selected={fields[0].url_get_selected}
                            translations={translations}
                            valueIn={fields[0].valueIn}
                            labelIn={fields[0].labelIn}
                            leng={lang}
                        />
                        <div
                            className={s.button_delet_}
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteHandler(index);
                            }}
                        >
                            <GlobalSvgSelector id="clear" />
                        </div>
                    </div>
                </>
            ))}
            <div
                onClick={() => addData()}
                className={
                    GlobalStyle.CustomFontRegular + " " + s.button_add_function
                }
            >
                {checkLanguageConst(title_add, translations)}
            </div>
        </>
    );
};
