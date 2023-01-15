import React, { useContext, useEffect, useState } from "react";
import s from "./Maps.module.scss";
import { useHttp } from "../../hooks/http.hook";
import { Search } from "../../components/search/Search";
import {
    optionCreateMaps,
    optionCreateVideo,
    optionEditMaps,
    optionEditVideo,
    optionMaps,
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
import { checkLanguageConst } from "../../hooks/translashion";

export const Maps = () => {
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
                `/api/admin_panel/maps/${page}/${search_}`,
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
        } catch (e) {}
    };

    useEffect(() => {
        getData(0, "null");
    }, []);

    const creteHandler = () => {
        popupForm.openHandler(
            <Form
                data={null}
                option={optionCreateMaps}
                reload={getData}
                optionEdit={optionMaps}
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
                        {checkLanguageConst(
                            "Добавить новую карту",
                            auth.translations
                        )}
                    </div>
                </div>
            </div>
            <TableCard
                option={optionMaps}
                data={data}
                loading={loading}
                reload={getData}
                setData={filtersData}
                optionEdit={optionEditMaps}
                table_name={"maps"}
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
