import React, { useContext, useEffect, useState } from "react";
import s from "./Lengs.module.scss";
import { useHttp } from "../../hooks/http.hook";
import {
    optionCreateLangs,
    optionEditLangs,
} from "../../constants/OptionsTable";
import { TableCard } from "../../components/tableCard/TableCard";
import { AuthContext } from "../../context/authContext";
import { PaginationTable } from "../../components/paginationTable/PaginationTable";
import { usePopupForm } from "../../hooks/usePopupForm";
import { Form } from "../../components/tableCard/Forml";
import GlobalStyle from "../../components/GlobalStyle.module.scss";
import { checkLanguageConst } from "../../hooks/translashion";

export const Lengs = () => {
    const auth = useContext(AuthContext);
    const popupForm = usePopupForm();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [endPage, setEndPage] = useState(0);
    const [startPage, setStartPage] = useState(0);
    const { request, error, clearError, loading } = useHttp();

    const filtersData = (new_data) => {
        setData([...new_data]);
    };

    const getData = async (page, rel) => {
        try {
            const answer = await request(
                `/api/admin_panel/lengs/`,
                "GET",
                null,
                {
                    Authorization: auth.token,
                }
            );
            setData(answer);
        } catch (e) {}
    };

    useEffect(() => {
        getData(0, "null");
    }, []);

    const creteHandler = () => {
        popupForm.openHandler(
            <Form
                data={null}
                option={optionCreateLangs}
                reload={getData}
                optionEdit={optionEditLangs}
            />
        );
    };

    return (
        <div className={s.root}>
            <div className={s.header}>
                <div
                    className={
                        GlobalStyle.CustomFontRegular + " " + s.header_text
                    }
                >
                    {checkLanguageConst("Languages", auth.translations)}
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
                        {checkLanguageConst(
                            "AddNewLanguage",
                            auth.translations
                        )}
                    </div>
                </div>
            </div>
            <TableCard
                option={optionEditLangs}
                data={data}
                loading={loading}
                reload={getData}
                setData={filtersData}
                // table_name={"live_sound"}
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
