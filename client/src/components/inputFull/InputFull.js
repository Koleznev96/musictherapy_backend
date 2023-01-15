import React, { useContext, useCallback, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/http.hook";
import s from "./InputFull.module.scss";
import GlobalStyle from "../GlobalStyle.module.scss";
import { checkLanguageConst } from "../../hooks/translashion";

export const InputFull = ({ data, translations }) => {
    return (
        <>
            <input
                type={data.secret}
                value={data.value}
                // placeholderTextColor={'#F3F3F3'}
                className={s.input}
                placeholder={checkLanguageConst(data.placeholder, translations)}
                onChange={(value) => data.change(value.target.value)}
            />
            {data.error?.length ? (
                <div
                    className={GlobalStyle.CustomFontLite + " " + s.error_text}
                >
                    {checkLanguageConst(data.error, translations)}
                </div>
            ) : null}
        </>
    );
};
