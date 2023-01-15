import React from 'react';
import s from "./ButtonFull.module.scss";
import GlobalStyle from "../GlobalStyle.module.scss";
import ClipLoader from "react-spinners/ClipLoader";
import {ColorsStyles} from "../../constants/ColorsStyles";
import {checkLanguageConst} from "../../hooks/translashion";


export const ButtonFull = ({ data, translations }) => {
    return (
        <div
        className={s.button + ' ' + (data?.styles ? data.styles : null)}
        onClick={() => data.change()}
        >
            {data.loading ? (
                <div className={s.block_loader}>
                    <ClipLoader color={ColorsStyles.colorTextError} loading={true} css={s.loader} size={32} />
                </div>
            ) : (
                <div className={GlobalStyle.CustomFontRegular + ' ' + s.button_text}>
                    {checkLanguageConst(data.value, translations)}
                </div>
            )}
        </div>
    );
}

