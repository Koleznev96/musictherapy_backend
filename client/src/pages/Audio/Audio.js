import React, { useCallback, useContext, useEffect, useState } from "react";
import s from "./Video.module.scss";
import { useHttp } from "../../hooks/http.hook";
import { Search } from "../../components/search/Search";
import { Filter } from "../../components/filter/Filter";
import {
    optionCreateAudio,
    optionAudio,
    optionEditAudio,
    sortNumberFunction,
} from "../../constants/OptionsTable";
import { TableCard } from "../../components/tableCard/TableCard";
import { AuthContext } from "../../context/authContext";
import { PaginationTable } from "../../components/paginationTable/PaginationTable";
import ClipLoader from "react-spinners/ClipLoader";
import { ColorsStyles } from "../../constants/ColorsStyles";
import GlobalStyle from "../../components/GlobalStyle.module.scss";
import { usePopupForm } from "../../hooks/usePopupForm";
import { Form } from "../../components/tableCard/Forml";
import { TextCounter } from "../../components/textCounter/TextCounter";
import { httpServer } from "../../const";
import { sortRoot } from "../../components/tableCard/functional";
import { checkLanguageConst } from "../../hooks/translashion";

export const Audio = () => {
    const auth = useContext(AuthContext);
    const popupForm = usePopupForm();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [endPage, setEndPage] = useState(0);
    const [startPage, setStartPage] = useState(0);
    const { request, error, clearError, loading } = useHttp();
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [genre, setGenre] = useState("");
    const [newData, setNewData] = useState(null);
    const [data_length, set_data_length] = useState(0);

    const filtersData = (new_data) => {
        setData([...new_data]);
    };

    const getData = async (
        page,
        rel,
        data_search,
        sort,
        sortData,
        sortStatus
    ) => {
        page = page ? page : 0;
        let search_ = data_search?.search
            ? data_search.search
            : search?.length > 0
            ? search
            : "null";
        let category_ = data_search?.category ? data_search.category : "null";
        let genre_ = data_search?.genre ? data_search.genre : "null";
        if (rel === "null") {
            search_ = "null";
            category_ = "null";
            genre_ = "null";
            setSearch("");
            setCategory("");
            setGenre("");
        }
        try {
            let answer;
            if (sort) {
                answer = await sortRoot(
                    `/api/admin_panel/audio/sort`,
                    {
                        page,
                        search: search_,
                        category: category_,
                        genre: genre_,
                    },
                    sortData,
                    sortStatus,
                    request,
                    auth
                );
            } else
                answer = await request(
                    `/api/admin_panel/audio/${page}/${search_}/${category_}/${genre_}`,
                    "GET",
                    null,
                    {
                        Authorization: auth.token,
                    }
                );
            setPage(page);
            setEndPage(answer.count_page);
            setData(sortNumberFunction(answer.data));
            set_data_length(answer.count_data);
        } catch (e) {}
    };

    useEffect(() => {
        getData(0, "null");
    }, []);

    const creteHandler = () => {
        popupForm.openHandler(
            <Form
                data={null}
                option={optionCreateAudio}
                reload={getData}
                optionEdit={optionAudio}
                setNewData={setNewData}
            />
        );
    };

    return (
        <div className={s.root}>
            <div className={s.header}>
                <div className={s.wrapper_header}>
                    <Search
                        translations={auth.translations}
                        value={search}
                        callback={setSearch}
                        placeholder={"SearchByName"}
                        handler={getData}
                    />
                    <Filter
                        translations={auth.translations}
                        width={280}
                        section={"category"}
                        value={category}
                        callback={setCategory}
                        placeholder={"FilterByCategory"}
                        handler={getData}
                        list={optionAudio.fields[2]}
                    />
                    <Filter
                        translations={auth.translations}
                        width={280}
                        section={"genre"}
                        value={genre}
                        callback={setGenre}
                        placeholder={"FilterByGenre"}
                        handler={getData}
                        list={optionAudio.fields[5]}
                    />
                    <TextCounter
                        translations={auth.translations}
                        value={data_length}
                    />
                </div>
                <div
                    className={s.create_button_ok}
                    onClick={() => creteHandler()}
                >
                    <div
                        className={
                            GlobalStyle.CustomFontRegular +
                            " " +
                            s.create_button_ok_text
                        }
                    >
                        {checkLanguageConst("AddNewAudio", auth.translations)}
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
                page={page}
            />
            <div className={s.footer}>
                <PaginationTable
                    page={page}
                    endPage={endPage}
                    startPage={startPage}
                    getData={setPage}
                />
            </div>
        </div>
    );
};
