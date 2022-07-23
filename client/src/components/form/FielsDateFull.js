import GlobalStyle from "../GlobalStyle.module.scss";
import s from "../tableCard/Form.module.scss";
import React from "react";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import TextField from "@mui/material/TextField";

export const FieldDateFull = ({label, name, change, value}) => {
    return (
        <div className={s.jin}>
            <div className={GlobalStyle.CustomFontRegular + ' ' + s.placeholder}>
                {label}
            </div>
            <MobileDatePicker
                value={value}
                onChange={(newValue) => {
                    change({name, value: newValue})
                }}
                renderInput={(params) =>
                    <TextField
                        {...params}
                        sx={{
                            marginTop: 0.5,
                            height: 46,
                            flexDirection: 'row',
                            display: 'flex',
                            borderRadius: 3.6,
                            backgroundColor: '#E0E6F1',
                            width: '100%',
                            borderColor: 'red',
                        }}
                        InputProps={{
                            disableUnderline: true,
                            readOnly: false,
                            style: {
                                color: "#000",
                                width: '100%',
                                paddingTop: 4,
                                borderRadius: 14,
                                borderColor: 'red',
                            }
                        }}
                    />
                }
            />
        </div>
    )
}
