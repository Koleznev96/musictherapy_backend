import React, { useContext, useEffect, useState } from "react";
import s from "./Video.module.scss";
import { useHttp } from "../../hooks/http.hook";
import { Search } from "../../components/search/Search";
import {
    optionCreateVideo,
    optionEditVideo,
    optionVideo,
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
import { sortRoot } from "../../components/tableCard/functional";
import { checkLanguageConst } from "../../hooks/translashion";

export const Video = () => {
    const auth = useContext(AuthContext);
    const popupForm = usePopupForm();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [endPage, setEndPage] = useState(0);
    const [startPage, setStartPage] = useState(0);
    const { request, error, clearError, loading } = useHttp();
    const [search, setSearch] = useState("null");
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
        let search_ = search?.length > 0 ? search : "null";
        if (rel === "null") {
            search_ = "null";
            setSearch("");
        }
        try {
            let answer;
            if (sort) {
                answer = await sortRoot(
                    `/api/admin_panel/video/sort`,
                    {
                        page,
                        search: search_,
                    },
                    sortData,
                    sortStatus,
                    request,
                    auth
                );
            } else
                answer = await request(
                    `/api/admin_panel/video/${page}/${search_}`,
                    "GET",
                    null,
                    {
                        Authorization: auth.token,
                    }
                );
            // Выполнить сортировку по полю number
            setPage(page);
            setEndPage(answer?.count_page);
            setData(sortNumberFunction(answer?.data));
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
                option={optionCreateVideo}
                reload={getData}
                optionEdit={optionVideo}
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
                        {checkLanguageConst("AddNewVideo", auth.translations)}
                    </div>
                </div>
            </div>
            <TableCard
                option={optionVideo}
                data={data}
                loading={loading}
                reload={getData}
                setData={filtersData}
                optionEdit={optionEditVideo}
                table_name={"video"}
                page={page}
            />
            <div className={s.footer}>
                <PaginationTable
                    page={page}
                    endPage={endPage}
                    startPage={startPage}
                    getData={setPage}
                    search={search}
                />
            </div>
        </div>
    );
};
