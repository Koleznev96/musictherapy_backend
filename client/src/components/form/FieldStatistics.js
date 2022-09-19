import GlobalStyle from "../GlobalStyle.module.scss";
import s from "../tableCard/Form.module.scss";
import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/authContext";
import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import TextField from "@mui/material/TextField";
import {ColorsStyles} from "../../constants/ColorsStyles";
import ClipLoader from "react-spinners/ClipLoader";
import {GlobalSvgSelector} from "../../assets/icons/global/GlobalSvgSelector";
import cloneDeep from 'lodash/cloneDeep';
import Scrollbars from "react-custom-scrollbars-2";
import {listField, optionLanguages} from "../../constants/OptionsTable";
import {checkLanguage, checkLanguageConst} from "../../hooks/translashion";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
} from 'chart.js';
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement
);


export const FieldStatistics = ({label, url_get_data, id_data, translations}) => {
    const auth = useContext(AuthContext);
    const [data, setData] = useState(null);
    const {request, error, clearError, loading} = useHttp();
    const [activeIndex, setActiveIndex] = useState({});
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const [dataGraph, setDataGraph] = useState([]);

    let dataF = {
        labels,
        datasets: [
            {
                // label: "fff",
                data: [3, 6, 8, 10, 200],
                backgroundColor: ['rgba(255, 99, 132, 0.5)', '#FFF', 'red'],
            },
        ],
    }

    const getList = async () => {
        try {
            const answer = await request(`/api/admin_panel${url_get_data}${id_data}`, 'GET', null, {
                Authorization: auth.token
            });
            setData(answer);
            let dataG = [];
            for (let i = 0; i < answer.length; i++) {
                let lit = {
                    labels: [],
                    datasets: [
                        {
                            data: [],
                            backgroundColor: [],
                        },
                    ]
                }
                console.log('answer-', answer[i])
                for(let j = 0; j < answer[i].result.length; j++) {
                    lit.labels.push(dateToString(answer[i].result[j].date_end));
                    lit.datasets[0].data.push(answer[i].result[j].result?.balls);
                    const color = answer[i].result[j].test?.result?.find((item => item.start_balls <= answer[i].result[j].result?.balls && answer[i].result[j].result?.balls <= item.end_balls))?.color;
                    lit.datasets[0].backgroundColor.push(color ? color : '#D9D9D9');
                }
                dataG.push(lit)
            }
            // console.log('dataG-', dataG)
            setDataGraph(dataG);
        } catch (e){
            console.log('bbb-', e)
        }
    }

    useEffect(() => {
        getList();
    }, []);

    const viewHandler = (index) => {
        let list_index = {...activeIndex};
        if (list_index[index] !== undefined) {
            list_index[index] = undefined
        }
        else {
            list_index[index] = [];
        }
        setActiveIndex({...list_index});
    }

    const viewResult = (index, indexResult) => {
        let list_index = {...activeIndex};
        const delete_index = list_index[index].indexOf(indexResult);
        if (delete_index !== -1) {
            list_index[index].splice(delete_index, 1);
        }
        else {
            list_index[index].push(indexResult);
        }
        setActiveIndex({...list_index});
    }

    const dateToString = (date) => {
        date = new Date(date);

        let day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
        let month = date.getMonth() > 8 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
        let year = date.getFullYear();

        return `${day}.${month}.${year}`
    }

    // const options = {
    //     plugins: {
    //         title: {
    //             display: true,
    //             text: 'Посещение сайтов',
    //         },
    //         legend: {
    //             display: true,
    //             position: 'bottom',
    //         },
    //     },
    // };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
    };



    return (
        <div className={s.root_statistics}>
            {loading ? (
                <div className={s.popup_button_ok_loader}>
                    <ClipLoader color={ColorsStyles.colorTextError} loading={true} css={s.loader} size={32} />
                </div>
            ) : (
                data?.map((data_view, index_view) => (
                <div className={s.statisctics_view}>
                    <div
                        className={s.statisctics_result}
                        onClick={() => viewHandler(index_view)}
                    >
                        <GlobalSvgSelector id={activeIndex[index_view] !== undefined ? 'arrow_item_bottom' : 'arrow_item_right'} />
                        <div className={GlobalStyle.CustomFontLite + ' ' + s.statisctics_view_label}>
                            {checkLanguage(data_view?.label, auth.language)}
                        </div>
                    </div>

                    {activeIndex[index_view] !== undefined ? (
                        <>
                            <div className={s.diagramma}>
                                <Bar options={options} data={dataGraph[index_view]} type={'bar'}/>
                                {/*<Bar type="bar" data={[65, 59, 80, 81, 56, 55, 40]}*/}
                                {/*    // labels: ['ffff', 'ffff', '66666', 'fff', 'gggg', 'ggg', '5555'],*/}
                                {/*//     datasets: [{*/}
                                {/*//         label: 'My First Dataset',*/}
                                {/*//         data: [65, 59, 80, 81, 56, 55, 40],*/}
                                {/*//         backgroundColor: [*/}
                                {/*//             'rgba(255, 99, 132, 0.2)',*/}
                                {/*//             'rgba(255, 159, 64, 0.2)',*/}
                                {/*//             'rgba(255, 205, 86, 0.2)',*/}
                                {/*//             'rgba(75, 192, 192, 0.2)',*/}
                                {/*//             'rgba(54, 162, 235, 0.2)',*/}
                                {/*//             'rgba(153, 102, 255, 0.2)',*/}
                                {/*//             'rgba(201, 203, 207, 0.2)'*/}
                                {/*//         ],*/}
                                {/*//         borderColor: [*/}
                                {/*//             'rgb(255, 99, 132)',*/}
                                {/*//             'rgb(255, 159, 64)',*/}
                                {/*//             'rgb(255, 205, 86)',*/}
                                {/*//             'rgb(75, 192, 192)',*/}
                                {/*//             'rgb(54, 162, 235)',*/}
                                {/*//             'rgb(153, 102, 255)',*/}
                                {/*//             'rgb(201, 203, 207)'*/}
                                {/*//         ],*/}
                                {/*//         borderWidth: 1*/}
                                {/*//     }]*/}
                                {/*// }}*/}
                                {/*options={{*/}
                                {/*    scales: {*/}
                                {/*        y: {*/}
                                {/*            beginAtZero: true*/}
                                {/*        }*/}
                                {/*    }*/}
                                {/*}}/>*/}
                            </div>
                        <div className={s.statisctics_view_active}>
                            {data_view.result?.map((result, index_r) => (
                            <div className={s.statisctics_block}>
                                <div
                                    className={s.statisctics_result}
                                    onClick={() => viewResult(index_view, index_r)}
                                >
                                    <GlobalSvgSelector id={activeIndex[index_view]?.indexOf(index_r) !== -1 ? 'arrow_item_bottom' : 'arrow_item_right'} />
                                    <div className={GlobalStyle.CustomFontMedium + ' ' + s.statisctics_label}>
                                        {dateToString(result?.date_end)} - {result?.result?.balls} {checkLanguageConst('баллов', translations)}
                                    </div>
                                </div>
                                {activeIndex[index_view].indexOf(index_r) !== -1 ? (
                                    <div className={s.root_statistics_item_active}>
                                        {result?.data?.map((item, index) => (
                                        <div className={s.statisctics_item}>
                                            <div className={GlobalStyle.CustomFontLite + ' ' + s.statisctics_item_text}>
                                                {`${checkLanguageConst('Вопрос', translations)} ${index + 1}:  ${checkLanguage(item?.question, auth.language)}`}
                                            </div>
                                            <div className={GlobalStyle.CustomFontLite + ' ' + s.statisctics_item_text}>
                                                {`${checkLanguageConst('Ответ', translations)} ${index + 1}: ${item?.answer?.answer ? item.answer?.answer : '-'}`}
                                            </div>
                                        </div>
                                        ))}
                                    </div>
                                ) : null}
                            </div>
                            ))}
                        </div>
                        </>
                    ) : null}

                </div>
                ))
            )}

        </div>
    )
}
