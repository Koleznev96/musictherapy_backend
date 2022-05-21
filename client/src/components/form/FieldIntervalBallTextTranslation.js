import GlobalStyle from "../GlobalStyle.module.scss";
import s from "../tableCard/Form.module.scss";
import React, {useEffect, useState} from "react";
import {GlobalSvgSelector} from "../../assets/icons/global/GlobalSvgSelector";
import cloneDeep from 'lodash/cloneDeep';


export const FieldIntervalBallTextTranslation = ({labels, name, change, value, languages, add_data, title_add}) => {
    const [field, setField] = useState([]);
    const [itemMenu, setItemMenu] = useState([]);

    useEffect(() => {
        if (value && value.length > 0) {
            setField(value);
            if (itemMenu.length === 0) {
                let new_menu = [];
                value.forEach(() => new_menu.push(0));
                setItemMenu(new_menu);
            }
        } else {
            setField([]);
        }
    }, [value]);

    const changeRoot = (value) => {
        change({name, value});
    }

    const newLanguage = (index) => {
        let new_menu = [...itemMenu];
        new_menu[index] = new_menu[index] === 0 ? 1 : 0;
        setItemMenu([...new_menu]);
    }

    const editText = (value, index) => {
        let new_data = [...field];
        new_data[index].description[itemMenu[index]].value = value;
        changeRoot(new_data);
    }

    const addData = () => {
        let new_data = [...field];
        new_data.push(cloneDeep(add_data));
        changeRoot(new_data);
        let new_menu = [...itemMenu];
        new_menu.push(0);
        setItemMenu([...new_menu]);
    }

    const deleteHandler = (index) => {
        let new_data = [...field];
        new_data.splice(index, 1);
        // changeRoot(new_data);
        let new_menu = [...itemMenu];
        new_menu.splice(index, 1);
        change({name, value: new_data});
        // setItemMenu([...new_menu]);
    }

    const editBall = (value, index, type) => {
        let new_data = [...field];
        new_data[index][type] = value;
        changeRoot(new_data);
    }

    return (
        <>
            {field?.map((item, index) => (
                <>
                <div className={s.wrapper_st}>
                    <div className={GlobalStyle.CustomFontRegular + ' ' + s.placeholder}>
                        {`${index + 1}. ${labels[0]}`}
                    </div>
                    <div
                        className={s.button_delet_}
                        onClick={(e) => {e.stopPropagation(); deleteHandler(index);}}
                    >
                        <GlobalSvgSelector id="clear" />
                    </div>
                </div>
                <div className={s.wrapper_st}>
                    <input
                        value={item.start_balls}
                        type="text"
                        className={s.input_set}
                        onChange={(value) => editBall(value.target.value, index, "start_balls")}
                    />
                    <div className={GlobalStyle.CustomFontRegular + ' ' + s.text_list}>
                        ——
                    </div>
                    <input
                        value={item.end_balls}
                        type="text"
                        className={s.input_set}
                        onChange={(value) => editBall(value.target.value, index, "end_balls")}
                    />
                </div>
                <div className={s.wrpper_field_header}>
                    <div className={GlobalStyle.CustomFontRegular + ' ' + s.placeholder}>
                        {labels[1]}
                    </div>
                    <div className={s.box_translation}>
                        <div className={s.wrapper_language_label} onClick={() => newLanguage(index)}>
                            <div className={GlobalStyle.CustomFontRegular + ' ' + s.language_label}>
                                {languages[itemMenu[index]].label}
                            </div>
                            <GlobalSvgSelector id="arrow_mini" />
                        </div>
                    </div>
                </div>
                <textarea
                    rows="10"
                    cols="45"
                    value={item.description[itemMenu[index]]?.value}
                    className={s.inputarrea}
                    onChange={(value) => editText(value.target.value, index)}
                />
                </>
            ))}
            <div
                onClick={() => addData()}
                className={GlobalStyle.CustomFontRegular + ' ' + s.button_add_function}
            >
                {title_add}
            </div>
        </>
    )
}
