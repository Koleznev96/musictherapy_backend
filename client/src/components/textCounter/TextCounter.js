import React, { useEffect, useState } from "react";
import s from "./TextCounter.module.scss";
import { GlobalSvgSelector } from "../../assets/icons/global/GlobalSvgSelector";
import { optionAudio } from "../../constants/OptionsTable";
import GlobalStyle from "../GlobalStyle.module.scss";
import { Form } from "../tableCard/Forml";
import { usePopupForm } from "../../hooks/usePopupForm";
import ClipLoader from "react-spinners/ClipLoader";
import { ColorsStyles } from "../../constants/ColorsStyles";
import { checkLanguageConst } from "../../hooks/translashion";

export const TextCounter = ({ value, translations }) => {
    return (
        <div className={GlobalStyle.CustomFontRegular + " " + s.root}>
            {checkLanguageConst("Quantity", translations)}: {value}
        </div>
    );
};
