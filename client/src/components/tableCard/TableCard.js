import React, {useState} from 'react';
import s from './TableCard.module.scss';
import GlobalStyle from "../GlobalStyle.module.scss";
import {usePopupForm} from "../../hooks/usePopupForm";
import {GlobalSvgSelector} from "../../assets/icons/global/GlobalSvgSelector";
import {ColorsStyles} from "../../constants/ColorsStyles";
import ClipLoader from "react-spinners/ClipLoader";
import {Form} from "./Forml";


const string_date = (string) => {
    const date = new Date(string);
    const year = date.getFullYear();
    const month = date.getMonth() < 9 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
    const day = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate();
    const hours = date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours();
    const minutes = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes();
    return year + '/' + month + '/' + day + '  ' + hours + ':' + minutes;
}

export const TableCard = ({option, data, loading, reload, setData}) => {
    const popupForm = usePopupForm();
    const [status, setStatus] = useState(null);
    const [statusFilter, setStatusFilter] = useState(false);

    const itemHandler = (item) => {
        popupForm.openHandler(<Form data={item} option={option} reload={reload}/>);
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

    return (
        <table className={s.table} cellSpacing="0">
            <tr className={s.table_tr}>
            {option?.fields?.map(item => (
                <td className={GlobalStyle.CustomFontBold + ' ' + s.table_td} onClick={() => settingFieldHandler(item)}>
                    <div className={s.table_td_block}>
                        <div className={GlobalStyle.CustomFontBold + ' ' + s.table_td_label}>
                            {item.label}
                        </div>
                        {item.filter ? (
                        <div className={status ? (status === item.value ? s.icon_filter_active : s.icon_filter): s.icon_filter}>
                            <GlobalSvgSelector id={!statusFilter ? 'arrow' : 'arrow_top'} />
                        </div>
                        ) : null}
                    </div>
                </td>
            ))}
            </tr>
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
                        <tr className={index % 2 === 0 ? s.tr_br : s.tr} onClick={() => itemHandler(data_item)}>
                        {option?.fields?.map(field_item => (
                            <td className={GlobalStyle.CustomFontRegular + ' ' + s.td}>
                                {field_item.value === 'category' ? (
                                    data_item[field_item.value] === 'meditation' ? 'Медитация' : 'Классика HD'
                                ) : (
                                    field_item.type === 'date' ? (
                                        string_date(data_item[field_item.value])
                                        // data_item[field_item.value]
                                    ) : (String(data_item[field_item.value]).length > 35 ? (data_item[field_item.value].slice(0, 35) + '...') : data_item[field_item.value])
                                )
                            }
                            </td>
                        ))}
                        </tr>
                    ))
                )
            )}
        </table>
    );
};
