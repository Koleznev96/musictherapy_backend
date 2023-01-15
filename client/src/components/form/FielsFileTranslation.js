import GlobalStyle from "../GlobalStyle.module.scss";
import s from "../tableCard/Form.module.scss";
import React, { useContext, useEffect, useState } from "react";
import { GlobalSvgSelector } from "../../assets/icons/global/GlobalSvgSelector";
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/http.hook";
import { ColorsStyles } from "../../constants/ColorsStyles";
import ClipLoader from "react-spinners/ClipLoader";
import { PostService } from "../../services/PostService";
import { checkLanguageConst } from "../../hooks/translashion";
import { Lengs } from "./Lengs";

export const FieldFileTranslation = ({
    label,
    name,
    change,
    value,
    languages,
    translations,
    lang,
}) => {
    const auth = useContext(AuthContext);
    const { request, error, clearError, loading } = useHttp();
    const [status, setStatus] = useState("upload");
    const [statusOk, setStatusOk] = useState(false);
    const [statusError, setStatusError] = useState(false);
    const [loader, setLoader] = useState(false);
    const [boxField, setBoxField] = useState(
        languages?.map((item) => ({ language: item.code, value: "" }))
    );
    const [itemMenu, setItemMenu] = useState(lang);

    const updateInfo = (valueNew) => {
        valueNew = valueNew ? valueNew : value;
        if (valueNew && valueNew.length > 0) {
            setBoxField(valueNew);
            const index_l = valueNew.findIndex(
                (item) => item.language === itemMenu
            );
            if (
                index_l !== -1 &&
                valueNew[index_l].value &&
                valueNew[index_l].value.length > 0
            )
                setStatus("delete");
            else setStatus("upload");
        } else {
            setBoxField(
                languages?.map((item) => ({ language: item.code, value: "" }))
            );
        }
    };

    useEffect(() => {
        updateInfo();
    }, [value]);

    const new_set_Language = (setr) => {
        setItemMenu(setr);
        const el = boxField?.find((item) => item.language === setr);
        if (el && el.value && el.value.length > 0) setStatus("delete");
        else setStatus("upload");
        setStatusOk(false);
    };

    const editFiled = (value) => {
        let new_boxField = boxField;
        const index_l = new_boxField.findIndex(
            (item) => item.language === itemMenu
        );
        if (index_l === -1) {
            new_boxField.push({ language: itemMenu, value });
        } else {
            new_boxField[index_l].value = value;
        }
        change({ name, value: new_boxField });
        setLoader(false);
        setStatusError(false);
        updateInfo(new_boxField);
    };

    const deleteFile = async () => {
        try {
            const index_l = boxField.findIndex(
                (item) => item.language === itemMenu
            );
            await request(
                `/api/upload/delete`,
                "POST",
                { url: value[index_l].value },
                {
                    Authorization: `${auth.token}`,
                }
            );
            editFiled("");
        } catch (e) {}
    };

    const openFile = async (event) => {
        if (status === "delete") {
            await deleteFile();
            return null;
        }
        setLoader(true);
        setStatusOk(false);
        setStatusError(false);
        try {
            const files = event.target.files[0];
            const data = (await PostService.postUploadImage(files, auth.token))
                .data;
            setStatusOk(true);
            setTimeout(() => setStatusOk(false), 2500);
            editFiled(data);
            setLoader(false);
        } catch (e) {
            setStatusError(true);
            setLoader(false);
        }
    };

    return (
        <div className={s.jin}>
            <div className={s.wrpper_field_header}>
                <div
                    className={
                        GlobalStyle.CustomFontRegular + " " + s.placeholder
                    }
                >
                    {checkLanguageConst(label, translations)}
                </div>
                <Lengs
                    languages={languages}
                    translations={translations}
                    setItemMenu={new_set_Language}
                    itemMenu={languages.findIndex(
                        (item) => item.code === itemMenu
                    )}
                />
            </div>
            <div className={s.root_file}>
                <input
                    value={
                        boxField?.find((item) => item.language === itemMenu)
                            ? boxField?.find(
                                  (item) => item.language === itemMenu
                              ).value
                            : ""
                    }
                    type="text"
                    className={s.input_file}
                />
                <div
                    className={s.button_file}
                    onClick={() => openFile(itemMenu)}
                >
                    {loader ? (
                        <ClipLoader
                            color={ColorsStyles.colorTextError}
                            loading={true}
                            css={s.loader}
                            size={32}
                        />
                    ) : status === "upload" ? (
                        <>
                            <input
                                className={s.step}
                                type="file"
                                name="myImage"
                                onChange={(event) => openFile(event)}
                            />
                            <GlobalSvgSelector
                                id={statusOk ? "ok" : "upload"}
                            />
                        </>
                    ) : (
                        <>
                            <GlobalSvgSelector
                                id={statusOk ? "ok" : "delete"}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
