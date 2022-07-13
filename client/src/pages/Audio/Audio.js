import React, {useContext, useEffect, useState} from 'react';
import s from './Video.module.scss';
import {useHttp} from "../../hooks/http.hook";
import {Search} from "../../components/search/Search";
import {Filter} from "../../components/filter/Filter";
import {optionCreateAudio, optionAudio, optionEditAudio, sortNumberFunction} from "../../constants/OptionsTable";
import {TableCard} from "../../components/tableCard/TableCard";
import {AuthContext} from "../../context/authContext";
import {PaginationTable} from "../../components/paginationTable/PaginationTable";
import ClipLoader from "react-spinners/ClipLoader";
import {ColorsStyles} from "../../constants/ColorsStyles";
import GlobalStyle from "../../components/GlobalStyle.module.scss";
import {usePopupForm} from "../../hooks/usePopupForm";
import {Form} from "../../components/tableCard/Forml";


export const Audio = () => {
    const auth = useContext(AuthContext);
    const popupForm = usePopupForm();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [endPage, setEndPage] = useState(0);
    const [startPage, setStartPage] = useState(0);
    const {request, error, clearError, loading} = useHttp();
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [genre, setGenre] = useState("");
    const [newData, setNewData] = useState(null);

    const filtersData = (new_data) => {
        setData([...new_data]);
    }

    const getData = async (page, rel, data_search) => {
        page = page ? page : 0;
        let search_ = data_search?.search ? data_search.search : (search?.length > 0 ? search : "null");
        let category_ = data_search?.category ? data_search.category : (category?.length > 0 ? category : "null");
        let genre_ = data_search?.genre ? data_search.genre : (genre?.length > 0 ? genre : "null");
        if (rel === "null") {
            search_ = "null";
            category_ = "null";
            genre_ = "null";
            setSearch("");
            setCategory("");
            setGenre("");
        }
        try {
            const answer = await request(`/api/admin_panel/audio/${page}/${search_}/${category_}/${genre_}`, 'GET', null, {
                Authorization: auth.token
            });
            setPage(page);
            setEndPage(answer.count_page);
            setData(sortNumberFunction(answer.data));
        } catch (e){}
    }

    // useEffect(() => {
    //     setNewData(null);
    // }, [popupForm.isOpen]);

    useEffect(() => {getData(0, "null")}, []);

    const creteHandler = () => {
        popupForm.openHandler(<Form data={null} option={optionCreateAudio} reload={getData} optionEdit={optionAudio} setNewData={setNewData}/>);
    }

    return (
        <div className={s.root}>
            <div className={s.header}>
                <div className={s.wrapper_header}>
                    <Search value={search} callback={setSearch} placeholder={'Поиск по названию'} handler={getData} />
                    <Filter section={"category"} value={category} callback={setCategory} placeholder={'Фильтр по категории'} handler={getData} list={optionAudio.fields[2]} />
                    <Filter section={"genre"} value={genre} callback={setGenre} placeholder={'Фильтр по жанру'} handler={getData} list={optionAudio.fields[5]} />
                </div>
                <div
                    className={s.create_button_ok}
                    onClick={() => creteHandler()}
                >
                    <div className={GlobalStyle.CustomFontRegular + ' ' + s.create_button_ok_text}>
                        Добавить новое аудио
                    </div>
                </div>
            </div>
            <TableCard
                option={optionAudio}
                data={data}
                loading={loading}
                reload={getData}
                setData={filtersData}
                optionEdit={optionEditAudio}
                table_name={"audio"}
            />
            <div className={s.footer}>
                <PaginationTable page={page} endPage={endPage} startPage={startPage} getData={getData} />
            </div>
        </div>
    );
};
