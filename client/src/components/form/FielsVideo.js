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


export const FieldVideo = ({label, name, change, value, translations}) => {
    const auth = useContext(AuthContext);
    const {request, error, clearError, loading} = useHttp();
    const [status, setStatus] = useState('upload');
    const [statusOk, setStatusOk] = useState(false);
    const [statusError, setStatusError] = useState(false);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        if (value && value.length > 0) setStatus('delete');
        else setStatus('upload');
    }, [value]);

    const deleteFile = async () => {
        try {
            await request(`/api/upload/delete`, 'POST', {url: value}, {
                Authorization: `${auth.token}`
            });
            change({name, value: ''});
        } catch (e) {}
    }

    const openFile = async (event) => {
        if (status === 'delete') {
            await deleteFile();
            return null;
        }
        setLoader(true);
        setStatusOk(false);
        setStatusError(false);
        try {
            const files = event.target.files[0];
            const data = (await PostService.postUploadVideo(files, auth.token)).data;
            setStatusOk(true);
            setTimeout(() => setStatusOk(false), 2500);
            change({name, value: data});
            setLoader(false);
        } catch (e) {
            setStatusError(true);
            setLoader(false);
        }
    }

    return (
        <div className={s.jin}>
            <div className={GlobalStyle.CustomFontRegular + ' ' + s.placeholder}>
                {checkLanguageConst(label, translations)}
            </div>
            <div className={s.root_file}>
                <input
                    value={value}
                    type='text'
                    className={s.input_file}
                />
                <div className={s.button_file} onClick={() => openFile()}>
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
