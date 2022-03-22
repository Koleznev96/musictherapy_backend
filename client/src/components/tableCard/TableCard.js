import React, {useState} from 'react';
import s from './TableCard.module.scss';
import GlobalStyle from "../GlobalStyle.module.scss";
import {usePopupForm} from "../../hooks/usePopupForm";
import {GlobalSvgSelector} from "../../assets/icons/global/GlobalSvgSelector";
import {ColorsStyles} from "../../constants/ColorsStyles";
import ClipLoader from "react-spinners/ClipLoader";
import {Form} from "./Forml";
import {optionEditVideo, optionQuestionnaire, optionSettings} from "../../constants/OptionsTable";


const string_date = (string) => {
    const date = new Date(string);
    const year = date.getFullYear();
    const month = date.getMonth() < 9 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
    const day = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate();
    const hours = date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours();
    const minutes = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes();
    return year + '/' + month + '/' + day + '  ' + hours + ':' + minutes;
}

export const TableCard = ({option, data, loading, reload, setData, optionQuestionnaire, optionPassword, optionSettings, optionEdit}) => {
    const popupForm = usePopupForm();
    const [status, setStatus] = useState(null);
    const [statusFilter, setStatusFilter] = useState(false);

    const itemHandler = (item) => {
        popupForm.openHandler(
            <Form
                data={item}
                option={optionEdit ? optionEdit : option}
                reload={reload}
                optionQuestionnaire={optionQuestionnaire}
                optionPassword={optionPassword}
                optionSettings={optionSettings}
            />
        );
    }

    const settingFieldHandler = (item) => {
        let new_data = [...data];
        if (item.type !== 'date')
        new_data.sort((prev, next) => {
            if ( prev[item.value] < next[item.value] ) return -1;
            if ( prev[item.value] < next[item.value] ) return 1;
        });
        else
        new_data.sort(function(a, b) {
            return new Date(b[item.value]) - new Date(a[item.value]);
        });
        if (statusFilter) {
            new_data.reverse();
            setStatusFilter(false);
        } else {
            setStatusFilter(true);
        }
        setData([...new_data]);
        setStatus(item.value);
    }

    const StringLang = (data) => {
        let answer = '';
        data?.forEach((item, index) => {
            if (item === 'ru') answer += 'рус';
            else answer += 'анг';
            answer +=  data?.length - 1 > index ? ', ' : '';
        });
        return answer;
    }

    return (
        <table className={s.table} cellSpacing="0">
            <thead>
            <tr className={s.table_tr}>
            {option?.fields?.map((item, index) => {
                if (!item.not_see)
                return (
                    <td key={index} className={GlobalStyle.CustomFontBold + ' ' + s.table_td}
                        onClick={() => settingFieldHandler(item)}>
                        <div className={s.table_td_block}>
                            <div className={GlobalStyle.CustomFontBold + ' ' + s.table_td_label}>
                                {item.label}
                            </div>
                            {item.filter ? (
                                <div
                                    className={status ? (status === item.value ? s.icon_filter_active : s.icon_filter) : s.icon_filter}>
                                    <GlobalSvgSelector id={!statusFilter ? 'arrow' : 'arrow_top'}/>
                                </div>
                            ) : null}
                        </div>
                    </td>
                )
            })}
            </tr>
            </thead>
            <tbody>
            {loading ? (
                <tr className={s.td_error}>
                    <td colSpan={option?.fields?.length}>
                        <div className={s.loader}>
                            <ClipLoader color={ColorsStyles.colorTextError} loading={true} css={s.loader} size={32} />
                        </div>
                    </td>
                </tr>
            ) : (
                data?.length === 0 ? (
                    <>
                    <tr className={s.td_error_block}>
                        <td colSpan={option?.fields?.length}>
                            <div className={GlobalStyle.CustomFontRegular + ' ' + s.td_error_text}>
                                Записей нету
                            </div>
                        </td>
                    </tr>
                    <tr className={s.td_error}>
                        <td colSpan={option?.fields?.length}>
                        </td>
                    </tr>
                    </>
                ) : (
                    data?.map((data_item, index) => (
                        <tr key={index} className={index % 2 === 0 ? s.tr_br : s.tr} onClick={() => itemHandler(data_item)}>
                        {option?.fields?.map(field_item => {
                            if (!field_item.not_see)
                                return (
                                    <td className={GlobalStyle.CustomFontRegular + ' ' + s.td}>
                                        {!data_item[field_item.value] ? '' : (

                                            (field_item.type === 'bool') ? (
                                            field_item.list_value?.find(element => element.value === data_item[field_item.value])?.label
                                            // data_item[field_item.value] === 'meditation' ? 'Медитация' : (data_item[field_item.value] === 'classic' ? 'Классика HD' : 'Инструменты')
                                        ) : (
                                            field_item.type === 'box' ? (
                                                field_item.value === 'language' ? (
                                                    StringLang(data_item[field_item.value])
                                            ) :
                                                data_item[field_item.value].slice(0, data_item[field_item.value].length > 5 ? 5 : data_item[field_item.value].length).join(', ')
                                            ) :
                                                (field_item.type === 'date' ? (
                                                string_date(data_item[field_item.value])
                                                // data_item[field_item.value]
                                            ) : (
                                                field_item.translation ? (
                                                    // 'kkk'
                                                    Array.isArray(data_item[field_item.value]) ? (
                                                    String(data_item[field_item.value][0].value).length > 35 ? (data_item[field_item.value][0].value.slice(0, 35) + '...') : data_item[field_item.value][0].value
                                                    ): ''
                                                    ) : (
                                                    Array.isArray(data_item[field_item.value]) ? (
                                                    String(data_item[field_item.value]).length > 35 ? (data_item[field_item.value].slice(0, 35) + '...') : data_item[field_item.value]
                                                    ): ''
                                                    )
                                        )))
                                        )}
                                    </td>
                                )
                        })}
                        </tr>
                    ))
                )
            )}
            </tbody>
        </table>
    );
};
