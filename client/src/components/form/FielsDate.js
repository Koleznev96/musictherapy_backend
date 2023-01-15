import GlobalStyle from "../GlobalStyle.module.scss";
import s from "../tableCard/Form.module.scss";
import React from "react";
import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import TextField from "@mui/material/TextField";
import { checkLanguageConst } from "../../hooks/translashion";
import { ColorsStyles } from "../../constants/ColorsStyles";

export const FieldDate = ({ label, name, change, value, translations }) => {
    return (
        <div className={s.jin}>
            <div
                className={GlobalStyle.CustomFontRegular + " " + s.placeholder}
            >
                {checkLanguageConst(label, translations)}
            </div>
            <MobileDateTimePicker
                value={value}
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
                            borderColor: ColorsStyles.borderInput.color,
                            borderWidth: ColorsStyles.borderInput.width,
                            width: "100%",
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
                            },
                        }}
                    />
                )}
            />
        </div>
    );
};
