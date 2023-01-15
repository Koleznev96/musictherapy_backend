import GlobalStyle from "../GlobalStyle.module.scss";
import s from "../tableCard/Form.module.scss";
import React, { useContext, useEffect, useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/authContext";
import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import TextField from "@mui/material/TextField";
import { ColorsStyles } from "../../constants/ColorsStyles";
import ClipLoader from "react-spinners/ClipLoader";
import { GlobalSvgSelector } from "../../assets/icons/global/GlobalSvgSelector";
import cloneDeep from "lodash/cloneDeep";
import Scrollbars from "react-custom-scrollbars-2";
import { listField, optionLanguages } from "../../constants/OptionsTable";
import { checkLanguageConst } from "../../hooks/translashion";

export const FieldListAdditionalFunctionality = ({
    languages,
    labelFunc,
    placeholder,
    label,
    name,
    change,
    value,
    url_get_data,
    additional_functionality,
    title_add,
    id_data,
    add_data,
    translations,
    wigth_panel,
}) => {
    const auth = useContext(AuthContext);
    const [list_value, setList_value] = useState([]);
    const [popapStatus, setPopapStatus] = useState(null);
    const [popupOk, setPopupOk] = useState("");
    const [popupError, setPopupError] = useState("");
    const [newData, setNewData] = useState(null);
    const { request, error, clearError, loading } = useHttp();

    const changeRootMain = (value) => {
        change({ name, value });
    };

    // useEffect(() => {
    //     change({name, value: list_value});
    // }, [list_value]);

    const getListValue = async () => {
        try {
            const answer = await request(
                `/api/admin_panel${url_get_data}${id_data}`,
                "GET",
                null,
                {
                    Authorization: auth.token,
                }
            );
            changeRootMain(answer ? answer : []);
            // setList_value(answer ? answer : []);
        } catch (e) {}
    };

    useEffect(() => {
        if (!value || value.length === 0) getListValue();
    }, []);

    useEffect(() => {
        if (value && value.length > 0) {
            setList_value(value);
        } else {
            setList_value([]);
        }
    }, [value]);

    const clearHandler = (status) => {
        if (status.item) {
            let new_data = [...list_value];
            new_data.splice(status.index, 1);
            changeRootMain([...new_data]);
        }
        setPopapStatus(null);
    };

    const deleteHandler = (index) => {
        let new_data = [...list_value];
        new_data.splice(index, 1);
        changeRootMain([...new_data]);
    };

    const select = (item__) => {
        let field = {};
        additional_functionality?.forEach((item) => {
            if (item.type === "list_menu") {
                item?.list_menu_fields?.forEach((item_menu) => {
                    item_menu?.forEach((element) => {
                        if (element.type === "double_fields") {
                            field[element.fields[0].value] = item__
                                ? item__[element.fields[0].value]
                                : cloneDeep(element.fields[0].default);
                            field[element.fields[1].value] = item__
                                ? item__[element.fields[1].value]
                                : cloneDeep(element.fields[1].default);
                        } else
                            field[element.value] = item__
                                ? item__[element.value]
                                : cloneDeep(element.default);
                    });
                });
                // field[item.fields[0].value] = data ? data[item.fields[0].value] : cloneDeep(item.fields[0].default);
                // field[item.fields[1].value] = data ? data[item.fields[1].value] : cloneDeep(item.fields[1].default);
            } else if (item.type === "double_fields") {
                field[item.fields[0].value] = item__
                    ? item__[item.fields[0].value]
                    : cloneDeep(item.fields[0].default);
                field[item.fields[1].value] = item__
                    ? item__[item.fields[1].value]
                    : cloneDeep(item.fields[1].default);
            } else
                field[item.value] = item__
                    ? item__[item.value]
                    : cloneDeep(item.default);
        });
        setNewData(field);
        return field;
    };

    const itemHandler = (item, index) => {
        let gim = select(item);
        setNewData({ ...gim });
        setPopapStatus({ item, index, data: gim });
    };

    const addHandler = () => {
        itemHandler(null, list_value.length);
    };

    const folHandler = (e) => {
        e.stopPropagation();
    };

    const changeRoot = (data) => {
        let new_data;
        if (newData) {
            new_data = { ...newData };
        } else {
            new_data = {};
        }
        new_data[data.name] = data.value;
        setNewData({ ...new_data });
    };

    const saveHandler = () => {
        let new_data = [...list_value];
        if (!popapStatus.item) {
            if (placeholder)
                new_data.push({ ...newData, [placeholder]: auth.name });
            else new_data.push(newData);
        } else {
            if (placeholder)
                new_data[popapStatus.index] = {
                    ...newData,
                    [placeholder]: auth.name,
                };
            else new_data[popapStatus.index] = newData;
        }
        changeRootMain([...new_data]);
        setPopapStatus(null);
    };

    return (
        <>
            {popapStatus ? (
                <div className={s.blur__} onClick={() => setPopapStatus(null)}>
                    <div className={s.root___l} onClick={(e) => folHandler(e)}>
                        <div className={s.root_popup_}>
                            <div
                                style={{
                                    width: wigth_panel ? wigth_panel : 400,
                                }}
                            >
                                <div className={s.popup_header}>
                                    <div
                                        className={
                                            GlobalStyle.BellotaFontRegular +
                                            " " +
                                            s.popup_label
                                        }
                                    >
                                        {checkLanguageConst(
                                            "Editing",
                                            translations
                                        )}
                                    </div>
                                    <div className={s.block_buttons}>
                                        <div
                                            className={s.popup_button_delete}
                                            onClick={() =>
                                                clearHandler(popapStatus)
                                            }
                                        >
                                            <div
                                                className={
                                                    GlobalStyle.CustomFontRegular +
                                                    " " +
                                                    s.popup_button_exit_text
                                                }
                                            >
                                                {checkLanguageConst(
                                                    "Delete",
                                                    translations
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className={s.button_close}
                                            onClick={() => setPopapStatus(null)}
                                        >
                                            <GlobalSvgSelector id="close" />
                                        </div>
                                    </div>
                                </div>
                                <Scrollbars
                                    style={{
                                        width: "100%",
                                        height: "60vh",
                                        marginTop: 18,
                                    }}
                                >
                                    <div className={s.items}>
                                        {additional_functionality?.map(
                                            (item, index) => {
                                                return listField({
                                                    lang: auth.language,
                                                    translations,
                                                    item: item,
                                                    change: changeRoot,
                                                    value: newData,
                                                    optionLanguages: languages,
                                                });
                                            }
                                        )}
                                    </div>
                                </Scrollbars>
                                <div
                                    className={
                                        GlobalStyle.CustomFontRegular +
                                        " " +
                                        (popupOk.length !== 0
                                            ? s.popup_ok
                                            : s.popup_error)
                                    }
                                >
                                    {checkLanguageConst(
                                        popupOk || popupError,
                                        translations
                                    )}
                                </div>
                                <div className={s.popup_liner_button}>
                                    <div
                                        className={s.popup_button_ok}
                                        onClick={() => saveHandler()}
                                    >
                                        {loading ? (
                                            <div
                                                className={
                                                    s.popup_button_ok_loader
                                                }
                                            >
                                                <ClipLoader
                                                    color={
                                                        ColorsStyles.colorTextError
                                                    }
                                                    loading={true}
                                                    css={s.loader}
                                                    size={32}
                                                />
                                            </div>
                                        ) : (
                                            <div
                                                className={
                                                    GlobalStyle.CustomFontRegular +
                                                    " " +
                                                    s.popup_button_ok_text
                                                }
                                            >
                                                {checkLanguageConst(
                                                    popapStatus?.item
                                                        ? "Save"
                                                        : "Add",
                                                    translations
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div
                                        className={s.popup_button_exit}
                                        onClick={() => setPopapStatus(null)}
                                    >
                                        <div
                                            className={
                                                GlobalStyle.CustomFontRegular +
                                                " " +
                                                s.popup_button_exit_text
                                            }
                                        >
                                            {checkLanguageConst(
                                                "Cancel",
                                                translations
                                            )}
                                        </div>
                                    </div>
                                    {/*</div>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}

            <div
                className={
                    GlobalStyle.CustomFontRegular + " " + s.placeholder_max
                }
            >
                {label}
            </div>
            <div className={s.wrapper_bool}>
                <div className={s.root_click_}>
                    {loading ? (
                        <div className={s.wrappe_center}>
                            <ClipLoader
                                color={ColorsStyles.colorTextError}
                                loading={true}
                                css={s.loader}
                                size={26}
                            />
                        </div>
                    ) : (
                        list_value?.map((item, index) => (
                            <div
                                onClick={() => itemHandler(item, index)}
                                className={s.additional_item}
                            >
                                <div
                                    className={
                                        GlobalStyle.CustomFontRegular +
                                        " " +
                                        s.additional_item_text
                                    }
                                >
                                    {labelFunc
                                        ? labelFunc(item)
                                        : item.label.find(
                                              (item) => item.language
                                          )
                                        ? item.label.find(
                                              (item) => item.language
                                          ).value
                                        : item.label[0].value}
                                </div>
                                <div
                                    className={s.button_delet}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteHandler(index);
                                    }}
                                >
                                    <GlobalSvgSelector id="clear" />
                                </div>
                                {placeholder ? (
                                    <div
                                        className={
                                            GlobalStyle.CustomFontLite +
                                            " " +
                                            s.additional_item_placeholder
                                        }
                                    >
                                        {item[placeholder]}
                                    </div>
                                ) : null}
                            </div>
                        ))
                    )}
                    {!loading ? (
                        // <div className={s.button_add_function}>
                        <div
                            onClick={() => addHandler()}
                            className={
                                GlobalStyle.CustomFontRegular +
                                " " +
                                s.button_add_function
                            }
                        >
                            {checkLanguageConst(title_add, translations)}
                        </div>
                    ) : // </div>
                    null}
                </div>
            </div>
        </>
    );
};
