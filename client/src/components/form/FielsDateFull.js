import GlobalStyle from "../GlobalStyle.module.scss";
import s from "../tableCard/Form.module.scss";
import React, { useEffect } from "react";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import TextField from "@mui/material/TextField";
import { checkLanguageConst } from "../../hooks/translashion";
import { ColorsStyles } from "../../constants/ColorsStyles";

export const FieldDateFull = ({
    label,
    name,
    change,
    value,
    isNowDate,
    translations,
}) => {
    useEffect(() => {
        if ((!value || value.length) && isNowDate) {
            change({ name, value: new Date() });
        }
    }, []);

    return (
        <div className={s.jin}>
            <div
                className={GlobalStyle.CustomFontRegular + " " + s.placeholder}
            >
                {checkLanguageConst(label, translations)}
            </div>
            <MobileDatePicker
                value={value ? value : ""}
                onChange={(newValue) => {
                    change({ name, value: newValue });
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        sx={{
                            marginTop: 0.5,
                            height: 46,
                            flexDirection: "row",
                            display: "flex",
                            borderRadius: 3.6,
                            backgroundColor: ColorsStyles.backgroundInput,
                            width: "100%",
                            borderColor: ColorsStyles.borderInput.color,
                            borderWidth: ColorsStyles.borderInput.width,
                        }}
                        InputProps={{
                            disableUnderline: true,
                            readOnly: false,
                            style: {
                                color: ColorsStyles.colorTextInput,
                                width: "100%",
                                paddingTop: 4,
                                borderRadius: 14,
                                borderColor: ColorsStyles.borderInput.color,
                                borderWidth: ColorsStyles.borderInput.width,
                                // borderColor: "red",
                            },
                        }}
                    />
                )}
            />
        </div>
    );
};
