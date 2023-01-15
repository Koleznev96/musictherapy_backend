import GlobalStyle from "../GlobalStyle.module.scss";
import s from "../tableCard/Form.module.scss";
import React, { useEffect, useState } from "react";
import { GlobalSvgSelector } from "../../assets/icons/global/GlobalSvgSelector";
import cloneDeep from "lodash/cloneDeep";
import { checkLanguageConst } from "../../hooks/translashion";

export const FieldListAnswerBall = ({
    name,
    change,
    value,
    add_data,
    title_add,
    translations,
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

    const editText = (value, index) => {
        let new_data = [...field];
        new_data[index].label = value;
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
        changeRoot(new_data);
    };

    const editBall = (value, index) => {
        let new_data = [...field];
        new_data[index].balls = value;
        changeRoot(new_data);
    };

    const editBox = (index) => {
        let new_data = [...field];
        new_data[index].is_status = !new_data[index].is_status;
        changeRoot(new_data);
    };

    return (
        <>
            {field?.map((item, index) => (
                <div className={s.wrapper_st_}>
                    <div>
                        <div className={s.wrapper_st}>
                            <div
                                className={
                                    GlobalStyle.CustomFontRegular +
                                    " " +
                                    s.placeholder
                                }
                            >
                                {`${checkLanguageConst(
                                    "Answer",
                                    translations
                                )} ${index + 1}`}
                                {}
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
                        <input
                            value={item.label}
                            type="text"
                            className={s.input_wil}
                            onChange={(value) =>
                                editText(value.target.value, index)
                            }
                        />
                    </div>
                    <div className={s.lin_b}>
                        <div
                            className={
                                GlobalStyle.CustomFontRegular +
                                " " +
                                s.placeholder
                            }
                        >
                            {checkLanguageConst("Points", translations)}
                        </div>
                        <input
                            value={item.balls}
                            type="text"
                            className={s.input_set}
                            onChange={(value) =>
                                editBall(value.target.value, index)
                            }
                        />
                    </div>
                    <div className={s.lin_b}>
                        <div
                            className={
                                GlobalStyle.CustomFontRegular +
                                " " +
                                s.placeholder
                            }
                        >
                            {checkLanguageConst("Right", translations)}?
                        </div>
                        <div
                            className={s.button_input_b_}
                            onClick={() => editBox(index)}
                        >
                            <div
                                className={
                                    item.is_status ? s.box_active : s.box
                                }
                            />
                        </div>
                    </div>
                </div>
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
