import React, { useEffect, useState } from "react";
import s from "./Search.module.scss";
import { GlobalSvgSelector } from "../../assets/icons/global/GlobalSvgSelector";
import { optionAudio } from "../../constants/OptionsTable";
import GlobalStyle from "../GlobalStyle.module.scss";
import { Form } from "../tableCard/Forml";
import { usePopupForm } from "../../hooks/usePopupForm";
import ClipLoader from "react-spinners/ClipLoader";
import { ColorsStyles } from "../../constants/ColorsStyles";
import { checkLanguageConst } from "../../hooks/translashion";

const Modal = ({
    section,
    value,
    callback,
    handler,
    list,
    exitHandler,
    placeholder,
    translations,
}) => {
    const [active, setActive] = useState("");

    useEffect(() => {
        setActive(value);
    }, [value]);

    const newActive = (data) => {
        callback(data);
        setActive(data);
    };

    const itemHandler = () => {
        handler(0, "false", { [section]: active });
        exitHandler();
    };

    return (
        <div className={s.root_popup}>
            <div className={s.popup_header}>
                <div
                    className={
                        GlobalStyle.BellotaFontRegular + " " + s.popup_label
                    }
                >
                    {checkLanguageConst(placeholder, translations)}
                </div>
                <div className={s.button_close} onClick={() => exitHandler()}>
                    <GlobalSvgSelector id="close" />
                </div>
            </div>
            <div
                className={
                    GlobalStyle.CustomFontRegular + " " + s.placeholder_i
                }
            >
                {checkLanguageConst(list?.label, translations)}
            </div>
            <div className={s.wrapper_bool}>
                <div className={s.root_click}>
                    <div
                        className={s.button_input}
                        onClick={() => newActive("")}
                    >
                        <div
                            className={
                                active?.length === 0 ? s.clip_active : s.clip
                            }
                        />
                        <div className={s.clip_text}>
                            {checkLanguageConst("All", translations)}
                        </div>
                    </div>
                    {list?.list_value
                        ?.slice(0, list?.list_value.length / 2)
                        .map((item, index) => (
                            <div
                                className={s.button_input}
                                onClick={() => newActive(item.value)}
                            >
                                <div
                                    className={
                                        active === item.value
                                            ? s.clip_active
                                            : s.clip
                                    }
                                />
                                <div className={s.clip_text}>
                                    {checkLanguageConst(
                                        item.label,
                                        translations
                                    )}
                                </div>
                            </div>
                        ))}
                </div>
                <div className={s.root_click}>
                    {list?.list_value
                        ?.slice(
                            list?.list_value.length / 2,
                            list?.list_value.length
                        )
                        .map((item, index) => (
                            <div
                                className={s.button_input}
                                onClick={() => newActive(item.value)}
                            >
                                <div
                                    className={
                                        active === item.value
                                            ? s.clip_active
                                            : s.clip
                                    }
                                />
                                <div className={s.clip_text}>
                                    {checkLanguageConst(
                                        item.label,
                                        translations
                                    )}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <div className={s.popup_liner_button}>
                <div
                    className={s.popup_button_ok}
                    onClick={() => itemHandler()}
                >
                    <div
                        className={
                            GlobalStyle.CustomFontRegular +
                            " " +
                            s.popup_button_ok_text
                        }
                    >
                        {checkLanguageConst("Apply", translations)}
                    </div>
                </div>
                <div
                    className={s.popup_button_exit}
                    onClick={() => exitHandler()}
                >
                    <div
                        className={
                            GlobalStyle.CustomFontRegular +
                            " " +
                            s.popup_button_exit_text
                        }
                    >
                        {checkLanguageConst("Cancel", translations)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Filter = ({
    width,
    section,
    value,
    callback,
    placeholder,
    handler,
    list,
    translations,
}) => {
    const popupForm = usePopupForm();

    const exitHandler = () => {
        popupForm.exitHandler();
    };

    const openModal = () => {
        popupForm.openHandler(
            <Modal
                translations={translations}
                section={section}
                value={value}
                callback={callback}
                handler={handler}
                list={list}
                exitHandler={exitHandler}
                placeholder={placeholder}
            />
        );
    };

    return (
        <div
            style={{ width: width ? width : 350 }}
            className={s.root}
            onClick={() => openModal()}
        >
            <div className={s.input}>
                <div
                    className={
                        GlobalStyle.CustomFontRegular +
                        " " +
                        (value ? s.value : s.placeholder)
                    }
                >
                    {checkLanguageConst(
                        value
                            ? list.list_value?.find(
                                  (item) => item.value === value
                              ).label
                            : placeholder,
                        translations
                    )}
                </div>
            </div>
            <div className={s.button}>
                <GlobalSvgSelector id="filter" />
            </div>
        </div>
    );
};
