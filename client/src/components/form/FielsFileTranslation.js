import GlobalStyle from "../GlobalStyle.module.scss";
import s from "../tableCard/Form.module.scss";
import React, {useContext, useEffect, useState} from "react";
import {GlobalSvgSelector} from "../../assets/icons/global/GlobalSvgSelector";
import {AuthContext} from "../../context/authContext";
import {useHttp} from "../../hooks/http.hook";
import {ColorsStyles} from "../../constants/ColorsStyles";
import ClipLoader from "react-spinners/ClipLoader";
import {PostService} from "../../services/PostService";
import {checkLanguageConst} from "../../hooks/translashion";

export const FieldFileTranslation = ({label, name, change, value, languages, translations, lang}) => {
    const auth = useContext(AuthContext);
    const {request, error, clearError, loading} = useHttp();
    const [status, setStatus] = useState('upload');
    const [statusOk, setStatusOk] = useState(false);
    const [statusError, setStatusError] = useState(false);
    const [loader, setLoader] = useState(false);
    const [boxField, setBoxField] = useState([{language: 'ru', value: ''}, {language: 'com', value: ''}]);
    const [itemMenu, setItemMenu] = useState(lang === 'ru' ? 0 : 1);

    const updateInfo = (valueNew) => {
        valueNew = valueNew ? valueNew : value;
        if (valueNew && valueNew.length > 0) {
            setBoxField(valueNew);
            if (valueNew[itemMenu].value && valueNew[itemMenu].value.length > 0) setStatus('delete');
            else setStatus('upload');
        } else {
            setBoxField([{language: 'ru', value: ''}, {language: 'com', value: ''}]);
        }
    }

    useEffect(() => {
        updateInfo();
    }, [value]);

    const newLanguage = () => {
        setItemMenu(itemMenu === 0 ? 1 : 0);
        if (value[itemMenu === 0 ? 1 : 0].value && value[itemMenu === 0 ? 1 : 0].value.length > 0) setStatus('delete');
        else setStatus('upload');
        setStatusOk(false);
    }

    const editFiled = (value, index) => {
        index = index ? index : itemMenu
        let new_boxField = boxField;
        new_boxField[index].value = value;
        change({name, value: new_boxField});
        setLoader(false);
        setStatusError(false);
        updateInfo(new_boxField);
    }

    const deleteFile = async () => {
        try {
            await request(`/api/upload/delete`, 'POST', {url: value[itemMenu].value}, {
                Authorization: `${auth.token}`
            });
            editFiled('');
        } catch (e) {}
    }

    const openFile = async (event, itemMenu) => {
        if (status === 'delete') {
            await deleteFile();
            return null;
        }
        setLoader(true);
        setStatusOk(false);
        setStatusError(false);
        try {
            const files = event.target.files[0];
            const data = (await PostService.postUploadImage(files, auth.token)).data;
            setStatusOk(true);
            setTimeout(() => setStatusOk(false), 2500);
            editFiled(data, itemMenu);
            setLoader(false);
        } catch (e) {
            setStatusError(true);
            setLoader(false);
        }
    }

    return (
        <div className={s.jin}>
            <div className={s.wrpper_field_header}>
                <div className={GlobalStyle.CustomFontRegular + ' ' + s.placeholder}>
                    {checkLanguageConst(label, translations)}
                </div>
                <div className={s.box_translation}>
                    <div className={s.wrapper_language_label} onClick={() => newLanguage()}>
                        <div className={GlobalStyle.CustomFontRegular + ' ' + s.language_label}>
                            {checkLanguageConst(languages[itemMenu].label, translations)}
                        </div>
                        <GlobalSvgSelector id="arrow_mini" />
                    </div>
                </div>
            </div>
            <div className={s.root_file}>
                <input
                    value={boxField[itemMenu]?.value}
                    type='text'
                    className={s.input_file}
                />
                <div className={s.button_file} onClick={() => openFile(itemMenu)}>
                    {loader ? (
                        <ClipLoader color={ColorsStyles.colorTextError} loading={true} css={s.loader} size={32} />
                    ) : (
                        status === 'upload' ? (
                            <>
                                <input className={s.step} type="file" name="myImage" onChange={(event) => openFile(event)} />
                                <GlobalSvgSelector id={statusOk ? 'ok' : 'upload'} />
                            </>
                        ) : (
                            <>
                                <GlobalSvgSelector id={statusOk ? 'ok' : 'delete'} />
                            </>
                        )
                    )}
                </div>
            </div>
        </div>
    )
}
