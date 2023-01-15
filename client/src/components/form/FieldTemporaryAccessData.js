import GlobalStyle from "../GlobalStyle.module.scss";
import s from "../tableCard/Form.module.scss";
import React, { useContext, useEffect, useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/authContext";
import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import TextField from "@mui/material/TextField";
import { ColorsStyles } from "../../constants/ColorsStyles";
import ClipLoader from "react-spinners/ClipLoader";
import { checkLanguage, checkLanguageConst } from "../../hooks/translashion";

export const FieldTemporaryAccessData = ({
    label,
    name,
    change,
    value,
    url_get_data,
    translations,
}) => {
    const auth = useContext(AuthContext);
    const [boxField, setBoxField] = useState([]);
    const [list_value, setList_value] = useState([]);
    const { request, error, clearError, loading } = useHttp();

    const getListValue = async () => {
        try {
            const answer = await request(
                `/api/admin_panel${url_get_data}`,
                "GET",
                null,
                {
                    Authorization: auth.token,
                }
            );
            setList_value([...answer]);
        } catch (e) {}
    };

    useEffect(() => {
        getListValue();
    }, []);

    useEffect(() => {
        if (value && value.length > 0) {
            setBoxField(value);
        }
    }, [value]);

    const boxHandler = (data, indexElement) => {
        let arr_1 = value;
        if (indexElement !== -1) {
            arr_1.splice(indexElement, 1);
        } else {
            let end_date = new Date();
            end_date.setMonth(end_date.getMonth() + 1);
            arr_1 = [
                ...arr_1,
                {
                    course_id: data._id,
                    start_date: new Date(),
                    end_date: end_date,
                },
            ];
            // arr_1 = [...new Set(arr_1)];
        }
        change({ name, value: arr_1 });
    };

    const changeDate = (data, newValue, indexElement, status) => {
        let arr_copy = value;
        arr_copy[indexElement][status] = newValue;
        change({ name, value: arr_copy });
    };

    return (
        <div className={s.jin}>
            <div
                className={GlobalStyle.CustomFontRegular + " " + s.placeholder}
            >
                {checkLanguageConst(label, translations)}
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
                        list_value?.map((item, index) => {
                            let indexElement = boxField.findIndex(
                                (el) => el.course_id === item._id
                            );
                            return (
                                <div>
                                    <div
                                        key={index}
                                        className={s.button_input_b}
                                        onClick={() =>
                                            boxHandler(item, indexElement)
                                        }
                                    >
                                        <div
                                            className={
                                                indexElement !== -1
                                                    ? s.box_active
                                                    : s.box
                                            }
                                        />
                                        <div className={s.clip_text}>
                                            {checkLanguage(
                                                item.label,
                                                auth.language
                                            )}
                                        </div>
                                    </div>
                                    {indexElement !== -1 ? (
                                        <div className={s.wrapper_date}>
                                            <div
                                                className={
                                                    GlobalStyle.CustomFontRegular +
                                                    " " +
                                                    s.st_date
                                                }
                                            >
                                                {checkLanguageConst(
                                                    "From",
                                                    translations
                                                )}
                                            </div>
                                            <MobileDateTimePicker
                                                value={
                                                    boxField[indexElement]
                                                        .start_date
                                                }
                                                onChange={(newValue) => {
                                                    changeDate(
                                                        item,
                                                        newValue,
                                                        indexElement,
                                                        "start_date"
                                                    );
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        sx={{
                                                            marginTop: 0.5,
                                                            height: 46,
                                                            flexDirection:
                                                                "row",
                                                            display: "flex",
                                                            borderRadius: 3.6,
                                                            backgroundColor:
                                                                "#E0E6F1",
                                                            width: "44%",
                                                            borderColor: "red",
                                                        }}
                                                        InputProps={{
                                                            disableUnderline: true,
                                                            readOnly: false,
                                                            style: {
                                                                color: "#000",
                                                                // width: '100%',
                                                                paddingTop: 4,
                                                                borderRadius: 14,
                                                                borderColor:
                                                                    "red",
                                                            },
                                                        }}
                                                    />
                                                )}
                                            />
                                            <div
                                                className={
                                                    GlobalStyle.CustomFontRegular +
                                                    " " +
                                                    s.st_date
                                                }
                                            >
                                                {checkLanguageConst(
                                                    "To",
                                                    translations
                                                )}
                                            </div>
                                            <MobileDateTimePicker
                                                value={
                                                    boxField[indexElement]
                                                        .end_date
                                                }
                                                onChange={(newValue) => {
                                                    changeDate(
                                                        item,
                                                        newValue,
                                                        indexElement,
                                                        "end_date"
                                                    );
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        sx={{
                                                            marginTop: 0.5,
                                                            height: 46,
                                                            flexDirection:
                                                                "row",
                                                            display: "flex",
                                                            borderRadius: 3.6,
                                                            backgroundColor:
                                                                "#E0E6F1",
                                                            width: "44%",
                                                            borderColor: "red",
                                                        }}
                                                        InputProps={{
                                                            disableUnderline: true,
                                                            readOnly: false,
                                                            style: {
                                                                color: "#000",
                                                                width: "100%",
                                                                paddingTop: 4,
                                                                borderRadius: 14,
                                                                borderColor:
                                                                    "red",
                                                            },
                                                        }}
                                                    />
                                                )}
                                            />
                                        </div>
                                    ) : null}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};
