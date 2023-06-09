import React from "react";
import { FieldInput } from "../components/form/FielsInput";
import { FieldBool } from "../components/form/FielsBool";
import { FieldBox } from "../components/form/FielsBox";
import { FieldDate } from "../components/form/FielsDate";
import { FieldDateFull } from "../components/form/FielsDateFull";
import { FieldFile } from "../components/form/FielsFile";
import { FieldVideo } from "../components/form/FielsVideo";
import { FieldText } from "../components/form/FielsText";
import { FieldTextTranslation } from "../components/form/FielsTextTranslation";
import { FieldFileTranslation } from "../components/form/FielsFileTranslation";
import { FieldInputTranslation } from "../components/form/FielsInputTranslation";
import { FieldDoubleFields } from "../components/form/FielsDoubleFields";
import { FieldTemporaryAccessData } from "../components/form/FieldTemporaryAccessData";
import { FieldListMenu } from "../components/form/FieldListMenu";
import { FieldListAdditionalFunctionality } from "../components/form/FieldListAdditionalFunctionality";
import { FieldInputEditTranslation } from "../components/form/FieldInputEditTranslation";
import { FieldIntervalBallTextTranslation } from "../components/form/FieldIntervalBallTextTranslation";
import { FieldListAnswerBall } from "../components/form/FieldListAnswerBall";
import { Tools } from "../tools";
import { FieldFileOpen } from "../components/form/FieldFileOpen";
import { FieldDropDownList } from "../components/form/FielsDropDownList";
import { FieldStatistics } from "../components/form/FieldStatistics";
import { EmptyProps } from "../components/form/EmptyProps";
import { FieldInputSecret } from "../components/form/FieldInputSecret";
import { FieldListCustomLength } from "../components/form/FieldListCustomLength";
import { FieldSelectList } from "../components/form/FieldSelectList";

export const listField = ({
    item,
    change,
    value,
    optionLanguages,
    st,
    id_data,
    translations,
    lang,
}) => {
    if (item.type === "input_secret")
        return (
            <FieldInputSecret
                lang={lang}
                translations={translations}
                label={item.label}
                name={item.value}
                change={change}
                value={value[item.value]}
                languages={optionLanguages}
            />
        );
    if (item.type === "input")
        return (
            <FieldInput
                lang={lang}
                translations={translations}
                label={item.label}
                name={item.value}
                change={change}
                value={value[item.value]}
                languages={optionLanguages}
            />
        );
    if (item.type === "bool")
        return (
            <FieldBool
                lang={lang}
                translations={translations}
                st={st}
                label={item.label}
                name={item.value}
                change={change}
                value={value[item.value]}
                list_value={item.list_value}
                languages={optionLanguages}
            />
        );
    if (item.type === "box")
        return (
            <FieldBox
                lang={lang}
                translations={translations}
                st={st}
                label={item.label}
                name={item.value}
                change={change}
                value={value[item.value]}
                list_value={item.list_value}
                languages={optionLanguages}
            />
        );
    if (item.type === "date")
        return (
            <FieldDate
                lang={lang}
                translations={translations}
                label={item.label}
                name={item.value}
                change={change}
                value={value[item.value]}
                languages={optionLanguages}
            />
        );
    if (item.type === "date_full")
        return (
            <FieldDateFull
                lang={lang}
                translations={translations}
                label={item.label}
                name={item.value}
                change={change}
                value={value[item.value]}
                isNowDate={item.isNowDate}
                languages={optionLanguages}
            />
        );
    if (item.type === "img")
        return (
            <FieldFile
                lang={lang}
                translations={translations}
                label={item.label}
                name={item.value}
                change={change}
                value={value[item.value]}
                languages={optionLanguages}
            />
        );
    if (item.type === "video")
        return (
            <FieldVideo
                lang={lang}
                translations={translations}
                label={item.label}
                name={item.value}
                change={change}
                value={value[item.value]}
                languages={optionLanguages}
            />
        );
    if (item.type === "inputarrea")
        return (
            <FieldText
                lang={lang}
                translations={translations}
                label={item.label}
                name={item.value}
                change={change}
                value={value[item.value]}
                languages={optionLanguages}
            />
        );
    if (item.type === "inputarrea_translation")
        return (
            <FieldTextTranslation
                lang={lang}
                translations={translations}
                label={item.label}
                name={item.value}
                change={change}
                value={value[item.value]}
                languages={optionLanguages}
            />
        );
    if (item.type === "img_translation")
        return (
            <FieldFileTranslation
                lang={lang}
                translations={translations}
                label={item.label}
                name={item.value}
                change={change}
                value={value[item.value]}
                languages={optionLanguages}
            />
        );
    if (item.type === "input_translation")
        return (
            <FieldInputTranslation
                lang={lang}
                translations={translations}
                label={item.label}
                name={item.value}
                change={change}
                value={value[item.value]}
                languages={optionLanguages}
            />
        );
    if (item.type === "double_fields")
        return (
            <FieldDoubleFields
                lang={lang}
                translations={translations}
                fields={item.fields}
                change={change}
                value={value}
                languages={optionLanguages}
            />
        );
    if (item.type === "temporary_access_data")
        return (
            <FieldTemporaryAccessData
                lang={lang}
                translations={translations}
                label={item.label}
                name={item.value}
                change={change}
                value={value[item.value]}
                url_get_data={item.url_get_data}
                languages={optionLanguages}
            />
        );
    if (item.type === "list_menu")
        return (
            <FieldListMenu
                lang={lang}
                translations={translations}
                id_data={id_data}
                labels={item.labels}
                list_menu_fields={item.list_menu_fields}
                change={change}
                value={value}
                languages={optionLanguages}
            />
        );
    if (item.type === "list_additional_functionality")
        return (
            <FieldListAdditionalFunctionality
                lang={lang}
                wigth_panel={item.wigth_panel}
                translations={translations}
                labelFunc={item.labelFunc}
                placeholder={item.placeholder}
                add_data={item.add_data}
                id_data={id_data}
                label={item.label}
                name={item.value}
                change={change}
                value={value[item.value]}
                url_get_data={item.url_get_data}
                additional_functionality={item.additional_functionality}
                title_add={item.title_add}
                languages={optionLanguages}
            />
        );
    if (item.type === "input_edit_translation")
        return (
            <FieldInputEditTranslation
                lang={lang}
                translations={translations}
                translation={item.translation}
                label={item.label}
                name={item.value}
                change={change}
                value={value[item.value]}
                languages={optionLanguages}
            />
        );
    if (item.type === "list_interval_ball_text_translation")
        return (
            <FieldIntervalBallTextTranslation
                lang={lang}
                translations={translations}
                labels={item.labels}
                name={item.value}
                change={change}
                value={value[item.value]}
                languages={optionLanguages}
                add_data={item.add_data}
                title_add={item.title_add}
            />
        );
    if (item.type === "select_list")
        return (
            <FieldSelectList
                lang={lang}
                translations={translations}
                label={item.label}
                name={item.value}
                change={change}
                value={value[item.value]}
                url_get_data={item.url_get_data}
                url_get_selected={item.url_get_selected}
                valueIn={item.valueIn}
                labelIn={item.labelIn}
                languages={optionLanguages}
            />
        );
    if (item.type === "list_custom_length")
        // Alex
        return (
            <FieldListCustomLength
                lang={lang}
                translations={translations}
                labels={item.labels}
                name={item.value}
                change={change}
                value={value[item.value]}
                languages={optionLanguages}
                add_data={item.add_data}
                title_add={item.title_add}
                fields={item.fields}
            />
        );
    if (item.type === "list_answer_ball")
        return (
            <FieldListAnswerBall
                lang={lang}
                translations={translations}
                name={item.value}
                change={change}
                value={value[item.value]}
                languages={optionLanguages}
                add_data={item.add_data}
                title_add={item.title_add}
            />
        );
    if (item.type === "file_open")
        return (
            <FieldFileOpen
                lang={lang}
                translations={translations}
                label={item.label}
                name={item.value}
                change={change}
                value={value[item.value]}
                languages={optionLanguages}
            />
        );
    if (item.type === "drop_down_list")
        return (
            <FieldDropDownList
                lang={lang}
                translations={translations}
                label={item.label}
                name={item.value}
                change={change}
                value={value[item.value]}
                url_get_data={item.url_get_data}
                valueIn={item.valueIn}
                labelIn={item.labelIn}
                languages={optionLanguages}
            />
        );
    if (item.type === "statistics")
        return (
            <FieldStatistics
                lang={lang}
                translations={translations}
                id_data={id_data}
                label={item.label}
                url_get_data={item.url_get_data}
                languages={optionLanguages}
            />
        );
    if (item.type === "empty_props")
        return (
            <EmptyProps
                lang={lang}
                translations={translations}
                name={item.value}
                change={change}
                value={value[item.value]}
                additional_functionality={item.additional_functionality}
                id_data={id_data}
                st={st}
                optionLanguages={optionLanguages}
            />
        );
    return null;
};

const dateToString = (date) => {
    date = new Date(date);

    let day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
    let month =
        date.getMonth() > 8 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
    let year = date.getFullYear();

    return `${day}.${month}.${year}`;
};

export const sortNumberFunction = (data) => {
    let new_data = [...data];
    new_data.sort(function (a, b) {
        return a.number - b.number;
    });
    return new_data;
};

export const optionUserView = {
    delete_url: "/delete_user",
    url: "/re_user",
    fields: [
        {
            label: "Surname",
            value: "fullName",
            type: "input",
            filter: true,
            default: "",
        },
        {
            label: "Name",
            value: "name",
            type: "input",
            filter: true,
            default: "",
        },
        {
            label: "Phone",
            value: "telephone",
            type: "input",
            filter: false,
            default: "",
        },
        {
            label: "E-mail",
            value: "email",
            type: "input",
            filter: false,
            default: "",
        },
        {
            label: "Role",
            value: "type_admin",
            type: "bool",
            default: "",
            list_value: [
                { label: "RoleUserValue1", value: "Администратор" },
                { label: "RoleUserValue2", value: "Клиент" },
                { label: "RoleUserValue3", value: "Музыкотерапевт" },
            ],
        },
        {
            label: "LevelUser",
            value: "access",
            type: "bool",
            default: "",
            list_value: [
                { label: "AccessValue2", value: "Гость" },
                { label: "AccessValue3", value: "Премиум" },
                { label: "AccessValue4", value: "VIP" },
            ],
        },
        {
            label: "DateRegistration",
            value: "registration_date",
            type: "date",
            filter: true,
            default: "",
        },
        {
            label: "LoginDate",
            value: "date_last_activity",
            type: "date",
            filter: true,
            default: "",
        },
        {
            label: "NumberDaysActivity",
            value: "amount_activity",
            type: "input",
            filter: true,
            default: "",
        },
        {
            label: "NumberVideosWatched",
            value: "counter_video",
            type: "input",
            filter: true,
            default: "",
        },
        {
            label: "NumberAudioListened",
            value: "counter_audio",
            type: "input",
            filter: true,
            default: "",
        },
        {
            label: "Status",
            value: "status",
            type: "status",
            filter: false,
            default: "",
        },
    ],
};

export const optionUserFin = {
    delete_url: "/delete_user",
    url: "/re_user",

    fields: [
        {
            type: "list_menu",
            labels: ["UserTab1", "UserTab2", "UserTab3", "UserTab6"],
            list_menu_fields: [
                // Информация
                [
                    {
                        label: "Surname",
                        value: "fullName",
                        type: "input",
                        filter: true,
                        default: "",
                    },
                    {
                        label: "Name",
                        value: "name",
                        type: "input",
                        filter: true,
                        default: "",
                    },
                    {
                        label: "Phone",
                        value: "telephone",
                        type: "input",
                        filter: false,
                        default: "",
                    },
                    {
                        label: "E-mail",
                        value: "email",
                        type: "input",
                        filter: false,
                        default: "",
                    },
                    {
                        label: "DateRegistration",
                        value: "registration_date",
                        type: "date",
                        filter: true,
                        default: "",
                    },
                    {
                        label: "LoginDate",
                        value: "date_last_activity",
                        type: "date",
                        filter: true,
                        default: "",
                    },
                    {
                        label: "Status",
                        value: "status",
                        type: "status",
                        filter: false,
                        default: "",
                    },
                ],
                // Анкета
                [
                    {
                        value: "questionnaire",
                        type: "empty_props",
                        default: {},
                        additional_functionality: [
                            {
                                label: "DateOfBirth",
                                value: "date_birth",
                                type: "date_full",
                                default: "",
                            },
                            {
                                label: "Gender",
                                value: "gender",
                                type: "bool",
                                default: "",
                                list_value: [
                                    { label: "Male", value: "Мужской" },
                                    {
                                        label: "Female",
                                        value: "Женский",
                                    },
                                    {
                                        label: "Null",
                                        value: "Не указано",
                                    },
                                ],
                            },
                            {
                                label: "CountryOfBirth",
                                value: "country_birth",
                                type: "input",
                                default: "",
                            },
                            {
                                label: "CountryOfResidence",
                                value: "country_residence",
                                type: "input",
                                default: "",
                            },
                            {
                                label: "CurrentCity",
                                value: "city_residence",
                                type: "input",
                                default: "",
                            },
                            {
                                label: "FavoriteMusic?",
                                value: "music",
                                type: "box",
                                default: "",
                                list_value: [
                                    {
                                        label: "FavoriteMusicCategory1",
                                        value: "Классика",
                                    },
                                    {
                                        label: "FavoriteMusicCategory2",
                                        value: "Рок",
                                    },
                                    {
                                        label: "FavoriteMusicCategory3",
                                        value: "Поп",
                                    },
                                    {
                                        label: "FavoriteMusicCategory4",
                                        value: "Джаз",
                                    },
                                    {
                                        label: "FavoriteMusicCategory5",
                                        value: "Рэп",
                                    },
                                    {
                                        label: "FavoriteMusicCategory6",
                                        value: "Фольк",
                                    },
                                    {
                                        label: "FavoriteMusicCategory7",
                                        value: "Иное",
                                    },
                                ],
                            },
                            {
                                label: "Nature?",
                                value: "nature",
                                type: "bool",
                                default: "",
                                list_value: [
                                    {
                                        label: "NatureCategory1",
                                        value: "Интраверт",
                                    },
                                    {
                                        label: "NatureCategory2",
                                        value: "Экстраверт",
                                    },
                                    {
                                        label: "NatureCategory3",
                                        value: "Не знаю",
                                    },
                                ],
                            },
                            {
                                label: "ClassicLevel",
                                value: "level",
                                type: "bool",
                                default: "",
                                list_value: [
                                    {
                                        label: "ClassicLevelCategory1",
                                        value: "0",
                                    },
                                    {
                                        label: "ClassicLevelCategory2",
                                        value: "1",
                                    },
                                    {
                                        label: "ClassicLevelCategory3",
                                        value: "2",
                                    },
                                    {
                                        label: "ClassicLevelCategory4",
                                        value: "3",
                                    },
                                    {
                                        label: "ClassicLevelCategory5",
                                        value: "4",
                                    },
                                ],
                            },
                            {
                                label: "ActiveLife?",
                                value: "active_life",
                                type: "bool",
                                default: "",
                                list_value: [
                                    {
                                        label: "ActiveLifeCategory1",
                                        value: "Очень активная",
                                    },
                                    {
                                        label: "ActiveLifeCategory2",
                                        value: "Активная",
                                    },
                                    {
                                        label: "ActiveLifeCategory3",
                                        value: "Средняя",
                                    },
                                    {
                                        label: "ActiveLifeCategory4",
                                        value: "Пассивная",
                                    },
                                    {
                                        label: "ActiveLifeCategory5",
                                        value: "Очень пассивная",
                                    },
                                ],
                            },
                        ],
                    },
                ],
                // Статистика
                [
                    {
                        label: "",
                        type: "statistics",
                        url_get_data: "/get_statistics_test/",
                    },
                ],
                // Заметки
                [
                    {
                        label: undefined,
                        labelFunc: (data) =>
                            `${dateToString(data.date)} ${data.label}`,
                        placeholder: "note_writer_name",
                        value: "notes",
                        type: "list_additional_functionality",
                        wigth_panel: 850,
                        filter: false,
                        default: [],
                        title_add: "AddNotes",
                        url_get_data: "/get_notes/",
                        add_data: {
                            date: "",
                            label: "",
                            text: "",
                        },
                        additional_functionality: [
                            {
                                label: "Date",
                                value: "date",
                                type: "date_full",
                                default: "",
                                isNowDate: true,
                            },
                            {
                                label: "Theme",
                                value: "label",
                                type: "input",
                                default: "",
                            },
                            {
                                translation: false,
                                label: "Details",
                                value: "text",
                                type: "input_edit_translation",
                                filter: true,
                                default: "",
                            },
                        ],
                    },
                ],
            ],
        },
    ],
};

export const optionCreateUserFin = {
    delete_url: "/delete_user",
    url: "/create_user",

    fields: [
        {
            type: "list_menu",
            labels: ["UserTab1", "UserTab2", "UserTab3", "UserTab6"],
            list_menu_fields: [
                // Информация
                [
                    {
                        label: "Surname",
                        value: "fullName",
                        type: "input",
                        filter: true,
                        default: "",
                    },
                    {
                        label: "Name",
                        value: "name",
                        type: "input",
                        filter: true,
                        default: "",
                    },
                    {
                        label: "Phone",
                        value: "telephone",
                        type: "input",
                        filter: false,
                        default: "",
                    },
                    {
                        label: "E-mail",
                        value: "email",
                        type: "input",
                        filter: false,
                        default: "",
                    },
                    {
                        label: "DateRegistration",
                        value: "registration_date",
                        type: "date",
                        filter: true,
                        default: "",
                    },
                    {
                        label: "LoginDate",
                        value: "date_last_activity",
                        type: "date",
                        filter: true,
                        default: "",
                    },
                    {
                        label: "Status",
                        value: "status",
                        type: "status",
                        filter: false,
                        default: "",
                    },
                ],
                // Анкета
                [
                    {
                        value: "questionnaire",
                        type: "empty_props",
                        default: {},
                        additional_functionality: [
                            {
                                label: "DateOfBirth",
                                value: "date_birth",
                                type: "date_full",
                                default: "",
                            },
                            {
                                label: "Gender",
                                value: "gender",
                                type: "bool",
                                default: "",
                                list_value: [
                                    { label: "Male", value: "Мужской" },
                                    {
                                        label: "Female",
                                        value: "Женский",
                                    },
                                    {
                                        label: "Null",
                                        value: "Не указано",
                                    },
                                ],
                            },
                            {
                                label: "CountryOfBirth",
                                value: "country_birth",
                                type: "input",
                                default: "",
                            },
                            {
                                label: "CountryOfResidence",
                                value: "country_residence",
                                type: "input",
                                default: "",
                            },
                            {
                                label: "CurrentCity",
                                value: "city_residence",
                                type: "input",
                                default: "",
                            },
                            {
                                label: "FavoriteMusic?",
                                value: "music",
                                type: "box",
                                default: "",
                                list_value: [
                                    {
                                        label: "FavoriteMusicCategory1",
                                        value: "Классика",
                                    },
                                    {
                                        label: "FavoriteMusicCategory2",
                                        value: "Рок",
                                    },
                                    {
                                        label: "FavoriteMusicCategory3",
                                        value: "Поп",
                                    },
                                    {
                                        label: "FavoriteMusicCategory4",
                                        value: "Джаз",
                                    },
                                    {
                                        label: "FavoriteMusicCategory5",
                                        value: "Рэп",
                                    },
                                    {
                                        label: "FavoriteMusicCategory6",
                                        value: "Фольк",
                                    },
                                    {
                                        label: "FavoriteMusicCategory7",
                                        value: "Иное",
                                    },
                                ],
                            },
                            {
                                label: "Nature?",
                                value: "nature",
                                type: "bool",
                                default: "",
                                list_value: [
                                    {
                                        label: "NatureCategory1",
                                        value: "Интраверт",
                                    },
                                    {
                                        label: "NatureCategory2",
                                        value: "Экстраверт",
                                    },
                                    {
                                        label: "NatureCategory3",
                                        value: "Не знаю",
                                    },
                                ],
                            },
                            {
                                label: "ClassicLevel",
                                value: "level",
                                type: "bool",
                                default: "",
                                list_value: [
                                    {
                                        label: "ClassicLevelCategory1",
                                        value: "0",
                                    },
                                    {
                                        label: "ClassicLevelCategory2",
                                        value: "1",
                                    },
                                    {
                                        label: "ClassicLevelCategory3",
                                        value: "2",
                                    },
                                    {
                                        label: "ClassicLevelCategory4",
                                        value: "3",
                                    },
                                    {
                                        label: "ClassicLevelCategory5",
                                        value: "4",
                                    },
                                ],
                            },
                            {
                                label: "ActiveLife?",
                                value: "active_life",
                                type: "bool",
                                default: "",
                                list_value: [
                                    {
                                        label: "ActiveLifeCategory1",
                                        value: "Очень активная",
                                    },
                                    {
                                        label: "ActiveLifeCategory2",
                                        value: "Активная",
                                    },
                                    {
                                        label: "ActiveLifeCategory3",
                                        value: "Средняя",
                                    },
                                    {
                                        label: "ActiveLifeCategory4",
                                        value: "Пассивная",
                                    },
                                    {
                                        label: "ActiveLifeCategory5",
                                        value: "Очень пассивная",
                                    },
                                ],
                            },
                        ],
                    },
                ],
                // Пароль
                [
                    {
                        label: "Password",
                        value: "password",
                        type: "input",
                        default: "",
                    },
                ],
                // Заметки
                [
                    {
                        label: undefined,
                        labelFunc: (data) =>
                            `${dateToString(data.date)} ${data.label}`,
                        placeholder: "note_writer_name",
                        value: "notes",
                        type: "list_additional_functionality",
                        wigth_panel: 850,
                        filter: false,
                        default: [],
                        title_add: "AddNotes",
                        url_get_data: "/get_notes/",
                        add_data: {
                            date: "",
                            label: "",
                            text: "",
                        },
                        additional_functionality: [
                            {
                                label: "Date",
                                value: "date",
                                type: "date_full",
                                default: "",
                                isNowDate: true,
                            },
                            {
                                label: "Theme",
                                value: "label",
                                type: "input",
                                default: "",
                            },
                            {
                                translation: false,
                                label: "Details",
                                value: "text",
                                type: "input_edit_translation",
                                filter: true,
                                default: "",
                            },
                        ],
                    },
                ],
            ],
        },
    ],
};

export const optionUser = {
    delete_url: "/delete_user",
    url: "/re_user",

    fields: [
        {
            type: "list_menu",
            labels: [
                "UserTab1",
                "UserTab2",
                "UserTab3",
                "UserTab4",
                "UserTab5",
                "UserTab6",
            ],
            list_menu_fields: [
                // Информация
                [
                    {
                        label: "Surname",
                        value: "fullName",
                        type: "input",
                        filter: true,
                        default: "",
                    },
                    {
                        label: "Name",
                        value: "name",
                        type: "input",
                        filter: true,
                        default: "",
                    },
                    {
                        label: "Phone",
                        value: "telephone",
                        type: "input",
                        filter: false,
                        default: "",
                    },
                    {
                        label: "E-mail",
                        value: "email",
                        type: "input",
                        filter: false,
                        default: "",
                    },
                    {
                        label: "DateRegistration",
                        value: "registration_date",
                        type: "date",
                        filter: true,
                        default: "",
                    },
                    {
                        label: "LoginDate",
                        value: "date_last_activity",
                        type: "date",
                        filter: true,
                        default: "",
                    },
                    {
                        label: "Status",
                        value: "status",
                        type: "status",
                        filter: false,
                        default: "",
                    },
                ],
                // Анкета
                [
                    {
                        value: "questionnaire",
                        type: "empty_props",
                        default: {},
                        additional_functionality: [
                            {
                                label: "DateOfBirth",
                                value: "date_birth",
                                type: "date_full",
                                default: "",
                            },
                            {
                                label: "Gender",
                                value: "gender",
                                type: "bool",
                                default: "",
                                list_value: [
                                    { label: "Male", value: "Мужской" },
                                    {
                                        label: "Female",
                                        value: "Женский",
                                    },
                                    {
                                        label: "Null",
                                        value: "Не указано",
                                    },
                                ],
                            },
                            {
                                label: "CountryOfBirth",
                                value: "country_birth",
                                type: "input",
                                default: "",
                            },
                            {
                                label: "CountryOfResidence",
                                value: "country_residence",
                                type: "input",
                                default: "",
                            },
                            {
                                label: "CurrentCity",
                                value: "city_residence",
                                type: "input",
                                default: "",
                            },
                            {
                                label: "FavoriteMusic?",
                                value: "music",
                                type: "box",
                                default: "",
                                list_value: [
                                    {
                                        label: "FavoriteMusicCategory1",
                                        value: "Классика",
                                    },
                                    {
                                        label: "FavoriteMusicCategory2",
                                        value: "Рок",
                                    },
                                    {
                                        label: "FavoriteMusicCategory3",
                                        value: "Поп",
                                    },
                                    {
                                        label: "FavoriteMusicCategory4",
                                        value: "Джаз",
                                    },
                                    {
                                        label: "FavoriteMusicCategory5",
                                        value: "Рэп",
                                    },
                                    {
                                        label: "FavoriteMusicCategory6",
                                        value: "Фольк",
                                    },
                                    {
                                        label: "FavoriteMusicCategory7",
                                        value: "Иное",
                                    },
                                ],
                            },
                            {
                                label: "Nature?",
                                value: "nature",
                                type: "bool",
                                default: "",
                                list_value: [
                                    {
                                        label: "NatureCategory1",
                                        value: "Интраверт",
                                    },
                                    {
                                        label: "NatureCategory2",
                                        value: "Экстраверт",
                                    },
                                    {
                                        label: "NatureCategory3",
                                        value: "Не знаю",
                                    },
                                ],
                            },
                            {
                                label: "ClassicLevel",
                                value: "level",
                                type: "bool",
                                default: "",
                                list_value: [
                                    {
                                        label: "ClassicLevelCategory1",
                                        value: "0",
                                    },
                                    {
                                        label: "ClassicLevelCategory2",
                                        value: "1",
                                    },
                                    {
                                        label: "ClassicLevelCategory3",
                                        value: "2",
                                    },
                                    {
                                        label: "ClassicLevelCategory4",
                                        value: "3",
                                    },
                                    {
                                        label: "ClassicLevelCategory5",
                                        value: "4",
                                    },
                                ],
                            },
                            {
                                label: "ActiveLife?",
                                value: "active_life",
                                type: "bool",
                                default: "",
                                list_value: [
                                    {
                                        label: "ActiveLifeCategory1",
                                        value: "Очень активная",
                                    },
                                    {
                                        label: "ActiveLifeCategory2",
                                        value: "Активная",
                                    },
                                    {
                                        label: "ActiveLifeCategory3",
                                        value: "Средняя",
                                    },
                                    {
                                        label: "ActiveLifeCategory4",
                                        value: "Пассивная",
                                    },
                                    {
                                        label: "ActiveLifeCategory5",
                                        value: "Очень пассивная",
                                    },
                                ],
                            },
                        ],
                    },
                ],
                // Пароль
                [
                    {
                        label: "Password",
                        value: "password",
                        type: "input_secret",
                        default: "",
                    },
                ],
                // Настройки
                [
                    {
                        label: "Languages",
                        value: "language",
                        type: "bool",
                        default: "",
                        list_value: [
                            { label: "Russian", value: "ru" },
                            { label: "English", value: "com" },
                        ],
                    },
                    {
                        label: "RoleUser",
                        value: "type_admin",
                        type: "bool",
                        default: "",
                        list_value: [
                            { label: "RoleUserValue1", value: "Администратор" },
                            { label: "RoleUserValue2", value: "Клиент" },
                            {
                                label: "RoleUserValue3",
                                value: "Музыкотерапевт",
                            },
                        ],
                    },
                    {
                        label: "LevelAccess",
                        value: "access",
                        type: "bool",
                        default: "",
                        list_value: [
                            { label: "AccessValue2", value: "Гость" },
                            { label: "AccessValue3", value: "Премиум" },
                            { label: "AccessValue4", value: "VIP" },
                        ],
                    },
                    {
                        label: "CoursesAvailable",
                        value: "available_courses",
                        type: "temporary_access_data",
                        url_get_data: "/courses_mini_list",
                        default: [],
                    },
                    {
                        label: "AppointedMusicTherapist",
                        value: "musicTherapy",
                        valueIn: "id",
                        labelIn: "name",
                        type: "drop_down_list",
                        url_get_data: "/get_musictherapys",
                        default: null,
                    },
                    //     ],
                    // }
                ],
                // Статистика
                [
                    {
                        label: "",
                        type: "statistics",
                        url_get_data: "/get_statistics_test/",
                    },
                ],
                // Заметки
                [
                    {
                        label: undefined,
                        labelFunc: (data) =>
                            `${dateToString(data.date)} ${data.label}`,
                        placeholder: "note_writer_name",
                        value: "notes",
                        type: "list_additional_functionality",
                        wigth_panel: 850,
                        filter: false,
                        default: [],
                        title_add: "AddNotes",
                        url_get_data: "/get_notes/",
                        add_data: {
                            date: "",
                            label: "",
                            text: "",
                        },
                        additional_functionality: [
                            {
                                label: "Date",
                                value: "date",
                                type: "date_full",
                                default: "",
                                isNowDate: true,
                            },
                            {
                                label: "Theme",
                                value: "label",
                                type: "input",
                                default: "",
                            },
                            {
                                translation: false,
                                label: "Details",
                                value: "text",
                                type: "input_edit_translation",
                                filter: true,
                                default: "",
                            },
                        ],
                    },
                ],
            ],
        },
    ],
};

export const optionCreateUser = {
    delete_url: "/delete_user",
    url: "/create_user",

    fields: [
        {
            type: "list_menu",
            labels: [
                "UserTab1",
                "UserTab2",
                "UserTab3",
                "UserTab4",
                "UserTab5",
                "UserTab6",
            ],
            list_menu_fields: [
                // Информация
                [
                    {
                        label: "Surname",
                        value: "fullName",
                        type: "input",
                        filter: true,
                        default: "",
                    },
                    {
                        label: "Name",
                        value: "name",
                        type: "input",
                        filter: true,
                        default: "",
                    },
                    {
                        label: "Phone",
                        value: "telephone",
                        type: "input",
                        filter: false,
                        default: "",
                    },
                    {
                        label: "E-mail",
                        value: "email",
                        type: "input",
                        filter: false,
                        default: "",
                    },
                    {
                        label: "DateRegistration",
                        value: "registration_date",
                        type: "date",
                        filter: true,
                        default: "",
                    },
                    {
                        label: "LoginDate",
                        value: "date_last_activity",
                        type: "date",
                        filter: true,
                        default: "",
                    },
                    {
                        label: "Status",
                        value: "status",
                        type: "status",
                        filter: false,
                        default: "",
                    },
                ],
                // Анкета
                [
                    {
                        value: "questionnaire",
                        type: "empty_props",
                        default: {},
                        additional_functionality: [
                            {
                                label: "DateOfBirth",
                                value: "date_birth",
                                type: "date_full",
                                default: "",
                            },
                            {
                                label: "Gender",
                                value: "gender",
                                type: "bool",
                                default: "",
                                list_value: [
                                    { label: "Male", value: "Мужской" },
                                    {
                                        label: "Female",
                                        value: "Женский",
                                    },
                                    {
                                        label: "Null",
                                        value: "Не указано",
                                    },
                                ],
                            },
                            {
                                label: "CountryOfBirth",
                                value: "country_birth",
                                type: "input",
                                default: "",
                            },
                            {
                                label: "CountryOfResidence",
                                value: "country_residence",
                                type: "input",
                                default: "",
                            },
                            {
                                label: "CurrentCity",
                                value: "city_residence",
                                type: "input",
                                default: "",
                            },
                            {
                                label: "FavoriteMusic?",
                                value: "music",
                                type: "box",
                                default: "",
                                list_value: [
                                    {
                                        label: "FavoriteMusicCategory1",
                                        value: "Классика",
                                    },
                                    {
                                        label: "FavoriteMusicCategory2",
                                        value: "Рок",
                                    },
                                    {
                                        label: "FavoriteMusicCategory3",
                                        value: "Поп",
                                    },
                                    {
                                        label: "FavoriteMusicCategory4",
                                        value: "Джаз",
                                    },
                                    {
                                        label: "FavoriteMusicCategory5",
                                        value: "Рэп",
                                    },
                                    {
                                        label: "FavoriteMusicCategory6",
                                        value: "Фольк",
                                    },
                                    {
                                        label: "FavoriteMusicCategory7",
                                        value: "Иное",
                                    },
                                ],
                            },
                            {
                                label: "Nature?",
                                value: "nature",
                                type: "bool",
                                default: "",
                                list_value: [
                                    {
                                        label: "NatureCategory1",
                                        value: "Интраверт",
                                    },
                                    {
                                        label: "NatureCategory2",
                                        value: "Экстраверт",
                                    },
                                    {
                                        label: "NatureCategory3",
                                        value: "Не знаю",
                                    },
                                ],
                            },
                            {
                                label: "ClassicLevel",
                                value: "level",
                                type: "bool",
                                default: "",
                                list_value: [
                                    {
                                        label: "ClassicLevelCategory1",
                                        value: "0",
                                    },
                                    {
                                        label: "ClassicLevelCategory2",
                                        value: "1",
                                    },
                                    {
                                        label: "ClassicLevelCategory3",
                                        value: "2",
                                    },
                                    {
                                        label: "ClassicLevelCategory4",
                                        value: "3",
                                    },
                                    {
                                        label: "ClassicLevelCategory5",
                                        value: "4",
                                    },
                                ],
                            },
                            {
                                label: "ActiveLife??",
                                value: "active_life",
                                type: "bool",
                                default: "",
                                list_value: [
                                    {
                                        label: "ActiveLifeCategory1",
                                        value: "Очень активная",
                                    },
                                    {
                                        label: "ActiveLifeCategory2",
                                        value: "Активная",
                                    },
                                    {
                                        label: "ActiveLifeCategory3",
                                        value: "Средняя",
                                    },
                                    {
                                        label: "ActiveLifeCategory4",
                                        value: "Пассивная",
                                    },
                                    {
                                        label: "ActiveLifeCategory5",
                                        value: "Очень пассивная",
                                    },
                                ],
                            },
                        ],
                    },
                ],
                // Пароль
                [
                    {
                        label: "Password",
                        value: "password",
                        type: "input",
                        default: "",
                    },
                ],
                // Настройки
                [
                    {
                        label: "Languages",
                        value: "language",
                        type: "bool",
                        default: "",
                        list_value: [
                            { label: "Russian", value: "ru" },
                            { label: "English", value: "com" },
                        ],
                    },
                    {
                        label: "RoleUser",
                        value: "type_admin",
                        type: "bool",
                        default: "",
                        list_value: [
                            { label: "RoleUserValue1", value: "Администратор" },
                            { label: "RoleUserValue2", value: "Клиент" },
                            {
                                label: "RoleUserValue3",
                                value: "Музыкотерапевт",
                            },
                        ],
                    },
                    {
                        label: "LevelAccess",
                        value: "access",
                        type: "bool",
                        default: "",
                        list_value: [
                            { label: "AccessValue2", value: "Гость" },
                            { label: "AccessValue3", value: "Премиум" },
                            { label: "AccessValue4", value: "VIP" },
                        ],
                    },
                    {
                        label: "CoursesAvailable",
                        value: "available_courses",
                        type: "temporary_access_data",
                        url_get_data: "/courses_mini_list",
                        default: [],
                    },
                    {
                        label: "AppointedMusicTherapist",
                        value: "musicTherapy",
                        valueIn: "id",
                        labelIn: "name",
                        type: "drop_down_list",
                        url_get_data: "/get_musictherapys",
                        default: null,
                    },
                    //     ],
                    // }
                ],
                // Статистика
                [
                    {
                        label: "",
                        type: "statistics",
                        url_get_data: "/get_statistics_test/",
                    },
                ],
                // Заметки
                [
                    {
                        label: undefined,
                        labelFunc: (data) =>
                            `${dateToString(data.date)} ${data.label}`,
                        placeholder: "note_writer_name",
                        value: "notes",
                        type: "list_additional_functionality",
                        wigth_panel: 850,
                        filter: false,
                        default: [],
                        title_add: "AddNotes",
                        url_get_data: "/get_notes/",
                        add_data: {
                            date: "",
                            label: "",
                            text: "",
                        },
                        additional_functionality: [
                            {
                                label: "Date",
                                value: "date",
                                type: "date_full",
                                default: "",
                                isNowDate: true,
                            },
                            {
                                label: "Theme",
                                value: "label",
                                type: "input",
                                default: "",
                            },
                            {
                                translation: false,
                                label: "Details",
                                value: "text",
                                type: "input_edit_translation",
                                filter: true,
                                default: "",
                            },
                        ],
                    },
                ],
            ],
        },
    ],
};

export const optionUserCreate = {
    delete_url: "/delete_user",
    url: "/create_user",
    fields: [
        {
            label: "Surname",
            value: "fullName",
            type: "input",
            filter: true,
            default: "",
        },
        {
            label: "Name",
            value: "name",
            type: "input",
            filter: true,
            default: "",
        },
        {
            label: "Phone",
            value: "telephone",
            type: "input",
            filter: false,
            default: "",
        },
        {
            label: "E-mail",
            value: "email",
            type: "input",
            filter: false,
            default: "",
        },
        {
            label: "DateRegistration",
            value: "registration_date",
            type: "date",
            filter: true,
            default: "",
        },
        {
            label: "LoginDate",
            value: "date_last_activity",
            type: "date",
            filter: true,
            default: "",
        },
        {
            label: "Status",
            value: "status",
            type: "status",
            filter: false,
            default: "",
        },
    ],
};

export const optionLanguages = [
    {
        label: "rus",
        value: "ru",
    },
    {
        label: "eng",
        value: "com",
    },
];

export const optionVersion = {
    url: "/re_version",
    fields: [
        {
            label: "CurrentVersion",
            value: "version",
            type: "input",
            default: "",
        },
        {
            translation: true,
            label: "TextUpdate",
            value: "label",
            type: "input_translation",
            filter: true,
            default: [
                { language: "ru", value: "" },
                { language: "com", value: "" },
            ],
        },
    ],
};

export const optionTranslation = {
    url: "/translation_list_edit",
    fields: [
        {
            label: "JsonFile",
            value: "translations_app",
            type: "file_open",
            filter: false,
            default: "",
        },
    ],
};

export const optionTranslationAdmin = {
    url: "/translation_list_edit",
    fields: [
        {
            label: "JsonFile",
            value: "translations_admin",
            type: "file_open",
            filter: false,
            default: "",
        },
    ],
};

export const optionPlaylist = {
    delete_url: "/delete_playlist",
    url: "/playlist_re",
    fields: [
        {
            label: "Languages",
            value: "language",
            type: "box",
            filter: true,
            default: [],
            list_value: [
                { label: "Russian", value: "ru" },
                { label: "English", value: "com" },
            ],
        },
        {
            translation: true,
            label: "Label",
            value: "label",
            type: "input_translation",
            filter: true,
            default: [
                { language: "ru", value: "" },
                { language: "com", value: "" },
            ],
        },
        {
            label: "NumberAudio",
            value: "audio_l",
            type: "input",
            filter: true,
            default: "",
        },
        {
            label: "NumberVideo",
            value: "video_l",
            type: "input",
            filter: true,
            default: "",
        },
        {
            label: "NumberLaunches",
            value: "counter_start",
            type: "input",
            filter: true,
            default: "",
        },
    ],
};

export const optionCreatePlaylist = {
    delete_url: "/delete_playlist",
    url: "/playlist_re",
    fields: [
        {
            type: "list_menu",
            settings: {
                access: {
                    status: true,
                    root: "",
                },
            },
            labels: ["PlaylistTab1", "PlaylistTab2", "PlaylistTab3"],
            list_menu_fields: [
                // Общие настройки
                [
                    {
                        type: "double_fields",
                        fields: [
                            {
                                label: "Languages",
                                value: "language",
                                type: "box",
                                filter: true,
                                default: [],
                                list_value: [
                                    { label: "Russian", value: "ru" },
                                    { label: "English", value: "com" },
                                ],
                            },
                            {
                                label: "Access",
                                value: "access",
                                type: "box",
                                filter: true,
                                default: [],
                                list_value: [
                                    { label: "AccessValue2", value: "Гость" },
                                    { label: "AccessValue3", value: "Премиум" },
                                    { label: "AccessValue4", value: "VIP" },
                                    {
                                        label: "AccessValue5",
                                        value: "custom",
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        translation: true,
                        label: "Label",
                        value: "label",
                        type: "input_translation",
                        filter: true,
                        default: [
                            { language: "ru", value: "" },
                            { language: "com", value: "" },
                        ],
                    },
                    {
                        translation: true,
                        label: "Description",
                        value: "text",
                        type: "input_translation",
                        filter: true,
                        default: [
                            { language: "ru", value: "" },
                            { language: "com", value: "" },
                        ],
                    },
                    {
                        label: "PicturePreview",
                        value: "poster",
                        type: "img",
                        filter: false,
                        default: "",
                    },
                    {
                        label: "RunningAudio",
                        value: "type_start",
                        type: "bool",
                        filter: false,
                        default: "consistently",
                        list_value: [
                            {
                                label: "RunningAudioValue1",
                                value: "consistently",
                            },
                            {
                                label: "RunningAudioValue2",
                                value: "arbitrarily",
                            },
                        ],
                    },
                ],
                // Аудио
                [
                    {
                        translation: true,
                        label: "№",
                        fields: [
                            {
                                valueIn: "_id",
                                labelIn: "label",
                                url_get_data: "/get_audio_to_playlist",
                                type: "select_list",
                                url_get_selected: "/get_audio_label_to_id",
                                default: null,
                            },
                        ],
                        value: "ids_audio",
                        title_add: "AddAudio",
                        type: "list_custom_length",
                        filter: false,
                        add_data: "",
                        default: [],
                    },
                ],
                // Видео
                [
                    {
                        translation: true,
                        label: "№",
                        fields: [
                            {
                                valueIn: "_id",
                                labelIn: "label_",
                                url_get_data: "/get_video_to_playlist",
                                type: "select_list",
                                url_get_selected: "/get_video_label_to_id",
                                default: null,
                            },
                        ],
                        value: "ids_video",
                        title_add: "AddVideo",
                        type: "list_custom_length",
                        filter: false,
                        add_data: "",
                        default: [],
                    },
                ],
            ],
        },
    ],
};

export const optionCustomAccess = [
    {
        translation: false,
        label: "CustomAccess",
        fields: [
            {
                valueIn: "id",
                labelIn: "name",
                type: "select_list",
                url_get_data: "/get_users_to_access",
                url_get_selected: "/get_users_name_to_id",
                default: null,
            },
        ],
        value: "custom_access",
        title_add: "AddUser",
        type: "list_custom_length",
        filter: false,
        add_data: "",
        default: [],
    },
];

export const optionCreateCourses = {
    delete_url: "/delete_course",
    url: "/create_course",

    fields: [
        {
            type: "list_menu",
            labels: ["CourseTab1", "CourseTab2", "CourseTab3"],
            list_menu_fields: [
                // Общие настройки
                [
                    {
                        type: "double_fields",
                        fields: [
                            {
                                label: "Languages",
                                value: "language",
                                type: "box",
                                filter: true,
                                default: [],
                                list_value: [
                                    { label: "Russian", value: "ru" },
                                    { label: "English", value: "com" },
                                ],
                            },
                            {
                                label: "Access",
                                value: "access",
                                type: "box",
                                filter: true,
                                default: [],
                                list_value: [
                                    { label: "AccessValue2", value: "Гость" },
                                    { label: "AccessValue3", value: "Премиум" },
                                    { label: "AccessValue4", value: "VIP" },
                                ],
                            },
                        ],
                    },
                    {
                        translation: true,
                        label: "Label",
                        value: "label",
                        type: "input_translation",
                        filter: true,
                        default: [
                            { language: "ru", value: "" },
                            { language: "com", value: "" },
                        ],
                    },
                    {
                        label: "PicturePreview",
                        value: "poster",
                        type: "img",
                        filter: false,
                        default: "",
                    },
                    {
                        translation: true,
                        label: "Description",
                        value: "description",
                        type: "inputarrea_translation",
                        filter: false,
                        default: [
                            { language: "ru", value: "" },
                            { language: "com", value: "" },
                        ],
                    },
                    {
                        translation: true,
                        label: "Instructions",
                        value: "instruction",
                        type: "inputarrea_translation",
                        filter: false,
                        default: [
                            { language: "ru", value: "" },
                            { language: "com", value: "" },
                        ],
                    },
                ],
                // Уроки
                [
                    {
                        label: "№",
                        value: "lessons",
                        type: "list_additional_functionality",
                        wigth_panel: 850,
                        filter: false,
                        default: [],
                        title_add: "AddLesson",
                        url_get_data: "/lessons_course/",
                        add_data: {
                            label: [
                                { language: "ru", value: "" },
                                { language: "com", value: "" },
                            ],
                            video: "",
                            text: [
                                { language: "ru", value: "" },
                                { language: "com", value: "" },
                            ],
                        },
                        additional_functionality: [
                            {
                                translation: true,
                                label: "LessonTopic",
                                value: "label",
                                type: "input_translation",
                                filter: true,
                                default: [
                                    { language: "ru", value: "" },
                                    { language: "com", value: "" },
                                ],
                            },
                            {
                                label: "PicturePreview",
                                value: "poster",
                                type: "img",
                                filter: false,
                                default: "",
                            },
                            {
                                label: "VideoLesson",
                                value: "video",
                                type: "video",
                                filter: false,
                                default: "",
                            },
                            {
                                translation: true,
                                label: "TextLesson",
                                value: "text",
                                type: "input_edit_translation",
                                filter: true,
                                default: [
                                    { language: "ru", value: "" },
                                    { language: "com", value: "" },
                                ],
                            },
                        ],
                    },
                ],
                // Результат
                [
                    {
                        translation: true,
                        label: "TextResultCourse",
                        value: "result_text",
                        type: "inputarrea_translation",
                        filter: false,
                        default: [
                            { language: "ru", value: "" },
                            { language: "com", value: "" },
                        ],
                    },
                ],
            ],
        },
    ],
};

export const optionCreateTests = {
    delete_url: "/delete_test",
    url: "/create_test",
    fields: [
        {
            type: "list_menu",
            labels: ["TestTab1", "TestTab2", "TestTab3"],
            list_menu_fields: [
                // Общие настройки
                [
                    {
                        type: "double_fields",
                        fields: [
                            {
                                label: "Languages",
                                value: "language",
                                type: "box",
                                filter: true,
                                default: [],
                                list_value: [
                                    { label: "Russian", value: "ru" },
                                    { label: "English", value: "com" },
                                ],
                            },
                            {
                                label: "Access",
                                value: "access",
                                type: "box",
                                filter: true,
                                default: [],
                                list_value: [
                                    { label: "AccessValue2", value: "Гость" },
                                    { label: "AccessValue3", value: "Премиум" },
                                    { label: "AccessValue4", value: "VIP" },
                                ],
                            },
                        ],
                    },
                    {
                        translation: true,
                        label: "Label",
                        value: "label",
                        type: "input_translation",
                        filter: true,
                        default: [
                            { language: "ru", value: "" },
                            { language: "com", value: "" },
                        ],
                    },
                    {
                        label: "PicturePreview",
                        value: "poster",
                        type: "img",
                        filter: false,
                        default: "",
                    },
                    {
                        translation: true,
                        label: "Description",
                        value: "description",
                        type: "inputarrea_translation",
                        filter: false,
                        default: [
                            { language: "ru", value: "" },
                            { language: "com", value: "" },
                        ],
                    },
                    {
                        translation: true,
                        label: "Instructions",
                        value: "instruction",
                        type: "inputarrea_translation",
                        filter: false,
                        default: [
                            { language: "ru", value: "" },
                            { language: "com", value: "" },
                        ],
                    },
                ],
                // Вопросы
                [
                    {
                        label: "№",
                        value: "questions",
                        type: "list_additional_functionality",
                        wigth_panel: 850,
                        filter: false,
                        default: [],
                        title_add: "AddQuestion",
                        url_get_data: "/questions_test/",
                        add_data: {
                            label: [
                                { language: "ru", value: "" },
                                { language: "com", value: "" },
                            ],
                            img: "",
                            question: [
                                { language: "ru", value: "" },
                                { language: "com", value: "" },
                            ],
                            answers: [
                                { label: "", balls: "", is_status: false },
                            ],
                        },
                        additional_functionality: [
                            {
                                translation: true,
                                label: "EssenceQuestion",
                                value: "label",
                                type: "input_translation",
                                filter: true,
                                default: [
                                    { language: "ru", value: "" },
                                    { language: "com", value: "" },
                                ],
                            },
                            {
                                label: "PictureQuestion",
                                value: "img",
                                type: "img",
                                filter: false,
                                default: "",
                            },
                            {
                                translation: true,
                                label: "QuestionWording",
                                value: "question",
                                type: "input_edit_translation",
                                filter: true,
                                default: [
                                    { language: "ru", value: "" },
                                    { language: "com", value: "" },
                                ],
                            },
                            {
                                translation: true,
                                label: "",
                                value: "answers",
                                type: "list_answer_ball",
                                title_add: "AddAnswerPption",
                                filter: true,
                                add_data: {
                                    label: "",
                                    balls: "",
                                    is_status: false,
                                },
                                default: [
                                    { label: "", balls: "", is_status: false },
                                ],
                            },
                        ],
                    },
                ],
                // Результат
                [
                    {
                        translation: true,
                        label: "",
                        labels: ["PointsFromTo", "Explanation", "ColorCode"],
                        value: "result",
                        title_add: "AddResultOption",
                        type: "list_interval_ball_text_translation",
                        filter: false,
                        add_data: {
                            start_balls: "",
                            end_balls: "",
                            description: [
                                { language: "ru", value: "" },
                                { language: "com", value: "" },
                            ],
                            color: "",
                        },
                        default: [],
                    },
                ],
            ],
        },
    ],
};

export const optionEditCourses = {
    delete_url: "/delete_course",
    url: "/re_course",
    fields: [
        {
            type: "list_menu",
            labels: ["CourseTab1", "CourseTab2", "CourseTab3"],
            list_menu_fields: [
                // Общие настройки
                [
                    {
                        type: "double_fields",
                        fields: [
                            {
                                label: "Languages",
                                value: "language",
                                type: "box",
                                filter: true,
                                default: [],
                                list_value: [
                                    { label: "Russian", value: "ru" },
                                    { label: "English", value: "com" },
                                ],
                            },
                            {
                                label: "Access",
                                value: "access",
                                type: "box",
                                filter: true,
                                default: [],
                                list_value: [
                                    { label: "AccessValue2", value: "Гость" },
                                    { label: "AccessValue3", value: "Премиум" },
                                    { label: "AccessValue4", value: "VIP" },
                                ],
                            },
                        ],
                    },
                    {
                        translation: true,
                        label: "Label",
                        value: "label",
                        type: "input_translation",
                        filter: true,
                        default: [
                            { language: "ru", value: "" },
                            { language: "com", value: "" },
                        ],
                    },
                    {
                        label: "PicturePreview",
                        value: "poster",
                        type: "img",
                        filter: false,
                        default: "",
                    },
                    {
                        translation: true,
                        label: "Description",
                        value: "description",
                        type: "inputarrea_translation",
                        filter: false,
                        default: [
                            { language: "ru", value: "" },
                            { language: "com", value: "" },
                        ],
                    },
                    {
                        translation: true,
                        label: "Instructions",
                        value: "instruction",
                        type: "inputarrea_translation",
                        filter: false,
                        default: [
                            { language: "ru", value: "" },
                            { language: "com", value: "" },
                        ],
                    },
                ],
                // Уроки
                [
                    {
                        label: "№",
                        value: "lessons",
                        type: "list_additional_functionality",
                        wigth_panel: 850,
                        filter: false,
                        default: [],
                        title_add: "AddLesson",
                        url_get_data: "/lessons_course/",
                        add_data: {
                            label: [
                                { language: "ru", value: "" },
                                { language: "com", value: "" },
                            ],
                            video: "",
                            text: [
                                { language: "ru", value: "" },
                                { language: "com", value: "" },
                            ],
                        },
                        additional_functionality: [
                            {
                                translation: true,
                                label: "LessonTopic",
                                value: "label",
                                type: "input_translation",
                                filter: true,
                                default: [
                                    { language: "ru", value: "" },
                                    { language: "com", value: "" },
                                ],
                            },
                            {
                                label: "PicturePreview",
                                value: "poster",
                                type: "img",
                                filter: false,
                                default: "",
                            },
                            {
                                label: "VideoLesson",
                                value: "video",
                                type: "video",
                                filter: false,
                                default: "",
                            },
                            {
                                translation: true,
                                label: "TextLesson",
                                value: "text",
                                type: "input_edit_translation",
                                filter: true,
                                default: [
                                    { language: "ru", value: "" },
                                    { language: "com", value: "" },
                                ],
                            },
                        ],
                    },
                ],
                // Результат
                [
                    {
                        translation: true,
                        label: "TextResultCourse",
                        value: "result_text",
                        type: "inputarrea_translation",
                        filter: false,
                        default: [
                            { language: "ru", value: "" },
                            { language: "com", value: "" },
                        ],
                    },
                ],
            ],
        },
    ],
};

export const optionEditLangs = {
    delete_url: "/translation_del",
    url: "/translation_create",
    fields: [
        {
            label: "NameLanguage",
            value: "name",
            type: "input",
            filter: false,
            default: "",
        },
        {
            label: "CodeLanguage",
            value: "code",
            type: "input",
            filter: false,
            default: "",
        },
    ],
};

export const optionEditTests = {
    delete_url: "/delete_test",
    url: "/re_test",
    fields: [
        {
            type: "list_menu",
            labels: ["TestTab1", "TestTab2", "TestTab3"],
            list_menu_fields: [
                // Общие настройки
                [
                    {
                        type: "double_fields",
                        fields: [
                            {
                                label: "Languages",
                                value: "language",
                                type: "box",
                                filter: true,
                                default: [],
                                list_value: [
                                    { label: "Russian", value: "ru" },
                                    { label: "English", value: "com" },
                                ],
                            },
                            {
                                label: "Access",
                                value: "access",
                                type: "box",
                                filter: true,
                                default: [],
                                list_value: [
                                    { label: "AccessValue2", value: "Гость" },
                                    { label: "AccessValue3", value: "Премиум" },
                                    { label: "AccessValue4", value: "VIP" },
                                ],
                            },
                        ],
                    },
                    {
                        translation: true,
                        label: "Label",
                        value: "label",
                        type: "input_translation",
                        filter: true,
                        default: [
                            { language: "ru", value: "" },
                            { language: "com", value: "" },
                        ],
                    },
                    {
                        label: "PicturePreview",
                        value: "poster",
                        type: "img",
                        filter: false,
                        default: "",
                    },
                    {
                        translation: true,
                        label: "Description",
                        value: "description",
                        type: "inputarrea_translation",
                        filter: false,
                        default: [
                            { language: "ru", value: "" },
                            { language: "com", value: "" },
                        ],
                    },
                    {
                        translation: true,
                        label: "Instructions",
                        value: "instruction",
                        type: "inputarrea_translation",
                        filter: false,
                        default: [
                            { language: "ru", value: "" },
                            { language: "com", value: "" },
                        ],
                    },
                ],
                // Вопросы
                [
                    {
                        label: "№",
                        value: "questions",
                        type: "list_additional_functionality",
                        wigth_panel: 850,
                        filter: false,
                        default: [],
                        title_add: "AddQuestion",
                        url_get_data: "/questions_test/",
                        add_data: {
                            label: [
                                { language: "ru", value: "" },
                                { language: "com", value: "" },
                            ],
                            img: "",
                            question: [
                                { language: "ru", value: "" },
                                { language: "com", value: "" },
                            ],
                            answers: [
                                { label: "", balls: "", is_status: false },
                            ],
                        },
                        additional_functionality: [
                            {
                                translation: true,
                                label: "EssenceQuestion",
                                value: "label",
                                type: "input_translation",
                                filter: true,
                                default: [
                                    { language: "ru", value: "" },
                                    { language: "com", value: "" },
                                ],
                            },
                            {
                                label: "PictureQuestion",
                                value: "img",
                                type: "img",
                                filter: false,
                                default: "",
                            },
                            {
                                translation: true,
                                label: "QuestionWording",
                                value: "question",
                                type: "input_edit_translation",
                                filter: true,
                                default: [
                                    { language: "ru", value: "" },
                                    { language: "com", value: "" },
                                ],
                            },
                            {
                                translation: true,
                                label: "",
                                value: "answers",
                                type: "list_answer_ball",
                                title_add: "AddAnswerPption",
                                filter: true,
                                add_data: {
                                    label: "",
                                    balls: "",
                                    is_status: false,
                                },
                                default: [
                                    { label: "", balls: "", is_status: false },
                                ],
                            },
                        ],
                    },
                ],
                // Результат
                [
                    {
                        translation: true,
                        label: "",
                        labels: ["PointsFromTo", "Explanation", "ColorCode"],
                        value: "result",
                        title_add: "AddResultOption",
                        type: "list_interval_ball_text_translation",
                        filter: false,
                        add_data: {
                            start_balls: "",
                            end_balls: "",
                            description: [
                                { language: "ru", value: "" },
                                { language: "com", value: "" },
                            ],
                            color: "",
                        },
                        default: [],
                    },
                ],
            ],
        },
    ],
};

export const optionTests = {
    delete_url: "/delete_test",
    url: "/re_test",
    fields: [
        {
            label: "Languages",
            value: "language",
            type: "box",
            filter: true,
            default: [],
            list_value: [
                { label: "Russian", value: "ru" },
                { label: "English", value: "com" },
            ],
        },
        {
            translation: true,
            label: "Label",
            value: "label",
            type: "input_translation",
            filter: true,
            default: [
                { language: "ru", value: "" },
                { language: "com", value: "" },
            ],
        },
        {
            label: "NumberPasses",
            value: "info_tooltip",
            value_tooltip: "number_passes_tooltip",
            type: "input_tooltip_test",
            filter: true,
            default: "",
        },
        {
            label: "NumberQuestions",
            value: "length_questions",
            type: "input",
            filter: true,
            default: "",
        },
    ],
};

export const optionCourses = {
    delete_url: "/delete_course",
    url: "/re_course",
    fields: [
        {
            label: "Languages",
            value: "language",
            type: "box",
            filter: true,
            default: [],
            list_value: [
                { label: "Russian", value: "ru" },
                { label: "English", value: "com" },
            ],
        },
        {
            translation: true,
            label: "Label",
            value: "label",
            type: "input_translation",
            filter: true,
            default: [
                { language: "ru", value: "" },
                { language: "com", value: "" },
            ],
        },
        {
            label: "NumberPasses",
            value: "info_tooltip",
            value_tooltip: "number_passes_tooltip",
            type: "input_tooltip_course",
            filter: true,
            default: "",
        },
        {
            label: "NumberLessons",
            value: "length_lessons",
            type: "input",
            filter: true,
            default: "",
        },
    ],
};

export const optionPoster = {
    delete_url: "/delete_live_sound",
    url: "/re_live_sound",
    fields: [
        {
            label: "Languages",
            value: "language",
            type: "box",
            filter: true,
            default: [],
            list_value: [
                { label: "Russian", value: "ru" },
                { label: "English", value: "com" },
            ],
        },
        {
            translation: true,
            label: "Label",
            value: "label_",
            type: "input_translation",
            filter: true,
            default: [
                { language: "ru", value: "" },
                { language: "com", value: "" },
            ],
        },
        {
            label: "EventDates",
            value: "date_event",
            type: "date",
            filter: true,
            default: "",
        },
        {
            label: "PosterPicture",
            value: "img",
            type: "img",
            filter: false,
            default: "",
        },
        {
            label: "LinkBuyTickets",
            value: "url",
            type: "input",
            filter: false,
            default: "",
        },
    ],
};

export const optionEditVideo = {
    delete_url: "/delete_video",
    url: "/re_video",
    fields: [
        {
            label: "Languages",
            value: "language",
            type: "box",
            filter: true,
            default: [],
            list_value: [
                { label: "Russian", value: "ru" },
                { label: "English", value: "com" },
            ],
        },
        {
            translation: true,
            label: "Label",
            value: "label_",
            type: "input_translation",
            filter: true,
            default: [
                { language: "ru", value: "" },
                { language: "com", value: "" },
            ],
        },
        {
            type: "double_fields",
            fields: [
                {
                    label: "Category",
                    value: "category",
                    type: "bool",
                    filter: true,
                    default: "classic",
                    list_value: [
                        { label: "VideoCategory1", value: "classic" },
                        { label: "VideoCategory2", value: "fusion" },
                        { label: "VideoCategory3", value: "meditation" },
                        { label: "VideoCategory4", value: "tool" },
                        { label: "VideoCategory5", value: "studies" },
                    ],
                },
                {
                    label: "Access",
                    value: "access",
                    type: "box",
                    not_see: true,
                    filter: true,
                    default: [],
                    list_value: [
                        {
                            label: "AccessValue1",
                            value: "Без регистрации",
                        },
                        { label: "AccessValue2", value: "Гость" },
                        { label: "AccessValue3", value: "Премиум" },
                        { label: "AccessValue4", value: "VIP" },
                    ],
                },
            ],
        },
        {
            translation: true,
            label: "PosterVideo",
            value: "poster_",
            type: "img_translation",
            filter: false,
            default: [
                { language: "ru", value: "" },
                { language: "com", value: "" },
            ],
        },
        {
            label: "Video",
            value: "video",
            type: "video",
            filter: false,
            default: "",
        },
        {
            translation: true,
            label: "Description",
            value: "text_",
            type: "inputarrea_translation",
            filter: false,
            default: [
                { language: "ru", value: "" },
                { language: "com", value: "" },
            ],
        },
        {
            label: "Level",
            value: "level",
            type: "bool",
            default: "",
            list_value: [
                { label: "LevelValue1", value: 1 },
                { label: "LevelValue2", value: 2 },
                { label: "LevelValue3", value: 3 },
                { label: "LevelValue4", value: 4 },
            ],
        },
        {
            label: "Style",
            value: "style",
            type: "bool",
            default: "",
            list_value: [
                { label: "StyleValue1", value: "Барокко" },
                { label: "StyleValue2", value: "Классицизм" },
                { label: "StyleValue3", value: "Романтизм" },
                { label: "StyleValue4", value: "Импрессионизм" },
                { label: "StyleValue5", value: "Авангард" },
                { label: "StyleValue6", value: "Кроссовер" },
                { label: "StyleValue7", value: "Современная" },
            ],
        },
        {
            label: "Instruments",
            value: "instruments",
            type: "box",
            filter: true,
            default: [],
            list_value: Tools,
        },
    ],
};

export const optionVideo = {
    delete_url: "/delete_video",
    url: "/re_video",
    fields: [
        {
            label: "Languages",
            value: "language",
            type: "box",
            filter: true,
            default: [],
            list_value: [
                { label: "Russian", value: "ru" },
                { label: "English", value: "com" },
            ],
        },
        {
            translation: true,
            label: "Label",
            value: "label_",
            type: "input_translation",
            filter: true,
            default: [
                { language: "ru", value: "" },
                { language: "com", value: "" },
            ],
        },
        {
            label: "Category",
            value: "category",
            type: "bool",
            filter: true,
            default: "classic",
            list_value: [
                { label: "VideoCategory1", value: "classic" },
                { label: "VideoCategory2", value: "fusion" },
                { label: "VideoCategory3", value: "meditation" },
                { label: "VideoCategory4", value: "tool" },
                { label: "VideoCategory5", value: "studies" },
            ],
        },
        {
            label: "Access",
            value: "access",
            type: "box",
            not_see: true,
            filter: true,
            default: [],
            list_value: [
                {
                    label: "AccessValue1",
                    value: "Без регистрации",
                },
                { label: "AccessValue2", value: "Гость" },
                { label: "AccessValue3", value: "Премиум" },
                { label: "AccessValue4", value: "VIP" },
            ],
        },
        {
            label: "NumberLike",
            value: "like_tooltip",
            value_tooltip: "number_passes_tooltip",
            type: "input_tooltip_like",
            filter: true,
            default: "",
        },
        {
            label: "NumberLaunches",
            value: "counter_start",
            // value_tooltip: 'number_passes_tooltip',
            // type: "input_tooltip_like",
            type: "input",
            filter: true,
            default: "",
        },
        {
            translation: true,
            label: "PosterVideo",
            value: "poster_",
            type: "img_translation",
            filter: false,
            default: [
                { language: "ru", value: "" },
                { language: "com", value: "" },
            ],
        },
        {
            label: "Video",
            value: "video",
            type: "video",
            filter: false,
            default: "",
        },
        {
            translation: true,
            label: "Description",
            value: "text_",
            type: "inputarrea_translation",
            filter: false,
            default: [
                { language: "ru", value: "" },
                { language: "com", value: "" },
            ],
        },
        {
            label: "Instruments",
            value: "instruments",
            type: "box",
            filter: true,
            default: [],
            list_value: Tools,
        },
    ],
};

export const optionEditAudio = {
    delete_url: "/delete_audio",
    url: "/re_audio",
    fields: [
        {
            label: "Languages",
            value: "language",
            type: "box",
            filter: true,
            default: [],
            list_value: [
                { label: "Russian", value: "ru" },
                { label: "English", value: "com" },
            ],
        },
        {
            translation: true,
            label: "Label",
            value: "label",
            type: "input_translation",
            filter: true,
            default: [
                { language: "ru", value: "" },
                { language: "com", value: "" },
            ],
        },
        {
            type: "double_fields",
            fields: [
                {
                    label: "Category",
                    value: "category",
                    type: "bool",
                    filter: true,
                    default: "Релакс",
                    list_value: [
                        { label: "AudioCategory1", value: "Релакс" },
                        { label: "AudioCategory2", value: "Активация" },
                        { label: "AudioCategory3", value: "Терапия" },
                        { label: "AudioCategory4", value: "studies" },
                    ],
                },
                {
                    label: "Access",
                    value: "access",
                    type: "box",
                    not_see: true,
                    filter: true,
                    default: [],
                    list_value: [
                        {
                            label: "AccessValue1",
                            value: "Без регистрации",
                        },
                        { label: "AccessValue2", value: "Гость" },
                        { label: "AccessValue3", value: "Премиум" },
                        { label: "AccessValue4", value: "VIP" },
                    ],
                },
            ],
        },
        {
            label: "NumberLike",
            value: "like",
            type: "input",
            filter: true,
            default: "",
        },
        {
            label: "Genre",
            value: "genre",
            type: "bool",
            filter: true,
            default: "Классика",
            list_value: [
                { label: "GenreValue1", value: "Классика" },
                { label: "GenreValue2", value: "Эмбиент" },
            ],
        },
        {
            label: "Level",
            value: "level",
            type: "bool",
            default: "",
            list_value: [
                { label: "LevelValue1", value: 1 },
                { label: "LevelValue2", value: 2 },
                { label: "LevelValue3", value: 3 },
                { label: "LevelValue4", value: 4 },
            ],
        },
        {
            label: "Style",
            value: "style",
            type: "bool",
            default: "",
            list_value: [
                { label: "StyleValue1", value: "Барокко" },
                { label: "StyleValue2", value: "Классицизм" },
                { label: "StyleValue3", value: "Романтизм" },
                { label: "StyleValue4", value: "Импрессионизм" },
                { label: "StyleValue5", value: "Авангард" },
                { label: "StyleValue6", value: "Кроссовер" },
                { label: "StyleValue7", value: "Современная" },
            ],
        },
        {
            label: "Instruments",
            value: "instruments",
            type: "box",
            filter: true,
            default: [],
            list_value: Tools,
        },
        {
            label: "Audio",
            value: "audio",
            type: "video",
            filter: false,
            default: "",
        },
    ],
};

export const optionAudio = {
    delete_url: "/delete_audio",
    url: "/re_audio",
    fields: [
        {
            label: "Languages",
            value: "language",
            type: "box",
            filter: true,
            default: [],
            list_value: [
                { label: "Russian", value: "ru" },
                { label: "English", value: "com" },
            ],
        },
        {
            translation: true,
            label: "Label",
            value: "label",
            type: "input_translation",
            filter: true,
            default: [
                { language: "ru", value: "" },
                { language: "com", value: "" },
            ],
        },
        {
            label: "Category",
            value: "category",
            type: "bool",
            filter: true,
            default: "Релакс",
            list_value: [
                { label: "AudioCategory1", value: "Релакс" },
                { label: "AudioCategory2", value: "Активация" },
                { label: "AudioCategory3", value: "Терапия" },
                { label: "AudioCategory4", value: "studies" },
            ],
        },
        {
            label: "NumberLike",
            value: "like_tooltip",
            value_tooltip: "number_passes_tooltip",
            type: "input_tooltip_like",
            filter: true,
            default: "",
        },
        {
            label: "NumberLaunches",
            value: "counter_start",
            // value_tooltip: 'number_passes_tooltip',
            // type: "input_tooltip_like",
            type: "input",
            filter: true,
            default: "",
        },
        {
            label: "Genre",
            value: "genre",
            type: "bool",
            filter: true,
            default: "Классика",
            list_value: [
                { label: "GenreValue1", value: "Классика" },
                { label: "GenreValue2", value: "Эмбиент" },
            ],
        },
        {
            label: "Instruments",
            value: "instruments",
            type: "box",
            filter: true,
            default: [],
            list_value: Tools,
        },
        {
            label: "Audio",
            value: "audio",
            type: "video",
            filter: false,
            default: "",
        },
    ],
};

export const optionCreateVideo = {
    url: "/create_video",
    fields: [
        {
            label: "Languages",
            value: "language",
            type: "box",
            filter: true,
            default: [],
            list_value: [
                { label: "Russian", value: "ru" },
                { label: "English", value: "com" },
            ],
        },
        {
            translation: true,
            label: "Label",
            value: "label_",
            type: "input_translation",
            filter: true,
            default: [
                { language: "ru", value: "" },
                { language: "com", value: "" },
            ],
        },
        {
            type: "double_fields",
            fields: [
                {
                    label: "Category",
                    value: "category",
                    type: "bool",
                    filter: true,
                    default: "classic",
                    list_value: [
                        { label: "VideoCategory1", value: "classic" },
                        { label: "VideoCategory2", value: "fusion" },
                        { label: "VideoCategory3", value: "meditation" },
                        { label: "VideoCategory4", value: "tool" },
                        { label: "VideoCategory5", value: "studies" },
                    ],
                },
                {
                    label: "Access",
                    value: "access",
                    type: "box",
                    not_see: true,
                    filter: true,
                    default: [],
                    list_value: [
                        {
                            label: "AccessValue1",
                            value: "Без регистрации",
                        },
                        { label: "AccessValue2", value: "Гость" },
                        { label: "AccessValue3", value: "Премиум" },
                        { label: "AccessValue4", value: "VIP" },
                    ],
                },
            ],
        },
        {
            translation: true,
            label: "PosterVideo",
            value: "poster_",
            type: "img_translation",
            filter: false,
            default: [
                { language: "ru", value: "" },
                { language: "com", value: "" },
            ],
        },
        {
            label: "Video",
            value: "video",
            type: "video",
            filter: false,
            default: "",
        },
        {
            translation: true,
            label: "Description",
            value: "text_",
            type: "inputarrea_translation",
            filter: false,
            default: [
                { language: "ru", value: "" },
                { language: "com", value: "" },
            ],
        },
        {
            label: "Level",
            value: "level",
            type: "bool",
            default: "",
            list_value: [
                { label: "LevelValue1", value: 1 },
                { label: "LevelValue2", value: 2 },
                { label: "LevelValue3", value: 3 },
                { label: "LevelValue4", value: 4 },
            ],
        },
        {
            label: "Style",
            value: "style",
            type: "bool",
            default: "",
            list_value: [
                { label: "StyleValue1", value: "Барокко" },
                { label: "StyleValue2", value: "Классицизм" },
                { label: "StyleValue3", value: "Романтизм" },
                { label: "StyleValue4", value: "Импрессионизм" },
                { label: "StyleValue5", value: "Авангард" },
                { label: "StyleValue6", value: "Кроссовер" },
                { label: "StyleValue7", value: "Современная" },
            ],
        },
        {
            label: "Instruments",
            value: "instruments",
            type: "box",
            filter: true,
            default: [],
            list_value: Tools,
        },
    ],
};

export const optionCreateAudio = {
    url: "/create_audio",
    fields: [
        {
            label: "Languages",
            value: "language",
            type: "box",
            filter: true,
            default: [],
            list_value: [
                { label: "Russian", value: "ru" },
                { label: "English", value: "com" },
            ],
        },
        {
            translation: true,
            label: "Label",
            value: "label",
            type: "input_translation",
            filter: true,
            default: "",
        },
        {
            type: "double_fields",
            fields: [
                {
                    label: "Category",
                    value: "category",
                    type: "bool",
                    filter: true,
                    default: "Релакс",
                    list_value: [
                        { label: "AudioCategory1", value: "Релакс" },
                        { label: "AudioCategory2", value: "Активация" },
                        { label: "AudioCategory3", value: "Терапия" },
                        { label: "AudioCategory4", value: "studies" },
                    ],
                },
                {
                    label: "Access",
                    value: "access",
                    type: "box",
                    not_see: true,
                    filter: true,
                    default: [],
                    list_value: [
                        {
                            label: "AccessValue1",
                            value: "Без регистрации",
                        },
                        { label: "AccessValue2", value: "Гость" },
                        { label: "AccessValue3", value: "Премиум" },
                        { label: "AccessValue4", value: "VIP" },
                    ],
                },
            ],
        },
        {
            label: "Genre",
            value: "genre",
            type: "bool",
            filter: true,
            default: "Классика",
            list_value: [
                { label: "GenreValue1", value: "Классика" },
                { label: "GenreValue2", value: "Эмбиент" },
            ],
        },
        {
            label: "Level",
            value: "level",
            type: "bool",
            default: "",
            list_value: [
                { label: "LevelValue1", value: 1 },
                { label: "LevelValue2", value: 2 },
                { label: "LevelValue3", value: 3 },
                { label: "LevelValue4", value: 4 },
            ],
        },
        {
            label: "Style",
            value: "style",
            type: "bool",
            default: "",
            list_value: [
                { label: "StyleValue1", value: "Барокко" },
                { label: "StyleValue2", value: "Классицизм" },
                { label: "StyleValue3", value: "Романтизм" },
                { label: "StyleValue4", value: "Импрессионизм" },
                { label: "StyleValue5", value: "Авангард" },
                { label: "StyleValue6", value: "Кроссовер" },
                { label: "StyleValue7", value: "Современная" },
            ],
        },
        {
            label: "Instruments",
            value: "instruments",
            type: "box",
            filter: true,
            default: [],
            list_value: Tools,
        },
        {
            label: "Audio",
            value: "audio",
            type: "video",
            filter: false,
            default: "",
        },
    ],
};

export const optionCreateLangs = {
    url: "/translation_create",
    fields: [
        {
            label: "Label",
            value: "name",
            type: "input",
            filter: false,
            default: "",
        },
        {
            label: "CodeLanguage",
            value: "code",
            type: "input",
            filter: false,
            default: "",
        },
    ],
};

export const optionCreatePoster = {
    url: "/create_live_sound",
    fields: [
        {
            label: "Languages",
            value: "language",
            type: "box",
            filter: true,
            default: [],
            list_value: [
                { label: "Russian", value: "ru" },
                { label: "English", value: "com" },
            ],
        },
        {
            translation: true,
            label: "Label",
            value: "label_",
            type: "input_translation",
            filter: true,
            default: [
                { language: "ru", value: "" },
                { language: "com", value: "" },
            ],
        },
        {
            label: "EventDates",
            value: "date_event",
            type: "date",
            filter: true,
            default: "",
        },
        {
            label: "PosterPicture",
            value: "img",
            type: "img",
            filter: false,
            default: "",
        },
        {
            label: "LinkBuyTickets",
            value: "url",
            type: "input",
            filter: false,
            default: "",
        },
    ],
};

// export const optionEditMaps = {
//     delete_url: "/delete_map",
//     url: "/re_map",
//     fields: [
//         {
//             label: "Languages",
//             value: "language",
//             type: "box",
//             filter: true,
//             default: [],
//             list_value: [
//                 { label: "Russian", value: "ru" },
//                 { label: "English", value: "com" },
//             ],
//         },
//         {
//             translation: true,
//             label: "Label",
//             value: "label_",
//             type: "input_translation",
//             filter: true,
//             default: [
//                 { language: "ru", value: "" },
//                 { language: "com", value: "" },
//             ],
//         },
//         {
//             translation: true,
//             label: "Картинка карты",
//             value: "img",
//             type: "img",
//             filter: false,
//             default: "",
//         },
//         {
//             label: "LinkBuyTickets",
//             value: "url",
//             type: "input",
//             filter: false,
//             default: "",
//         },
//     ],
// };

// export const optionMaps = {
//     delete_url: "/delete_map",
//     url: "/re_map",
//     fields: [
//         {
//             label: "Languages",
//             value: "language",
//             type: "box",
//             filter: true,
//             default: [],
//             list_value: [
//                 { label: "Russian", value: "ru" },
//                 { label: "English", value: "com" },
//             ],
//         },
//         {
//             translation: true,
//             label: "Label",
//             value: "label_",
//             type: "input_translation",
//             filter: true,
//             default: [
//                 { language: "ru", value: "" },
//                 { language: "com", value: "" },
//             ],
//         },
//         {
//             translation: true,
//             label: "Картинка карты",
//             value: "img",
//             type: "img",
//             filter: false,
//             default: "",
//         },
//         {
//             label: "LinkBuyTickets",
//             value: "url",
//             type: "input",
//             filter: false,
//             default: "",
//         },
//     ],
// };

// export const optionCreateMaps = {
//     url: "/create_map",
//     fields: [
//         {
//             label: "Languages",
//             value: "language",
//             type: "box",
//             filter: true,
//             default: [],
//             list_value: [
//                 { label: "Russian", value: "ru" },
//                 { label: "English", value: "com" },
//             ],
//         },
//         {
//             translation: true,
//             label: "Label",
//             value: "label_",
//             type: "input_translation",
//             filter: true,
//             default: [
//                 { language: "ru", value: "" },
//                 { language: "com", value: "" },
//             ],
//         },
//         {
//             translation: true,
//             label: "Картинка карты",
//             value: "img",
//             type: "img",
//             filter: false,
//             default: "",
//         },
//         {
//             label: "LinkBuyTickets",
//             value: "url",
//             type: "input",
//             filter: false,
//             default: "",
//         },
//     ],
// };
