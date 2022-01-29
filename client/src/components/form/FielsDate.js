import GlobalStyle from "../GlobalStyle.module.scss";
import s from "../tableCard/Form.module.scss";
import React from "react";
import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import TextField from "@mui/material/TextField";

export const FieldDate = ({label, name, change, value}) => {
    return (
        <>
            <div className={GlobalStyle.CustomFontRegular + ' ' + s.placeholder}>
                {label}
            </div>
            <MobileDateTimePicker
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
        </>
    )
}
