import GlobalStyle from "../GlobalStyle.module.scss";
import s from "../tableCard/Form.module.scss";
import React, { useContext, useEffect, useState } from "react";
import { GlobalSvgSelector } from "../../assets/icons/global/GlobalSvgSelector";
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/http.hook";
import ClipLoader from "react-spinners/ClipLoader";
import Scrollbars from "react-custom-scrollbars-2";
import { checkLanguage, checkLanguageConst } from "../../hooks/translashion";
import { ColorsStyles } from "../../constants/ColorsStyles";

export const FieldSelectList = ({
    label,
    name,
    change,
    value,
    url_get_data,
    url_get_selected,
    valueIn,
    labelIn,
    translations,
    leng,
}) => {
    const auth = useContext(AuthContext);
    const { request, error, clearError, loading } = useHttp();
    const [status, setStatus] = useState(false);
    const [loader, setLoader] = useState(false);
    const [loaderList, setLoadeList] = useState(false);
    const [list, setList] = useState([]);
    const [selected, setSelected] = useState("");

    useEffect(() => {
        setList([]);
        setSelected("");
    }, [url_get_selected]);

    const getSelect = async () => {
        if (value === "") return;
        try {
            setLoader(true);
            const answer = await request(
                `/api/admin_panel${url_get_selected}`,
                "POST",
                { id: value },
                {
                    Authorization: auth.token,
                }
            );
            setSelected(answer[labelIn]);
            setLoader(false);
        } catch (e) {
            setLoader(false);
        }
    };

    const getList = async () => {
        if (list.length > 0) return;
        try {
            setLoadeList(true);
            const answer = await request(
                `/api/admin_panel${url_get_data}`,
                "GET",
                null,
                {
                    Authorization: auth.token,
                }
            );
            setList(answer);
            setLoadeList(false);
        } catch (e) {
            setLoadeList(false);
        }
    };

    const updateStatusList = () => {
        setStatus((status) => !status);
        getList();
    };

    const changeHandler = (value) => {
        // setSelected(value[labelIn]);
        change(value[valueIn]);
        updateStatusList();
    };

    useEffect(() => {
        if (url_get_data) getSelect();
    }, [value]);

    return (
        <div className={s.jin + " " + s.marginBottom}>
            {label ? (
                <div
                    className={
                        GlobalStyle.CustomFontRegular + " " + s.placeholder
                    }
                >
                    {checkLanguageConst(label, translations)}
                </div>
            ) : null}
            <div className={s.root_file + " " + s.drop}>
                {loader ? (
                    <div className={s.popup_button_ok_loader}>
                        <ClipLoader
                            color={ColorsStyles.colorTextError}
                            loading={true}
                            css={s.loader}
                            size={32}
                        />
                    </div>
                ) : (
                    <input
                        value={
                            selected
                                ? checkLanguage(selected, leng)
                                : checkLanguageConst("Select", translations)
                        }
                        type="text"
                        className={s.input_file}
                    />
                )}
                <div
                    className={s.button_file}
                    onClick={() => updateStatusList()}
                >
                    <GlobalSvgSelector id={"arrow_button"} />
                </div>
            </div>
            {status && (
                <div className={s.dropList}>
                    {loaderList ? (
                        <div className={s.popup_button_ok_loader}>
                            <ClipLoader
                                color={ColorsStyles.colorTextError}
                                loading={true}
                                css={s.loader}
                                size={32}
                            />
                        </div>
                    ) : (
                        <Scrollbars style={{ width: "100%", height: "100%" }}>
                            {list?.map((item) => (
                                <div
                                    key={item[valueIn]}
                                    className={
                                        GlobalStyle.CustomFontRegular +
                                        " " +
                                        s.dropListItem
                                    }
                                    onClick={() => changeHandler(item)}
                                >
                                    {checkLanguage(item[labelIn], leng)}
                                </div>
                            ))}
                        </Scrollbars>
                    )}
                </div>
            )}
        </div>
    );
};
