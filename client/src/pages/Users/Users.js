import React, {useContext, useEffect, useState} from 'react';
import s from './Users.module.scss';
import {useHttp} from "../../hooks/http.hook";
import {Search} from "../../components/search/Search";
import {
    optionAudio,
    optionCreateCourses,
    optionPassword,
    optionQuestionnaire,
    optionSettings,
    optionUser, optionUserCreate,
    optionUserView
} from "../../constants/OptionsTable";
import {TableCard} from "../../components/tableCard/TableCard";
import {AuthContext} from "../../context/authContext";
import {PaginationTable} from "../../components/paginationTable/PaginationTable";
import GlobalStyle from "../../components/GlobalStyle.module.scss";
import {Form} from "../../components/tableCard/Forml";
import {usePopupForm} from "../../hooks/usePopupForm";
import {Filter} from "../../components/filter/Filter";
import {TextCounter} from "../../components/textCounter/TextCounter";
import {sortRoot} from "../../components/tableCard/functional";


export const Users = () => {
    const auth = useContext(AuthContext);
    const popupForm = usePopupForm();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [endPage, setEndPage] = useState(0);
    const [startPage, setStartPage] = useState(0);
    const {request, error, clearError, loading} = useHttp();
    const [search, setSearch] = useState("");
    const [is_admin, setIs_admin] = useState("");
    const [access, setAccess] = useState("");
    const [language, setLanguage] = useState("");
    const [data_length, set_data_length] = useState(0);

    const filtersData = (new_data) => {
        setData([...new_data]);
    }

    const getData = async (page_, rel, data_search, sort, sortData, sortStatus) => {
        page_ = page_ ? page_ : (page ? page : 0);
        // let search_ = search?.length > 0 ? search : "null";
        // if (rel === "null") {
        //     search_ = "null";
        //     setSearch("");
        // }
        let search_ = data_search?.search ? data_search.search : (search?.length > 0 ? search : "null");
        let is_admin_ = typeof data_search?.is_admin === "boolean" ? data_search.is_admin : "null";
        let access_ = data_search?.access ? data_search.access : "null";
        let language_ = data_search?.language ? data_search.language : "null";
        if (rel === "null") {
            search_ = "null";
            is_admin_ = "null";
            access_ = "null";
            setSearch("");
            setIs_admin("");
            setAccess("");
            setLanguage("");
        }

        // setSearch(search ? (search?.length > 0 ? search : "null") : "null");
        try {
            let answer;
            if (sort) {
                answer  = await sortRoot(
                    `/api/admin_panel/users/sort`,
                    {
                        page: page_,
                        full_name: search_,
                        is_admin: is_admin_,
                        access: access_,
                        language: language_,
                    },
                    sortData,
                    sortStatus,
                    request,
                    auth
                )
            } else
            answer = await request(`/api/admin_panel/users/${page_}/${search_}/${is_admin_}/${access_}/${language_}`, 'GET', null, {
                Authorization: auth.token
            });
            setPage(page);
            setEndPage(answer.count_page);
            setData(answer.data);
            set_data_length(answer.count_data);
        } catch (e){}
    }

    useEffect(() => {getData(0, "null")}, []);

    const creteHandler = () => {
        popupForm.openHandler(
            <Form
                data={null}
                option={optionUserCreate}
                reload={getData}
                optionEdit={optionUserCreate}
                optionQuestionnaire={optionQuestionnaire}
                optionPassword={optionPassword}
                optionSettings={optionSettings}
            />
        );
    }

    return (
        <div className={s.root}>
            <div className={s.header}>
                <div className={s.wrapper_header}>
                    <Search value={search} callback={setSearch} placeholder={'Поиск по фамилии'} handler={getData}/>
                    <Filter width={200} section={"is_admin"} value={is_admin} callback={setIs_admin} placeholder={'Фильтр по роли'} handler={getData} list={optionUserView.fields[4]} />
                    <Filter width={270} section={"access"} value={access} callback={setAccess} placeholder={'Фильтр по уровню'} handler={getData} list={optionUserView.fields[5]} />
                    <Filter width={210} section={"language"} value={language} callback={setLanguage} placeholder={'Фильтр по языку'} handler={getData} list={optionSettings.fields[0]} />
                    <TextCounter value={data_length}/>
                </div>
                <div
                    className={s.create_button_ok}
                    onClick={() => creteHandler()}
                >
                    <div className={GlobalStyle.CustomFontRegular + ' ' + s.create_button_ok_text}>
                        Добавить нового пользователя
                    </div>
                </div>
            </div>
            <TableCard
                option={optionUserView}
                optionEdit={optionUser}
                optionQuestionnaire={optionQuestionnaire}
                optionPassword={optionPassword}
                optionSettings={optionSettings}
                data={data}
                loading={loading}
                reload={getData}
                setData={filtersData}
            />
            <div className={s.footer}>
                <PaginationTable page={page} endPage={endPage} startPage={startPage} getData={getData} search={search} />
            </div>
        </div>
    );
};
