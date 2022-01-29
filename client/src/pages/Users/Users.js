import React, {useContext, useEffect, useState} from 'react';
import s from './Users.module.scss';
import {useHttp} from "../../hooks/http.hook";
import {Search} from "../../components/search/Search";
import {optionUser} from "../../constants/OptionsTable";
import {TableCard} from "../../components/tableCard/TableCard";
import {AuthContext} from "../../context/authContext";
import {PaginationTable} from "../../components/paginationTable/PaginationTable";


export const Users = () => {
    const auth = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [endPage, setEndPage] = useState(0);
    const [startPage, setStartPage] = useState(0);
    const {request, error, clearError, loading} = useHttp();
    const [search, setSearch] = useState("null");

    const filtersData = (new_data) => {
        setData([...new_data]);
    }

    const getData = async (page, search) => {
        page = page ? page : 0;
        search = search?.length > 0 ? search : "null";
        setSearch(search ? (search?.length > 0 ? search : "null") : "null");
        try {
            const answer = await request(`/api/admin_panel/users/${page}/${search}`, 'GET', null, {
                Authorization: auth.token
            });
            setPage(page);
            setEndPage(answer.count_page);
            setData(answer.data)
        } catch (e){}
    }

    useEffect(() => {getData(0, "null")}, []);

    return (
        <div className={s.root}>
            <div className={s.header}>
                <Search callback={getData} placeholder={'Поиск по фамилии'} />
            </div>
            <TableCard option={optionUser} data={data} loading={loading} reload={getData} setData={filtersData}/>
            <div className={s.footer}>
                <PaginationTable page={page} endPage={endPage} startPage={startPage} getData={getData} search={search} />
            </div>
        </div>
    );
};
