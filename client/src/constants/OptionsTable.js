import React from "react";
import {FieldInput} from "../components/form/FielsInput";
import {FieldBool} from "../components/form/FielsBool";
import {FieldBox} from "../components/form/FielsBox";
import {FieldDate} from "../components/form/FielsDate";
import {FieldDateFull} from "../components/form/FielsDateFull";
import {FieldFile} from "../components/form/FielsFile";
import {FieldVideo} from "../components/form/FielsVideo";
import {FieldText} from "../components/form/FielsText";
import {FieldTextTranslation} from "../components/form/FielsTextTranslation";
import {FieldFileTranslation} from "../components/form/FielsFileTranslation";
import {FieldInputTranslation} from "../components/form/FielsInputTranslation";
import {FieldDoubleFields} from "../components/form/FielsDoubleFields";
import {FieldTemporaryAccessData} from "../components/form/FieldTemporaryAccessData";
import {FieldListMenu} from "../components/form/FieldListMenu";
import {FieldListAdditionalFunctionality} from "../components/form/FieldListAdditionalFunctionality";
import {FieldInputEditTranslation} from "../components/form/FieldInputEditTranslation";
import {FieldIntervalBallTextTranslation} from "../components/form/FieldIntervalBallTextTranslation";
import {FieldListAnswerBall} from "../components/form/FieldListAnswerBall";
import {Tools} from "../tools";
import {FieldFileOpen} from "../components/form/FieldFileOpen";
import {FieldDropDownList} from "../components/form/FielsDropDownList";
import {FieldStatistics} from "../components/form/FieldStatistics";
import {EmptyProps} from "../components/form/EmptyProps";

export const listField = ({item, change, value, optionLanguages, st, id_data, translations}) => {
    // console.log('pppp--------------------------', {item, change, value, optionLanguages, st})
    if (item.type === 'input') return <FieldInput translations={translations} label={item.label} name={item.value} change={change} value={value[item.value]} />;
    if (item.type === 'bool') return <FieldBool translations={translations} st={st} label={item.label} name={item.value} change={change} value={value[item.value]} list_value={item.list_value} />;
    if (item.type === 'box') return <FieldBox translations={translations} st={st} label={item.label} name={item.value} change={change} value={value[item.value]} list_value={item.list_value} />;
    if (item.type === 'date') return <FieldDate translations={translations} label={item.label} name={item.value} change={change} value={value[item.value]} />;
    if (item.type === 'date_full') return <FieldDateFull translations={translations} label={item.label} name={item.value} change={change} value={value[item.value]} isNowDate={item.isNowDate} />;
    if (item.type === 'img') return <FieldFile translations={translations} label={item.label} name={item.value} change={change} value={value[item.value]} />;
    if (item.type === 'video') return <FieldVideo translations={translations} label={item.label} name={item.value} change={change} value={value[item.value]} />;
    if (item.type === 'inputarrea') return <FieldText translations={translations} label={item.label} name={item.value} change={change} value={value[item.value]} />;
    if (item.type === 'inputarrea_translation') return <FieldTextTranslation translations={translations} label={item.label} name={item.value} change={change} value={value[item.value]} languages={optionLanguages} />;
    if (item.type === 'img_translation') return <FieldFileTranslation translations={translations} label={item.label} name={item.value} change={change} value={value[item.value]} languages={optionLanguages} />;
    if (item.type === 'input_translation') return <FieldInputTranslation translations={translations} label={item.label} name={item.value} change={change} value={value[item.value]} languages={optionLanguages} />;
    if (item.type === 'double_fields') return <FieldDoubleFields translations={translations} fields={item.fields} change={change} value={value} />;
    if (item.type === 'temporary_access_data') return <FieldTemporaryAccessData translations={translations} label={item.label} name={item.value} change={change} value={value[item.value]} url_get_data={item.url_get_data} />;
    if (item.type === 'list_menu') return <FieldListMenu translations={translations} id_data={id_data} labels={item.labels} list_menu_fields={item.list_menu_fields} change={change} value={value} />;
    if (item.type === 'list_additional_functionality') return <FieldListAdditionalFunctionality translations={translations} labelFunc={item.labelFunc} placeholder={item.placeholder} add_data={item.add_data} id_data={id_data} label={item.label} name={item.value} change={change} value={value[item.value]} url_get_data={item.url_get_data} additional_functionality={item.additional_functionality} title_add={item.title_add}/>;
    if (item.type === 'input_edit_translation') return <FieldInputEditTranslation translations={translations} translation={item.translation} label={item.label} name={item.value} change={change} value={value[item.value]} languages={optionLanguages} />;
    if (item.type === 'list_interval_ball_text_translation') return <FieldIntervalBallTextTranslation translations={translations} labels={item.labels} name={item.value} change={change} value={value[item.value]} languages={optionLanguages} add_data={item.add_data} title_add={item.title_add}/>;
    if (item.type === 'list_answer_ball') return <FieldListAnswerBall translations={translations} name={item.value} change={change} value={value[item.value]} languages={optionLanguages} add_data={item.add_data} title_add={item.title_add}/>;
    if (item.type === 'file_open') return <FieldFileOpen translations={translations} label={item.label} name={item.value} change={change} value={value[item.value]} />;
    if (item.type === 'drop_down_list') return <FieldDropDownList translations={translations} label={item.label} name={item.value} change={change} value={value[item.value]} url_get_data={item.url_get_data} valueIn={item.valueIn} labelIn={item.labelIn} />;
    if (item.type === 'statistics') return <FieldStatistics translations={translations} id_data={id_data} label={item.label} url_get_data={item.url_get_data}/>;
    if (item.type === 'empty_props') return <EmptyProps translations={translations} name={item.value} change={change} value={value[item.value]} additional_functionality={item.additional_functionality} id_data={id_data} st={st} />
    return null;
}

const dateToString = (date) => {
    date = new Date(date);

    let day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
    let month = date.getMonth() > 8 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
    let year = date.getFullYear();

    return `${day}.${month}.${year}`
}

export const sortNumberFunction = (data) => {
    let new_data = [...data];
    new_data.sort(function (a, b) {
        return a.number - b.number;
    });
    return  new_data;
}

export const optionUserView = {
    delete_url: '/delete_user',
    url: '/re_user',
    fields: [
        {
            label: 'Фамилия',
            value: 'fullName',
            type: "input",
            filter: true,
            default: '',
        },
        {
            label: 'Имя',
            value: 'name',
            type: "input",
            filter: true,
            default: '',
        },
        {
            label: 'Телефон',
            value: 'telephone',
            type: "input",
            filter: false,
            default: '',
        },
        {
            label: 'E-mail',
            value: 'email',
            type: "input",
            filter: false,
            default: '',
        },
        {
            label: 'Роль',
            value: 'type_admin',
            type: "bool",
            default: '',
            list_value: [{label: 'Администратор', value: 'Администратор'}, {label: 'Клиент', value: 'Клиент'}, {label: 'Музыкотерапевт', value: 'Музыкотерапевт'}],
        },
        {
            label: 'Уровень',
            value: 'access',
            type: "bool",
            default: '',
            list_value: [{label: 'Гость', value: 'Гость'}, {label: 'Премиум', value: 'Премиум'}, {label: 'VIP', value: 'VIP'}],
        },
        {
            label: 'Дата регистрации',
            value: 'registration_date',
            type: "date",
            filter: true,
            default: '',
        },
        {
            label: 'Дата последнего входа',
            value: 'date_last_activity',
            type: "date",
            filter: true,
            default: '',
        },
        {
            label: 'Количество дней активности',
            value: 'amount_activity',
            type: "input",
            filter: true,
            default: '',
        },
        {
            label: 'Количество просмотренных видео',
            value: 'counter_video',
            type: "input",
            filter: true,
            default: '',
        },
        {
            label: 'Количество прослушанных аудио',
            value: 'counter_audio',
            type: "input",
            filter: true,
            default: '',
        },
        {
            label: 'Статус',
            value: 'status',
            type: "status",
            filter: false,
            default: '',
        },
    ],
}

export const optionUser = {
    delete_url: '/delete_user',
    url: '/re_user',

    fields: [
        {
            type: "list_menu",
            labels: ["Информация", "Анкета", "Пароль", "Настройки", "Статистика", "Заметки"],
            list_menu_fields: [
                // Информация
                [
                    {
                        label: 'Фамилия',
                        value: 'fullName',
                        type: "input",
                        filter: true,
                        default: '',
                    },
                    {
                        label: 'Имя',
                        value: 'name',
                        type: "input",
                        filter: true,
                        default: '',
                    },
                    {
                        label: 'Телефон',
                        value: 'telephone',
                        type: "input",
                        filter: false,
                        default: '',
                    },
                    {
                        label: 'E-mail',
                        value: 'email',
                        type: "input",
                        filter: false,
                        default: '',
                    },
                    {
                        label: 'Дата регистрации',
                        value: 'registration_date',
                        type: "date",
                        filter: true,
                        default: '',
                    },
                    {
                        label: 'Дата последнего входа',
                        value: 'date_last_activity',
                        type: "date",
                        filter: true,
                        default: '',
                    },
                    {
                        label: 'Статус',
                        value: 'status',
                        type: "status",
                        filter: false,
                        default: '',
                    },
                ],
                // Анкета
                [
                    {
                        value: 'questionnaire',
                        type: "empty_props",
                        default: {},
                        additional_functionality: [
                            {
                                label: 'Дата рождения',
                                value: 'date_birth',
                                type: "date_full",
                                default: '',
                            },
                            {
                                label: 'Пол',
                                value: 'gender',
                                type: "bool",
                                default: '',
                                list_value: [{label: 'Мужской', value: 'Мужской'}, {
                                    label: 'Женский',
                                    value: 'Женский'
                                }, {label: 'Не указано', value: 'Не указано'}],
                            },
                            {
                                label: 'Страна рождения',
                                value: 'country_birth',
                                type: "input",
                                default: '',
                            },
                            {
                                label: 'Страна проживания',
                                value: 'country_residence',
                                type: "input",
                                default: '',
                            },
                            {
                                label: 'Город проживания',
                                value: 'city_residence',
                                type: "input",
                                default: '',
                            },
                            {
                                label: 'Какую музыку любите слушать?',
                                value: 'music',
                                type: "box",
                                default: '',
                                list_value: [{label: 'Классика', value: 'Классика'}, {
                                    label: 'Рок',
                                    value: 'Рок'
                                }, {label: 'Поп', value: 'Поп'},
                                    {label: 'Джаз', value: 'Джаз'}, {label: 'Рэп', value: 'Рэп'}, {
                                        label: 'Фольк',
                                        value: 'Фольк'
                                    },
                                    {label: 'Иное', value: 'Иное'}],
                            },
                            {
                                label: 'Кто вы по натуре?',
                                value: 'nature',
                                type: "bool",
                                default: '',
                                list_value: [{label: 'Интраверт', value: 'Интраверт'}, {
                                    label: 'Экстраверт',
                                    value: 'Экстраверт'
                                }, {label: 'Не знаю', value: 'Не знаю'}],
                            },
                            {
                                label: 'Ваш уровень знакомства с классикой',
                                value: 'level',
                                type: "bool",
                                default: '',
                                list_value: [{
                                    label: 'Не слушаю и не понимаю, или слушаю редко и мало',
                                    value: '0'
                                }, {label: 'Люблю популярную классику', value: '1'}
                                    , {
                                        label: 'Слушаю разную музыку разных эпох, разбираюсь в них',
                                        value: '2'
                                    }, {label: 'Имею академическое музыкальное образование', value: '3'}
                                    , {
                                        label: 'Хорошо разбираюсь в классической музыке, люблю слушать сложную музыку',
                                        value: '4'
                                    }],
                            },
                            {
                                label: 'Насколько активная у вас жизнь?',
                                value: 'active_life',
                                type: "bool",
                                default: '',
                                list_value: [{label: 'Очень активная', value: 'Очень активная'}, {
                                    label: 'Активная',
                                    value: 'Активная'
                                }, {label: 'Средняя', value: 'Средняя'},
                                    {label: 'Пассивная', value: 'Пассивная'}, {
                                        label: 'Очень пассивная',
                                        value: 'Очень пассивная'
                                    }],
                            },
                        ],
                    }
                ],
                // Пароль
                [
                    // {
                    //     value: 'questionnaire',
                    //     type: "empty_props",
                    //     default: {},
                    //     additional_functionality: [
                            {
                                label: 'Пароль',
                                value: 'password',
                                type: "input",
                                default: '',
                            },
                    //     ],
                    // }
                ],
                // Настройки
                [
                    // {
                    //     value: 'questionnaire',
                    //     type: "empty_props",
                    //     default: {},
                    //     additional_functionality: [
                            {
                                label: 'Язык',
                                value: 'language',
                                type: "bool",
                                default: '',
                                list_value: [{label: 'ру', value: 'ru'}, {label: 'eng', value: 'com'}],
                            },
                            {
                                label: 'Роль пользователя',
                                value: 'type_admin',
                                type: "bool",
                                default: '',
                                list_value: [{label: 'Администратор', value: 'Администратор'}, {
                                    label: 'Клиент',
                                    value: 'Клиент'
                                }, {label: 'Музыкотерапевт', value: 'Музыкотерапевт'}],
                            },
                            {
                                label: 'Уровень пользователя',
                                value: 'access',
                                type: "bool",
                                default: '',
                                list_value: [{label: 'Гость', value: 'Гость'}, {
                                    label: 'Премиум',
                                    value: 'Премиум'
                                }, {label: 'VIP', value: 'VIP'}],
                            },
                            {
                                label: 'Доступные онлайн курсы',
                                value: 'available_courses',
                                type: "temporary_access_data",
                                url_get_data: "/courses_mini_list",
                                default: [],
                            },
                            {
                                label: 'Назначенный музыкотерапевт',
                                value: 'musicTherapy',
                                valueIn: 'id',
                                labelIn: 'name',
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
                        label: '',
                        type: "statistics",
                        url_get_data: "/get_statistics_test/",
                    },
                ],
                // Заметки
                [
                    {
                        label: undefined,
                        labelFunc: (data) => `${dateToString(data.date)} ${data.label}`,
                        placeholder: 'note_writer_name',
                        value: 'notes',
                        type: "list_additional_functionality",
                        filter: false,
                        default: [],
                        title_add: "добавить заметки",
                        url_get_data: "/get_notes/",
                        add_data: {
                            date: "",
                            label: "",
                            text: "",
                        },
                        additional_functionality: [
                            {
                                label: 'Дата',
                                value: 'date',
                                type: "date_full",
                                default: '',
                                isNowDate: true,
                            },
                            {
                                label: 'Тема',
                                value: 'label',
                                type: "input",
                                default: '',
                            },
                            {
                                translation: false,
                                label: 'Детали',
                                value: 'text',
                                type: "input_edit_translation",
                                filter: true,
                                default: '',
                            },
                        ]
                    }
                ],
            ],
        },
    ],
}

export const optionUserCreate = {
    delete_url: '/delete_user',
    url: '/create_user',
    fields: [
        {
            label: 'Фамилия',
            value: 'fullName',
            type: "input",
            filter: true,
            default: '',
        },
        {
            label: 'Имя',
            value: 'name',
            type: "input",
            filter: true,
            default: '',
        },
        {
            label: 'Телефон',
            value: 'telephone',
            type: "input",
            filter: false,
            default: '',
        },
        {
            label: 'E-mail',
            value: 'email',
            type: "input",
            filter: false,
            default: '',
        },
        {
            label: 'Дата регистрации',
            value: 'registration_date',
            type: "date",
            filter: true,
            default: '',
        },
        {
            label: 'Дата последнего входа',
            value: 'date_last_activity',
            type: "date",
            filter: true,
            default: '',
        },
        {
            label: 'Статус',
            value: 'status',
            type: "status",
            filter: false,
            default: '',
        },
    ],
}

export const optionLanguages = [
    {
        label: "рус",
        value: "ru",
    },
    {
        label: "eng",
        value: "com",
    }
]

export const optionVersion = {
    url: '/re_version',
    fields: [
        {
            label: 'Актуальная версия (номер)',
            value: 'version',
            type: "input",
            default: '',
        },
        {
            translation: true,
            label: 'Текст для обновления',
            value: 'label',
            type: "input_translation",
            filter: true,
            default: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
        },
    ]
}

export const optionTranslation = {
    url: '/re_translation',
    fields: [
        {
            label: 'Русский (json файл)',
            value: 'ru',
            type: "file_open",
            filter: false,
            default: '',
        },
        {
            label: 'Английский (json файл)',
            value: 'com',
            type: "file_open",
            filter: false,
            default: '',
        },
    ],
}

export const optionTranslationAdmin = {
    url: '/re_translation_admin',
    fields: [
        {
            label: 'Русский (json файл)',
            value: 'ru',
            type: "file_open",
            filter: false,
            default: '',
        },
        {
            label: 'Английский (json файл)',
            value: 'com',
            type: "file_open",
            filter: false,
            default: '',
        },
    ],
}

export const optionCreateCourses = {
    delete_url: '/delete_course',
    url: '/create_course',

    fields: [
        {
            type: "list_menu",
            labels: ["Общие настройки", "Уроки", "Результат"],
            list_menu_fields: [
                // Общие настройки
                [
                    {
                        type: "double_fields",
                        fields: [
                            {
                                label: 'Язык',
                                value: 'language',
                                type: "box",
                                filter: true,
                                default: [],
                                list_value: [{label: 'Русский', value: 'ru'}, {label: 'Английский', value: 'com'}],
                            },
                            {
                                label: 'Доступно для',
                                value: 'access',
                                type: "box",
                                filter: true,
                                default: [],
                                list_value: [{label: 'Гость', value: 'Гость'}, {label: 'Премиум', value: 'Премиум'}, {label: 'VIP', value: 'VIP'}],
                            },
                        ]
                    },
                    {
                        translation: true,
                        label: 'Название',
                        value: 'label',
                        type: "input_translation",
                        filter: true,
                        default: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
                    },
                    {
                        label: 'Картинка превью',
                        value: 'poster',
                        type: "img",
                        filter: false,
                        default: "",
                    },
                    {
                        translation: true,
                        label: 'Описание',
                        value: 'description',
                        type: "inputarrea_translation",
                        filter: false,
                        default: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
                    },
                    {
                        translation: true,
                        label: 'Инструкции',
                        value: 'instruction',
                        type: "inputarrea_translation",
                        filter: false,
                        default: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
                    },
                ],
                // Уроки
                [
                    {
                        label: '№',
                        value: 'lessons',
                        type: "list_additional_functionality",
                        filter: false,
                        default: [],
                        title_add: "добавить урок",
                        url_get_data: "/lessons_course/",
                        add_data: {
                            label: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
                            video: "",
                            text: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
                        },
                        additional_functionality: [
                            {
                                translation: true,
                                label: 'Тема урока',
                                value: 'label',
                                type: "input_translation",
                                filter: true,
                                default: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
                            },
                            {
                                label: 'Картинка превью',
                                value: 'poster',
                                type: "img",
                                filter: false,
                                default: "",
                            },
                            {
                                label: 'Видео урока',
                                value: 'video',
                                type: "video",
                                filter: false,
                                default: '',
                            },
                            {
                                translation: true,
                                label: 'Текст урока',
                                value: 'text',
                                type: "input_edit_translation",
                                filter: true,
                                default: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
                            },
                        ]
                    },
                ],
                // Результат
                [
                    {
                        translation: true,
                        label: 'Текст по итогам прохождения курса',
                        value: 'result_text',
                        type: "inputarrea_translation",
                        filter: false,
                        default: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
                    },
                ],
            ],
        },
    ],
}

export const optionCreateTests = {
    delete_url: '/delete_test',
    url: '/create_test',
    fields: [
        {
            type: "list_menu",
            labels: ["Общие настройки", "Вопросы-ответы", "Результат"],
            list_menu_fields: [
                // Общие настройки
                [
                    {
                        type: "double_fields",
                        fields: [
                            {
                                label: 'Язык',
                                value: 'language',
                                type: "box",
                                filter: true,
                                default: [],
                                list_value: [{label: 'Русский', value: 'ru'}, {label: 'Английский', value: 'com'}],
                            },
                            {
                                label: 'Доступно для',
                                value: 'access',
                                type: "box",
                                filter: true,
                                default: [],
                                list_value: [{label: 'Гость', value: 'Гость'}, {label: 'Премиум', value: 'Премиум'}, {label: 'VIP', value: 'VIP'}],
                            },
                        ]
                    },
                    {
                        translation: true,
                        label: 'Название',
                        value: 'label',
                        type: "input_translation",
                        filter: true,
                        default: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
                    },
                    {
                        label: 'Картинка превью',
                        value: 'poster',
                        type: "img",
                        filter: false,
                        default: "",
                    },
                    {
                        translation: true,
                        label: 'Описание',
                        value: 'description',
                        type: "inputarrea_translation",
                        filter: false,
                        default: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
                    },
                    {
                        translation: true,
                        label: 'Инструкции',
                        value: 'instruction',
                        type: "inputarrea_translation",
                        filter: false,
                        default: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
                    },
                ],
                // Вопросы
                [
                    {
                        label: '№',
                        value: 'questions',
                        type: "list_additional_functionality",
                        filter: false,
                        default: [],
                        title_add: "добавить вопрос",
                        url_get_data: "/questions_test/",
                        add_data: {
                            label: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
                            img: "",
                            question: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
                            answers: [{label: '', balls: '', is_status: false}],
                        },
                        additional_functionality: [
                            {
                                translation: true,
                                label: 'Суть вопроса',
                                value: 'label',
                                type: "input_translation",
                                filter: true,
                                default: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
                            },
                            {
                                label: 'Картинка вопроса',
                                value: 'img',
                                type: "img",
                                filter: false,
                                default: "",
                            },
                            {
                                translation: true,
                                label: 'Формулировка вопроса',
                                value: 'question',
                                type: "input_edit_translation",
                                filter: true,
                                default: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
                            },
                            {
                                translation: true,
                                label: '',
                                value: 'answers',
                                type: "list_answer_ball",
                                title_add: "добавить вариант ответа",
                                filter: true,
                                add_data: {
                                    label: "",
                                    balls: "",
                                    is_status: false,
                                },
                                default: [{label: '', balls: '', is_status: false}],
                            },
                        ]
                    },
                ],
                // Результат
                [
                    {
                        translation: true,
                        label: '',
                        labels: ['Баллы от... до...', 'Объяснение'],
                        value: 'result',
                        title_add: "добавить вариант результата",
                        type: "list_interval_ball_text_translation",
                        filter: false,
                        add_data: {
                            start_balls: "",
                            end_balls: "",
                            description: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
                        },
                        default: [],
                    },
                ],
            ],
        },
    ],
}

export const optionEditCourses = {
    delete_url: '/delete_course',
    url: '/re_course',
    fields: [
        {
            type: "list_menu",
            labels: ["Общие настройки", "Уроки", "Результат"],
            list_menu_fields: [
                // Общие настройки
                [
                    {
                        type: "double_fields",
                        fields: [
                            {
                                label: 'Язык',
                                value: 'language',
                                type: "box",
                                filter: true,
                                default: [],
                                list_value: [{label: 'Русский', value: 'ru'}, {label: 'Английский', value: 'com'}],
                            },
                            {
                                label: 'Доступно для',
                                value: 'access',
                                type: "box",
                                filter: true,
                                default: [],
                                list_value: [{label: 'Гость', value: 'Гость'}, {label: 'Премиум', value: 'Премиум'}, {label: 'VIP', value: 'VIP'}],
                            },
                        ]
                    },
                    {
                        translation: true,
                        label: 'Название',
                        value: 'label',
                        type: "input_translation",
                        filter: true,
                        default: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
                    },
                    {
                        label: 'Картинка превью',
                        value: 'poster',
                        type: "img",
                        filter: false,
                        default: "",
                    },
                    {
                        translation: true,
                        label: 'Описание',
                        value: 'description',
                        type: "inputarrea_translation",
                        filter: false,
                        default: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
                    },
                    {
                        translation: true,
                        label: 'Инструкции',
                        value: 'instruction',
                        type: "inputarrea_translation",
                        filter: false,
                        default: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
                    },
                ],
                // Уроки
                [
                    {
                        label: '№',
                        value: 'lessons',
                        type: "list_additional_functionality",
                        filter: false,
                        default: [],
                        title_add: "добавить урок",
                        url_get_data: "/lessons_course/",
                        add_data: {
                            label: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
                            video: "",
                            text: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
                        },
                        additional_functionality: [
                            {
                                translation: true,
                                label: 'Тема урока',
                                value: 'label',
                                type: "input_translation",
                                filter: true,
                                default: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
                            },
                            {
                                label: 'Картинка превью',
                                value: 'poster',
                                type: "img",
                                filter: false,
                                default: "",
                            },
                            {
                                label: 'Видео урока',
                                value: 'video',
                                type: "video",
                                filter: false,
                                default: '',
                            },
                            {
                                translation: true,
                                label: 'Текст урока',
                                value: 'text',
                                type: "input_edit_translation",
                                filter: true,
                                default: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
                            },
                        ]
                    },
                ],
                // Результат
                [
                    {
                        translation: true,
                        label: 'Текст по итогам прохождения курса',
                        value: 'result_text',
                        type: "inputarrea_translation",
                        filter: false,
                        default: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
                    },
                ],
            ],
        },
    ],
}

export const optionEditTests = {
    delete_url: '/delete_test',
    url: '/re_test',
    fields: [
        {
            type: "list_menu",
            labels: ["Общие настройки", "Вопросы-ответы", "Результат"],
            list_menu_fields: [
                // Общие настройки
                [
                    {
                        type: "double_fields",
                        fields: [
                            {
                                label: 'Язык',
                                value: 'language',
                                type: "box",
                                filter: true,
                                default: [],
                                list_value: [{label: 'Русский', value: 'ru'}, {label: 'Английский', value: 'com'}],
                            },
                            {
                                label: 'Доступно для',
                                value: 'access',
                                type: "box",
                                filter: true,
                                default: [],
                                list_value: [{label: 'Гость', value: 'Гость'}, {label: 'Премиум', value: 'Премиум'}, {label: 'VIP', value: 'VIP'}],
                            },
                        ]
                    },
                    {
                        translation: true,
                        label: 'Название',
                        value: 'label',
                        type: "input_translation",
                        filter: true,
                        default: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
                    },
                    {
                        label: 'Картинка превью',
                        value: 'poster',
                        type: "img",
                        filter: false,
                        default: "",
                    },
                    {
                        translation: true,
                        label: 'Описание',
                        value: 'description',
                        type: "inputarrea_translation",
                        filter: false,
                        default: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
                    },
                    {
                        translation: true,
                        label: 'Инструкции',
                        value: 'instruction',
                        type: "inputarrea_translation",
                        filter: false,
                        default: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
                    },
                ],
                // Вопросы
                [
                    {
                        label: '№',
                        value: 'questions',
                        type: "list_additional_functionality",
                        filter: false,
                        default: [],
                        title_add: "добавить вопрос",
                        url_get_data: "/questions_test/",
                        add_data: {
                            label: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
                            img: "",
                            question: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
                            answers: [{label: '', balls: '', is_status: false}],
                        },
                        additional_functionality: [
                            {
                                translation: true,
                                label: 'Суть вопроса',
                                value: 'label',
                                type: "input_translation",
                                filter: true,
                                default: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
                            },
                            {
                                label: 'Картинка вопроса',
                                value: 'img',
                                type: "img",
                                filter: false,
                                default: "",
                            },
                            {
                                translation: true,
                                label: 'Формулировка вопроса',
                                value: 'question',
                                type: "input_edit_translation",
                                filter: true,
                                default: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
                            },
                            {
                                translation: true,
                                label: '',
                                value: 'answers',
                                type: "list_answer_ball",
                                title_add: "добавить вариант ответа",
                                filter: true,
                                add_data: {
                                    label: "",
                                    balls: "",
                                    is_status: false,
                                },
                                default: [{label: '', balls: '', is_status: false}],
                            },
                        ]
                    },
                ],
                // Результат
                [
                    {
                        translation: true,
                        label: '',
                        labels: ['Баллы от... до...', 'Объяснение', 'Цвет в шестнадцатеричном значении (#RRGGBB)'],
                        value: 'result',
                        title_add: "добавить вариант результата",
                        type: "list_interval_ball_text_translation",
                        filter: false,
                        add_data: {
                            start_balls: "",
                            end_balls: "",
                            description: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
                            color: "",
                        },
                        default: [],
                    },
                ],
            ],
        },
    ],
}

export const optionTests = {
    delete_url: '/delete_test',
    url: '/re_test',
    fields: [
        {
            label: 'Язык',
            value: 'language',
            type: "box",
            filter: true,
            default: [],
            list_value: [{label: 'Русский', value: 'ru'}, {label: 'Английский', value: 'com'}],
        },
        {
            translation: true,
            label: 'Название',
            value: 'label',
            type: "input_translation",
            filter: true,
            default: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
        },
        {
            label: 'Количество прохождений',
            value: 'info_tooltip',
            value_tooltip: 'number_passes_tooltip',
            type: "input_tooltip_test",
            filter: true,
            default: '',
        },
        {
            label: 'Количество вопросов',
            value: 'length_questions',
            type: "input",
            filter: true,
            default: '',
        },
    ],
}

export const optionCourses = {
    delete_url: '/delete_course',
    url: '/re_course',
    fields: [
        {
            label: 'Язык',
            value: 'language',
            type: "box",
            filter: true,
            default: [],
            list_value: [{label: 'Русский', value: 'ru'}, {label: 'Английский', value: 'com'}],
        },
        {
            translation: true,
            label: 'Название',
            value: 'label',
            type: "input_translation",
            filter: true,
            default: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
        },
        {
            label: 'Количество прохождений',
            value: 'info_tooltip',
            value_tooltip: 'number_passes_tooltip',
            type: "input_tooltip_course",
            filter: true,
            default: '',
        },
        {
            label: 'Количество занятий',
            value: 'length_lessons',
            type: "input",
            filter: true,
            default: '',
        },
    ],
}

export const optionPoster = {
    delete_url: '/delete_live_sound',
    url: '/re_live_sound',
    fields: [
        {
            label: 'Язык',
            value: 'language',
            type: "box",
            filter: true,
            default: [],
            list_value: [{label: 'Русский', value: 'ru'}, {label: 'Английский', value: 'com'}],
        },
        {
            translation: true,
            label: 'Название',
            value: 'label_',
            type: "input_translation",
            filter: true,
            default: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
        },
        {
            label: 'Даты мероприятия',
            value: 'date_event',
            type: "date",
            filter: true,
            default: '',
        },
        {
            label: 'Картинка афиши',
            value: 'img',
            type: "img",
            filter: false,
            default: '',
        },
        {
            label: 'Ссылка на покупку билетов',
            value: 'url',
            type: "input",
            filter: false,
            default: '',
        },
    ],
}

export const optionEditVideo = {
    delete_url: '/delete_video',
    url: '/re_video',
    fields: [
        {
            label: 'Язык',
            value: 'language',
            type: "box",
            filter: true,
            default: [],
            list_value: [{label: 'Русский', value: 'ru'}, {label: 'Английский', value: 'com'}],
        },
        {
            translation: true,
            label: 'Название',
            value: 'label_',
            type: "input_translation",
            filter: true,
            default: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
        },
        {
            type: "double_fields",
            fields: [
                {
                    label: 'Категория',
                    value: 'category',
                    type: "bool",
                    filter: true,
                    default: 'classic',
                    list_value: [{label: 'Классика HD', value: 'classic'}, {label: 'Fusion', value: 'fusion'}, {label: 'Медитация', value: 'meditation'}, {label: 'Инструменты', value: 'tool'}],
                },
                {
                    label: 'Доступно для',
                    value: 'access',
                    type: "box",
                    not_see: true,
                    filter: true,
                    default: [],
                    list_value: [{label: 'Без регистрации', value: 'Без регистрации'}, {label: 'Гость', value: 'Гость'}, {label: 'Премиум', value: 'Премиум'}, {label: 'VIP', value: 'VIP'}],
                },
            ]
        },
        {
            translation: true,
            label: 'Постер для видео',
            value: 'poster_',
            type: "img_translation",
            filter: false,
            default: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
        },
        {
            label: 'Видео',
            value: 'video',
            type: "video",
            filter: false,
            default: '',
        },
        {
            translation: true,
            label: 'Описание',
            value: 'text_',
            type: "inputarrea_translation",
            filter: false,
            default: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
        },
        {
            label: 'Уровень',
            value: 'level',
            type: "bool",
            default: '',
            list_value: [{label: '1. Популярная классика', value: 1}, {label: '2. Легкая классика', value: 2}, {label: '3. Академическая классика', value: 3},
                {label: '4. Сложная классика', value: 4}],
        },
        {
            label: 'Стиль',
            value: 'style',
            type: "bool",
            default: '',
            list_value: [{label: 'Барокко', value: 'Барокко'}, {label: 'Классицизм', value: 'Классицизм'}, {label: 'Романтизм', value: 'Романтизм'},
                {label: 'Импрессионизм', value: 'Импрессионизм'}, {label: 'Авангард', value: 'Авангард'}, {label: 'Кроссовер', value: 'Кроссовер'}, {label: 'Современная', value: 'Современная'}],
        },
        {
            label: 'Инструменты',
            value: 'instruments',
            type: "box",
            filter: true,
            default: [],
            list_value: Tools,
        },
    ],
}

export const optionVideo = {
    delete_url: '/delete_video',
    url: '/re_video',
    fields: [
        {
            label: 'Язык',
            value: 'language',
            type: "box",
            filter: true,
            default: [],
            list_value: [{label: 'Русский', value: 'ru'}, {label: 'Английский', value: 'com'}],
        },
        {
            translation: true,
            label: 'Название',
            value: 'label_',
            type: "input_translation",
            filter: true,
            default: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
        },
        {
            label: 'Категория',
            value: 'category',
            type: "bool",
            filter: true,
            default: 'classic',
            list_value: [{label: 'Классика HD', value: 'classic'}, {label: 'Fusion', value: 'fusion'}, {label: 'Медитация', value: 'meditation'}, {label: 'Инструменты', value: 'tool'}],
        },
        {
            label: 'Доступно для',
            value: 'access',
            type: "box",
            not_see: true,
            filter: true,
            default: [],
            list_value: [{label: 'Без регистрации', value: 'Без регистрации'}, {label: 'Гость', value: 'Гость'}, {label: 'Премиум', value: 'Премиум'}, {label: 'VIP', value: 'VIP'}],
        },
        {
            label: 'Количество лайков',
            value: 'like_tooltip',
            value_tooltip: 'number_passes_tooltip',
            type: "input_tooltip_like",
            filter: true,
            default: '',
        },
        {
            label: 'Количество запусков',
            value: 'counter_start',
            // value_tooltip: 'number_passes_tooltip',
            // type: "input_tooltip_like",
            type: 'input',
            filter: true,
            default: '',
        },
        {
            translation: true,
            label: 'Постер для видео',
            value: 'poster_',
            type: "img_translation",
            filter: false,
            default: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
        },
        {
            label: 'Видео',
            value: 'video',
            type: "video",
            filter: false,
            default: '',
        },
        {
            translation: true,
            label: 'Описание',
            value: 'text_',
            type: "inputarrea_translation",
            filter: false,
            default: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
        },
        {
            label: 'Инструменты',
            value: 'instruments',
            type: "box",
            filter: true,
            default: [],
            list_value: Tools,
        },
    ],
}

export const optionEditAudio = {
    delete_url: '/delete_audio',
    url: '/re_audio',
    fields: [
        {
            label: 'Язык',
            value: 'language',
            type: "box",
            filter: true,
            default: [],
            list_value: [{label: 'Русский', value: 'ru'}, {label: 'Английский', value: 'com'}],
        },
        {
            translation: true,
            label: 'Название',
            value: 'label',
            type: "input_translation",
            filter: true,
            default: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
        },
        {
            type: "double_fields",
            fields: [
                {
                    label: 'Категория',
                    value: 'category',
                    type: "bool",
                    filter: true,
                    default: 'Релакс',
                    list_value: [{label: 'Релакс', value: 'Релакс'}, {label: 'Активация', value: 'Активация'}, {label: 'Терапия', value: 'Терапия'}],
                },
                {
                    label: 'Доступно для',
                    value: 'access',
                    type: "box",
                    not_see: true,
                    filter: true,
                    default: [],
                    list_value: [{label: 'Без регистрации', value: 'Без регистрации'}, {label: 'Гость', value: 'Гость'}, {label: 'Премиум', value: 'Премиум'}, {label: 'VIP', value: 'VIP'}],
                },
            ]
        },
        {
            label: 'Количество лайков',
            value: 'like',
            type: "input",
            filter: true,
            default: '',
        },
        {
            label: 'Жанр',
            value: 'genre',
            type: "bool",
            filter: true,
            default: 'Классика',
            list_value: [{label: 'Классика', value: 'Классика'}, {label: 'Эмбиент', value: 'Эмбиент'}],
        },
        {
            label: 'Уровень',
            value: 'level',
            type: "bool",
            default: '',
            list_value: [{label: '1. Популярная классика', value: 1}, {label: '2. Легкая классика', value: 2}, {label: '3. Академическая классика', value: 3},
                {label: '4. Сложная классика', value: 4}],
        },
        {
            label: 'Стиль',
            value: 'style',
            type: "bool",
            default: '',
            list_value: [{label: 'Барокко', value: 'Барокко'}, {label: 'Классицизм', value: 'Классицизм'}, {label: 'Романтизм', value: 'Романтизм'},
                {label: 'Импрессионизм', value: 'Импрессионизм'}, {label: 'Авангард', value: 'Авангард'}, {label: 'Кроссовер', value: 'Кроссовер'}, {label: 'Современная', value: 'Современная'}],
        },
        {
            label: 'Инструменты',
            value: 'instruments',
            type: "box",
            filter: true,
            default: [],
            list_value: Tools,
        },
        {
            label: 'Аудио',
            value: 'audio',
            type: "video",
            filter: false,
            default: '',
        },
    ],
}

export const optionAudio = {
    delete_url: '/delete_audio',
    url: '/re_audio',
    fields: [
        {
            label: 'Язык',
            value: 'language',
            type: "box",
            filter: true,
            default: [],
            list_value: [{label: 'Русский', value: 'ru'}, {label: 'Английский', value: 'com'}],
        },
        {
            translation: true,
            label: 'Название',
            value: 'label',
            type: "input_translation",
            filter: true,
            default: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
        },
        {
            label: 'Категория',
            value: 'category',
            type: "bool",
            filter: true,
            default: 'Релакс',
            list_value: [{label: 'Релакс', value: 'Релакс'}, {label: 'Активация', value: 'Активация'}, {label: 'Терапия', value: 'Терапия'}],
        },
        {
            label: 'Количество лайков',
            value: 'like_tooltip',
            value_tooltip: 'number_passes_tooltip',
            type: "input_tooltip_like",
            filter: true,
            default: '',
        },
        {
            label: 'Количество запусков',
            value: 'counter_start',
            // value_tooltip: 'number_passes_tooltip',
            // type: "input_tooltip_like",
            type: 'input',
            filter: true,
            default: '',
        },
        {
            label: 'Жанр',
            value: 'genre',
            type: "bool",
            filter: true,
            default: 'Классика',
            list_value: [{label: 'Классика', value: 'Классика'}, {label: 'Эмбиент', value: 'Эмбиент'}],
        },
        {
            label: 'Инструменты',
            value: 'instruments',
            type: "box",
            filter: true,
            default: [],
            list_value: Tools,
        },
        {
            label: 'Аудио',
            value: 'audio',
            type: "video",
            filter: false,
            default: '',
        },
    ],
}

export const optionCreateVideo = {
    url: '/create_video',
    fields: [
        {
            label: 'Язык',
            value: 'language',
            type: "box",
            filter: true,
            default: [],
            list_value: [{label: 'Русский', value: 'ru'}, {label: 'Английский', value: 'com'}],
        },
        {
            translation: true,
            label: 'Название',
            value: 'label_',
            type: "input_translation",
            filter: true,
            default: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
        },
        {
            type: "double_fields",
            fields: [
                {
                    label: 'Категория',
                    value: 'category',
                    type: "bool",
                    filter: true,
                    default: 'classic',
                    list_value: [{label: 'Классика HD', value: 'classic'}, {label: 'Fusion', value: 'fusion'}, {label: 'Медитация', value: 'meditation'}, {label: 'Инструменты', value: 'tool'}],
                },
                {
                    label: 'Доступно для',
                    value: 'access',
                    type: "box",
                    not_see: true,
                    filter: true,
                    default: [],
                    list_value: [{label: 'Без регистрации', value: 'Без регистрации'}, {label: 'Гость', value: 'Гость'}, {label: 'Премиум', value: 'Премиум'}, {label: 'VIP', value: 'VIP'}],
                },
            ]
        },
        {
            translation: true,
            label: 'Постер для видео',
            value: 'poster_',
            type: "img_translation",
            filter: false,
            default: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
        },
        {
            label: 'Видео',
            value: 'video',
            type: "video",
            filter: false,
            default: '',
        },
        {
            translation: true,
            label: 'Описание',
            value: 'text_',
            type: "inputarrea_translation",
            filter: false,
            default: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
        },
        {
            label: 'Уровень',
            value: 'level',
            type: "bool",
            default: '',
            list_value: [{label: '1. Популярная классика', value: 1}, {label: '2. Легкая классика', value: 2}, {label: '3. Академическая классика', value: 3},
                {label: '4. Сложная классика', value: 4}],
        },
        {
            label: 'Стиль',
            value: 'style',
            type: "bool",
            default: '',
            list_value: [{label: 'Барокко', value: 'Барокко'}, {label: 'Классицизм', value: 'Классицизм'}, {label: 'Романтизм', value: 'Романтизм'},
                {label: 'Импрессионизм', value: 'Импрессионизм'}, {label: 'Авангард', value: 'Авангард'}, {label: 'Кроссовер', value: 'Кроссовер'}, {label: 'Современная', value: 'Современная'}],
        },
        {
            label: 'Инструменты',
            value: 'instruments',
            type: "box",
            filter: true,
            default: [],
            list_value: Tools,
        },
    ],
}

export const optionCreateAudio = {
    url: '/create_audio',
    fields: [
        {
            label: 'Язык',
            value: 'language',
            type: "box",
            filter: true,
            default: [],
            list_value: [{label: 'Русский', value: 'ru'}, {label: 'Английский', value: 'com'}],
        },
        {
            translation: true,
            label: 'Название',
            value: 'label',
            type: "input_translation",
            filter: true,
            default: '',
        },
        {
            type: "double_fields",
            fields: [
                {
                    label: 'Категория',
                    value: 'category',
                    type: "bool",
                    filter: true,
                    default: 'Релакс',
                    list_value: [{label: 'Релакс', value: 'Релакс'}, {label: 'Активация', value: 'Активация'}, {label: 'Терапия', value: 'Терапия'}],
                },
                {
                    label: 'Доступно для',
                    value: 'access',
                    type: "box",
                    not_see: true,
                    filter: true,
                    default: [],
                    list_value: [{label: 'Без регистрации', value: 'Без регистрации'}, {label: 'Гость', value: 'Гость'}, {label: 'Премиум', value: 'Премиум'}, {label: 'VIP', value: 'VIP'}],
                },

            ]
        },
        {
            label: 'Жанр',
            value: 'genre',
            type: "bool",
            filter: true,
            default: 'Классика',
            list_value: [{label: 'Классика', value: 'Классика'}, {label: 'Эмбиент', value: 'Эмбиент'}],
        },
        {
            label: 'Уровень',
            value: 'level',
            type: "bool",
            default: '',
            list_value: [{label: '1. Популярная классика', value: 1}, {label: '2. Легкая классика', value: 2}, {label: '3. Академическая классика', value: 3},
                {label: '4. Сложная классика', value: 4}],
        },
        {
            label: 'Стиль',
            value: 'style',
            type: "bool",
            default: '',
            list_value: [{label: 'Барокко', value: 'Барокко'}, {label: 'Классицизм', value: 'Классицизм'}, {label: 'Романтизм', value: 'Романтизм'},
                {label: 'Импрессионизм', value: 'Импрессионизм'}, {label: 'Авангард', value: 'Авангард'}, {label: 'Кроссовер', value: 'Кроссовер'}, {label: 'Современная', value: 'Современная'}],
        },
        {
            label: 'Инструменты',
            value: 'instruments',
            type: "box",
            filter: true,
            default: [],
            list_value: Tools,
        },
        {
            label: 'Аудио',
            value: 'audio',
            type: "video",
            filter: false,
            default: '',
        },
    ],
}

export const optionCreatePoster = {
    url: '/create_live_sound',
    fields: [
        {
            label: 'Язык',
            value: 'language',
            type: "box",
            filter: true,
            default: [],
            list_value: [{label: 'Русский', value: 'ru'}, {label: 'Английский', value: 'com'}],
        },
        {
            translation: true,
            label: 'Название',
            value: 'label_',
            type: "input_translation",
            filter: true,
            default: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
        },
        {
            label: 'Даты мероприятия',
            value: 'date_event',
            type: "date",
            filter: true,
            default: '',
        },
        {
            label: 'Картинка афиши',
            value: 'img',
            type: "img",
            filter: false,
            default: '',
        },
        {
            label: 'Ссылка на покупку билетов',
            value: 'url',
            type: "input",
            filter: false,
            default: '',
        },
    ],
}

export const optionEditMaps = {
    delete_url: '/delete_map',
    url: '/re_map',
    fields: [
        {
            label: 'Язык',
            value: 'language',
            type: "box",
            filter: true,
            default: [],
            list_value: [{label: 'Русский', value: 'ru'}, {label: 'Английский', value: 'com'}],
        },
        {
            translation: true,
            label: 'Название',
            value: 'label_',
            type: "input_translation",
            filter: true,
            default: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
        },
        {
            translation: true,
            label: 'Картинка карты',
            value: 'img',
            type: "img",
            filter: false,
            default: '',
        },
        {
            label: 'Ссылка на покупку билетов',
            value: 'url',
            type: "input",
            filter: false,
            default: '',
        },
    ],
}

export const optionMaps = {
    delete_url: '/delete_map',
    url: '/re_map',
    fields: [
        {
            label: 'Язык',
            value: 'language',
            type: "box",
            filter: true,
            default: [],
            list_value: [{label: 'Русский', value: 'ru'}, {label: 'Английский', value: 'com'}],
        },
        {
            translation: true,
            label: 'Название',
            value: 'label_',
            type: "input_translation",
            filter: true,
            default: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
        },
        {
            translation: true,
            label: 'Картинка карты',
            value: 'img',
            type: "img",
            filter: false,
            default: '',
        },
        {
            label: 'Ссылка на покупку билетов',
            value: 'url',
            type: "input",
            filter: false,
            default: '',
        },
    ],
}

export const optionCreateMaps = {
    url: '/create_map',
    fields: [
        {
            label: 'Язык',
            value: 'language',
            type: "box",
            filter: true,
            default: [],
            list_value: [{label: 'Русский', value: 'ru'}, {label: 'Английский', value: 'com'}],
        },
        {
            translation: true,
            label: 'Название',
            value: 'label_',
            type: "input_translation",
            filter: true,
            default: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
        },
        {
            translation: true,
            label: 'Картинка карты',
            value: 'img',
            type: "img",
            filter: false,
            default: '',
        },
        {
            label: 'Ссылка на покупку билетов',
            value: 'url',
            type: "input",
            filter: false,
            default: '',
        },
    ],
}
