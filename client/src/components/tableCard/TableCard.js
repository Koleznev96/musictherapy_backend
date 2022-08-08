import React, {useContext, useState} from 'react';
import s from './TableCard.module.scss';
import GlobalStyle from "../GlobalStyle.module.scss";
import {usePopupForm} from "../../hooks/usePopupForm";
import {GlobalSvgSelector} from "../../assets/icons/global/GlobalSvgSelector";
import {ColorsStyles} from "../../constants/ColorsStyles";
import ClipLoader from "react-spinners/ClipLoader";
import {Form} from "./Forml";
import {AuthContext} from "../../context/authContext";
import {useHttp} from "../../hooks/http.hook";


const string_date = (string) => {
    const date = new Date(string);
    const year = date.getFullYear();
    const month = date.getMonth() < 9 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
    const day = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate();
    const hours = date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours();
    const minutes = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes();
    return year + '/' + month + '/' + day + '  ' + hours + ':' + minutes;
}

const string_date_ = (string) => {
    const date = new Date(string);
    const year = date.getFullYear();
    const month = date.getMonth() < 9 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
    const day = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate();
    return day + '.' + month + '.' + year;
}

export const TableCard = ({option, data, loading, reload, setData, optionQuestionnaire, optionPassword, optionSettings, optionEdit, table_name, wigth_panel}) => {
    const popupForm = usePopupForm();
    const auth = useContext(AuthContext);
    const {request, error, clearError} = useHttp();
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
                wigth_panel={wigth_panel}
            />
        );
    }

    const settingFieldHandler = (item) => {
        // let new_data = [...data];
        // if (item.type === 'date' || item.type === 'date_full') {
        //     new_data.sort(function(a, b) {
        //         return new Date(b[item.value]) - new Date(a[item.value]);
        //     });
        // }
        // else {
        //     // отредачить, непонятно почему так
        //     new_data.sort((prev, next) => {
        //         // console.log('prev-', prev[item.value])
        //         if (next[item.value] === undefined || next[item.value] === null) return statusFilter ? 1 : -1;
        //         if (prev[item.value] === undefined || prev[item.value] === null) return statusFilter ? -1 : 1;
        //         if ( prev[item.value] < next[item.value] ) return -1;
        //         if ( prev[item.value] > next[item.value] ) return 1;
        //         return 0;
        //     });
        // }
        let statusSort;
        if (statusFilter) {
            // new_data.reverse();
            statusSort = false;
            setStatusFilter(false);
        } else {
            statusSort = true;
            setStatusFilter(true);
        }

        reload(null, 0, null, true, item, statusSort);
        // setData([...new_data]);
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

    const reordering = async (item, index, status) => {
        const index2 = status === 'top' ? (index - 1) : (index + 1);
        const id_1 = item._id;
        const id_2 = data[index2]._id;

        let new_data = [...data];
        // меняем поля number
        let temp = new_data[index].number;
        new_data[index].number = new_data[index2].number;
        new_data[index2].number = temp;
        // меняем местами
        let temp_odj = {...new_data[index]};
        new_data[index] = {...new_data[index2]};
        new_data[index2] = {...temp_odj};
        setData([...new_data]);

        try {
            const answer = await request(`/api/admin_panel/reordering`, 'POST', {
                table_name, id_1, id_2
            }, {
                Authorization: auth.token
            });
        } catch (e){
            console.log('ERROR \n' +
                'url: /api/admin_panel/reordering \n' +
                'message: ', e);

            // меняем поля number
            temp = new_data[index].number;
            new_data[index].number = new_data[index2].number;
            new_data[index2].number = temp;
            // меняем местами
            temp_odj = {...new_data[index]};
            new_data[index] = {...new_data[index2]};
            new_data[index2] = {...temp_odj};

            setData([...new_data]);
        }
    }

    return (
        <table className={s.table} cellSpacing="0">
            <thead>
            <tr className={s.table_tr}>
            {option?.fields?.map((item, index) => {
                if (!item.not_see)
                return (
                    <>
                    <td key={index} className={GlobalStyle.CustomFontBold + ' ' + s.table_td}
                        onClick={() => item.filter ? settingFieldHandler(item) : null}>
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
                    {/*==============Кнопки для переноса=================*/}
                    {/*{(table_name && index === 1) ? (*/}
                    {/*    <td key={index} className={GlobalStyle.CustomFontBold + ' ' + s.table_td}>*/}
                    {/*        <div className={s.table_td_block}>*/}
                    {/*            <div className={GlobalStyle.CustomFontBold + ' ' + s.table_td_label}>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </td>*/}
                    {/*): null}*/}
                    {/*==============Кнопки для переноса=================*/}
                    </>
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
                        <td colSpan={option?.fields?.length + 1}>
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
                        {option?.fields?.map((field_item, counter) => {
                            if (!field_item.not_see)
                                return (
                                    <>
                                    <td className={GlobalStyle.CustomFontRegular + ' ' + s.td}>
                                        {
                                            field_item.type === 'input_tooltip_test' ? (
                                                <div className={s.tooltip_test}>
                                                    <div className={s.tooltip_test_text}>
                                                        {data_item[field_item.value]?.length}
                                                    </div>
                                                    {data_item[field_item.value]?.length ? (
                                                    <div className={s.tooltip}>
                                                        {data_item[field_item.value]?.reverse()?.map((item, index) => (
                                                            <div className={s.text_item} key={index}>
                                                                {`${string_date_(item.date_start)} ${item.user_name} - ${item.result?.balls} балов`}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    ): null}
                                                </div>
                                            ) : (
                                                field_item.type === 'input_tooltip_course' ? (
                                                    <div className={s.tooltip_course}>
                                                        <div className={s.tooltip_course_text}>
                                                            {data_item[field_item.value]?.length}
                                                        </div>
                                                        {data_item[field_item.value]?.length ? (
                                                        <div className={s.tooltip}>
                                                            {data_item[field_item.value]?.reverse()?.map((item, index) => (
                                                                <div className={s.text_item} key={index}>
                                                                    {`${string_date_(item.date_start)} ${item.user_name} - ${item.proc_lessons}%`}
                                                                </div>
                                                            ))}
                                                        </div>
                                                        ): null}
                                                    </div>
                                                ) : (field_item.type === 'input_tooltip_like' ? (
                                                        <div className={s.tooltip_course}>
                                                            <div className={s.tooltip_course_text}>
                                                                {data_item[field_item.value]?.length}
                                                            </div>
                                                            {data_item[field_item.value]?.length ? (
                                                                <div className={s.tooltip}>
                                                                    {data_item[field_item.value]?.reverse()?.map((item, index) => (
                                                                        <div className={s.text_item} key={index}>
                                                                            {`${string_date_(item.date)} ${item.user_name}`}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ): null}
                                                        </div>
                                                    ) : (
                                            !data_item[field_item.value] ? (
                                                (field_item.value === 'is_admin') ?
                                                    'Клиент' : ''
                                            ) : (
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
                                                    data_item[field_item.value].length ? (
                                                    String(data_item[field_item.value][0].value).length > 35 ? (data_item[field_item.value][0].value.slice(0, 35) + '...') : data_item[field_item.value][0].value
                                                    ): ''
                                                    ) : (
                                                    data_item[field_item.value].length ? (
                                                    String(data_item[field_item.value]).length > 35 ? (data_item[field_item.value].slice(0, 35) + '...') : data_item[field_item.value]
                                                    ):
                                                        // ''
                                                        data_item[field_item.value]
                                                    )
                                        )))
                                        ))))}
                                    </td>
                                    {/*==============Кнопки для переноса=================*/}
                                    {/*{(table_name && counter === 1) ? (*/}
                                    {/*    <td className={GlobalStyle.CustomFontRegular + ' ' + s.td}>*/}
                                    {/*        <div className={s.wrapper_buttons}>*/}
                                    {/*            {index > 0 ? (*/}
                                    {/*                <div*/}
                                    {/*                    className={s.button_reordering}*/}
                                    {/*                    onClick={(e) => {*/}
                                    {/*                        e.stopPropagation();*/}
                                    {/*                        reordering(data_item, index, "top");}*/}
                                    {/*                    }*/}
                                    {/*                >*/}
                                    {/*                    <GlobalSvgSelector id="reordering_top" />*/}
                                    {/*                </div>*/}
                                    {/*            ): (<div className={s.default_reordering} />)}*/}
                                    {/*            {index < data.length - 1 ? (*/}
                                    {/*                <div*/}
                                    {/*                    className={s.button_reordering}*/}
                                    {/*                    onClick={(e) => {*/}
                                    {/*                        e.stopPropagation();*/}
                                    {/*                        reordering(data_item, index, "bottom");}*/}
                                    {/*                    }*/}
                                    {/*                >*/}
                                    {/*                    <GlobalSvgSelector id="reordering_bottom" />*/}
                                    {/*                </div>*/}
                                    {/*            ): (<div className={s.default_reordering} />)}*/}
                                    {/*        </div>*/}
                                    {/*    </td>*/}
                                    {/*): null}*/}
                                    {/*==============Кнопки для переноса=================*/}
                                    </>
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
