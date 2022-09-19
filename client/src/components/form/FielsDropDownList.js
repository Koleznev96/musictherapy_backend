import GlobalStyle from "../GlobalStyle.module.scss";
import s from "../tableCard/Form.module.scss";
import React, {useContext, useEffect, useState} from "react";
import {GlobalSvgSelector} from "../../assets/icons/global/GlobalSvgSelector";
import {AuthContext} from "../../context/authContext";
import {useHttp} from "../../hooks/http.hook";
import Scrollbars from "react-custom-scrollbars-2";
import {checkLanguageConst} from "../../hooks/translashion";

export const FieldDropDownList = ({label, name, change, value, url_get_data, valueIn, labelIn, translations}) => {
    const auth = useContext(AuthContext);
    const {request, error, clearError, loading} = useHttp();
    const [status, setStatus] = useState(false);
    const [statusError, setStatusError] = useState(false);
    const [loader, setLoader] = useState(false);
    const [list, setList] = useState([]);

    const getList = async () => {
        try {
            const answer = await request(`/api/admin_panel${url_get_data}`, 'GET', null, {
                Authorization: auth.token
            });
            setList([...answer]);
        } catch (e){
            console.log('err-', e)
        }
    }

    const updateStatusList = () => {
        setStatus(status => !status);
    }

    const changeHandler = (value) => {
        change({name, value});
        updateStatusList();
    }

    useEffect(() => {
        if (url_get_data) getList();
    }, [])

    return (
        <div className={s.jin + ' ' + s.marginBottom}>
            <div className={GlobalStyle.CustomFontRegular + ' ' + s.placeholder}>
                {checkLanguageConst(label, translations)}
            </div>
            <div className={s.root_file + ' ' + s.drop}>
                <input
                    value={checkLanguageConst(value ? value[labelIn] : 'Выберите', translations)}
                    type='text'
                    className={s.input_file}
                />
                <div className={s.button_file} onClick={() => updateStatusList()}>
                    <GlobalSvgSelector id={'arrow_button'} />
                </div>
            </div>
            {status && (
                <div className={s.dropList}>
                    <Scrollbars
                        style={{width: '100%', height: '100%'}}
                    >
                        {list?.map(item => (
                            <div
                                key={item[valueIn]}
                                className={GlobalStyle.CustomFontRegular + ' ' + s.dropListItem}
                                onClick={() => changeHandler(item)}
                            >
                                {item[labelIn]}
                            </div>
                        ))}
                    </Scrollbars>
                </div>
            )}
        </div>
    )
}
