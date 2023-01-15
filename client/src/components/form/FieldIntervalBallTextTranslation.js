import GlobalStyle from "../GlobalStyle.module.scss";
import s from "../tableCard/Form.module.scss";
import React, { useEffect, useState } from "react";
import { GlobalSvgSelector } from "../../assets/icons/global/GlobalSvgSelector";
import cloneDeep from "lodash/cloneDeep";
import { FieldInput } from "./FielsInput";
import { checkLanguageConst } from "../../hooks/translashion";
import { Lengs } from "./Lengs";

export const FieldIntervalBallTextTranslation = ({
    labels,
    name,
    change,
    value,
    languages,
    add_data,
    title_add,
    translations,
    lang,
}) => {
    const [field, setField] = useState([]);
    const [itemMenu, setItemMenu] = useState([]);

    useEffect(() => {
        if (value && value.length > 0) {
            setField(value);
            if (itemMenu.length === 0) {
                let new_menu = [];
                value.forEach(() => new_menu.push(lang));
                setItemMenu(new_menu);
            }
        } else {
            setField([]);
        }
    }, [value]);

    const changeRoot = (value) => {
        change({ name, value });
    };

    const new_set_Language = (index, setr) => {
        let new_menu = [...itemMenu];
        new_menu[index] = setr;
        setItemMenu([...new_menu]);
    };

    const editText = (value, index) => {
        let new_data = [...field];
        const index_l = new_data[index].description.findIndex(
            (item) => item.language === itemMenu[index]
        );
        if (index_l === -1) {
            new_data[index].description.push({
                language: itemMenu[index],
                value,
            });
        } else {
            new_data[index].description[index_l].value = value;
        }
        changeRoot(new_data);
    };

    const addData = () => {
        let new_data = [...field];
        new_data.push(cloneDeep(add_data));
        changeRoot(new_data);
        let new_menu = [...itemMenu];
        new_menu.push(lang);
        setItemMenu([...new_menu]);
    };

    const deleteHandler = (index) => {
        let new_data = [...field];
        new_data.splice(index, 1);
        // changeRoot(new_data);
        let new_menu = [...itemMenu];
        new_menu.splice(index, 1);
        change({ name, value: new_data });
        // setItemMenu([...new_menu]);
    };

    const editBall = (value, index, type) => {
        let new_data = [...field];
        new_data[index][type] = value;
        changeRoot(new_data);
    };

    const hasColor = /^#(?:[0-9a-f]{3}){1,2}$/i;

    return (
        <>
            {field?.map((item, index) => (
                <>
                    <div className={s.wrapper_st}>
                        <div
                            className={
                                GlobalStyle.CustomFontRegular +
                                " " +
                                s.placeholder
                            }
                        >
                            {`${index + 1}. ${checkLanguageConst(
                                labels[0],
                                translations
                            )}`}
                        </div>
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
                    <div className={s.wrapper_st}>
                        <input
                            value={item.start_balls}
                            type="text"
                            className={s.input_set}
                            onChange={(value) =>
                                editBall(
                                    value.target.value,
                                    index,
                                    "start_balls"
                                )
                            }
                        />
                        <div
                            className={
                                GlobalStyle.CustomFontRegular +
                                " " +
                                s.text_list
                            }
                        >
                            ——
                        </div>
                        <input
                            value={item.end_balls}
                            type="text"
                            className={s.input_set}
                            onChange={(value) =>
                                editBall(value.target.value, index, "end_balls")
                            }
                        />
                    </div>
                    <div className={s.wrpper_field_header}>
                        <div
                            className={
                                GlobalStyle.CustomFontRegular +
                                " " +
                                s.placeholder
                            }
                        >
                            {checkLanguageConst(labels[1], translations)}
                        </div>
                        {/* <div className={s.box_translation}>
                            <div
                                className={s.wrapper_language_label}
                                onClick={() => newLanguage(index)}
                            >
                                <div
                                    className={
                                        GlobalStyle.CustomFontRegular +
                                        " " +
                                        s.language_label
                                    }
                                >
                                    {checkLanguageConst(
                                        languages[itemMenu[index]].label,
                                        translations
                                    )}
                                </div>
                                <GlobalSvgSelector id="arrow_mini" />
                            </div>
                        </div> */}
                        <Lengs
                            languages={languages}
                            translations={translations}
                            setItemMenu={(setr) =>
                                new_set_Language(index, setr)
                            }
                            itemMenu={languages.findIndex(
                                (item) => item.code === itemMenu[index]
                            )}
                        />
                    </div>
                    <textarea
                        rows="10"
                        cols="45"
                        value={
                            item.description?.find(
                                (item) => item.language === itemMenu[index]
                            )
                                ? item.description?.find(
                                      (item) =>
                                          item.language === itemMenu[index]
                                  ).value
                                : ""
                        }
                        className={s.inputarrea}
                        onChange={(value) =>
                            editText(value.target.value, index)
                        }
                    />
                    <div
                        className={
                            GlobalStyle.CustomFontRegular + " " + s.placeholder
                        }
                    >
                        {checkLanguageConst(labels[2], translations)}
                    </div>
                    <div className={s.input_color}>
                        <input
                            value={item.color}
                            type="text"
                            className={s.input_text_color}
                            onChange={(value) =>
                                editBall(value.target.value, index, "color")
                            }
                        />
                        <div
                            style={{
                                marginLeft: 16,
                                width: 30,
                                height: 30,
                                borderRadius: 2,
                                backgroundColor: hasColor.test(item.color)
                                    ? item.color
                                    : "rgba(0, 0, 0, 0)",
                            }}
                        />
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
