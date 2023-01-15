import React, { useContext, useEffect, useState } from "react";
import s from "./Tests.module.scss";
import { useHttp } from "../../hooks/http.hook";
import { Search } from "../../components/search/Search";
import {
    optionCreatePoster,
    optionCreateTests,
    optionCreateVideo,
    optionEditTests,
    optionPoster,
    optionTests,
    sortNumberFunction,
} from "../../constants/OptionsTable";
import { TableCard } from "../../components/tableCard/TableCard";
import { AuthContext } from "../../context/authContext";
import { PaginationTable } from "../../components/paginationTable/PaginationTable";
import { usePopupForm } from "../../hooks/usePopupForm";
import { Form } from "../../components/tableCard/Forml";
import GlobalStyle from "../../components/GlobalStyle.module.scss";
import { checkLanguageConst } from "../../hooks/translashion";

export const Tests = () => {
    const auth = useContext(AuthContext);
    const popupForm = usePopupForm();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [endPage, setEndPage] = useState(0);
    const [startPage, setStartPage] = useState(0);
    const { request, error, clearError, loading } = useHttp();
    const [search, setSearch] = useState("null");

    const filtersData = (new_data) => {
        setData([...new_data]);
    };

    const getData = async (page, rel) => {
        page = page ? page : 0;
        let search_ = search?.length > 0 ? search : "null";
        if (rel === "null") {
            search_ = "null";
            setSearch("");
        }
        try {
            const answer = await request(
                `/api/admin_panel/test/${page}/${search_}`,
                "GET",
                null,
                {
                    Authorization: auth.token,
                }
            );
            setPage(page);
            setEndPage(answer.count_page);
            setData(sortNumberFunction(answer.data));
        } catch (e) {}
    };

    useEffect(() => {
        getData(0, "null");
    }, []);

    const creteHandler = () => {
        popupForm.openHandler(
            <Form
                data={null}
                option={optionCreateTests}
                reload={getData}
                optionEdit={optionCreateTests}
            />
        );
    };

    return (
        <div className={s.root}>
            <div className={s.header}>
                <Search
                    translations={auth.translations}
                    value={search}
                    callback={setSearch}
                    placeholder={"SearchByName"}
                    handler={getData}
                />
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
                        {checkLanguageConst("AddNewTest", auth.translations)}
                    </div>
                </div>
            </div>
            <TableCard
                option={optionTests}
                optionEdit={optionEditTests}
                data={data}
                loading={loading}
                reload={getData}
                setData={filtersData}
                table_name={"live_sound"}
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
