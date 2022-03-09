export const optionUser = {
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
            default: '',
        },
    ]
}

export const optionTranslation = {
    url: '/re_translation',
    fields: [
        {
            label: 'Русский (json файл)',
            value: 'ru',
            type: "video",
            filter: false,
            default: '',
        },
        {
            label: 'Английский (json файл)',
            value: 'com',
            type: "video",
            filter: false,
            default: '',
        },
    ],
}

export const optionPassword = {
    fields: [
        {
            label: 'Пароль',
            value: 'password',
            type: "input",
            default: '',
        },
    ],
}

export const optionQuestionnaire = {
    fields: [
        {
            label: 'Язык',
            value: 'language',
            type: "bool",
            default: '',
            list_value: [{label: 'ру', value: 'ру'}, {label: 'eng', value: 'eng'}],
        },
        {
            label: 'Дата рождения',
            value: 'date_birth',
            type: "date",
            default: '',
        },
        {
            label: 'Пол',
            value: 'gender',
            type: "bool",
            default: '',
            list_value: [{label: 'Мужской', value: 'Мужской'}, {label: 'Женский', value: 'Женский'}, {label: 'Другой', value: 'Другой'}],
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
            list_value: [{label: 'Классика', value: 'Классика'}, {label: 'Рок', value: 'Рок'}, {label: 'Поп', value: 'Поп'},
                {label: 'Джаз', value: 'Джаз'}, {label: 'Рэп', value: 'Рэп'}, {label: 'Фольк', value: 'Фольк'},
                {label: 'Иное', value: 'Иное'}],
        },
        {
            label: 'Кто вы по натуре?',
            value: 'nature',
            type: "bool",
            default: '',
            list_value: [{label: 'Интраверт', value: 'Интраверт'}, {label: 'Экстраверт', value: 'Экстраверт'}, {label: 'Не знаю', value: 'Не знаю'}],
        },
        {
            label: 'Ваш уровень знакомства с классикой',
            value: 'level',
            type: "bool",
            default: '',
            list_value: [{label: 'Не слушаю и не понимаю, или слушаю редко и мало', value: '0'}, {label: 'Люблю популярную классику', value: '1'}
                , {label: 'Слушаю разную музыку разных эпох, разбираюсь в них', value: '2'}, {label: 'Имею академическое музыкальное образование', value: '3'}
                , {label: 'Хорошо разбираюсь в классической музыке, люблю слушать сложную музыку', value: '4'}],
        },
        {
            label: 'Насколько активная у вас жизнь?',
            value: 'active_life',
            type: "bool",
            default: '',
            list_value: [{label: 'Очень активная', value: 'Очень активная'}, {label: 'Активная', value: 'Активная'}, {label: 'Средняя', value: 'Средняя'},
                {label: 'Пассивная', value: 'Пассивная'}, {label: 'Очень пассивная', value: 'Очень пассивная'}],
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
            value: 'label',
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
            default: 'classic',
            list_value: [{label: 'Классика HD', value: 'classic'}, {label: 'Медитация', value: 'meditation'}, {label: 'Инструменты', value: 'tool'}],
        },
        {
            label: 'Количество лайков',
            value: 'like',
            type: "input",
            filter: true,
            default: '',
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
            translation: true,
            label: 'Постер для видео',
            value: 'poster',
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
            value: 'text',
            type: "inputarrea_translation",
            filter: false,
            default: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
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
            label: 'Инструменты',
            value: 'instruments',
            type: "box",
            filter: true,
            default: [],
            list_value: [{label: 'Рояль', value: 'Рояль'}, {label: 'Флейта', value: 'Флейта'}, {label: 'Виолончель', value: 'Виолончель'}, {label: 'Скрипка', value: 'Скрипка'},
                {label: 'Вокал', value: 'Вокал'}, {label: 'Арфа', value: 'Арфа'}, {label: 'Клавесин', value: 'Клавесин'}, {label: 'Орган', value: 'Орган'}, ],
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
            default: 'classic',
            list_value: [{label: 'Классика HD', value: 'classic'}, {label: 'Медитация', value: 'meditation'}, {label: 'Инструменты', value: 'tool'}],
        },
        {
            label: 'Доступно для',
            value: 'access',
            type: "box",
            filter: true,
            default: [],
            list_value: [{label: 'Без регистрации', value: 'Без регистрации'}, {label: 'Гость', value: 'Гость'}, {label: 'Премиум', value: 'Премиум'}, {label: 'VIP', value: 'VIP'}],
        },
        {
            translation: true,
            label: 'Постер для видео',
            value: 'poster',
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
            value: 'text',
            type: "inputarrea_translation",
            filter: false,
            default: [{language: 'ru', value: ''}, {language: 'com', value: ''}],
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
            label: 'Категория',
            value: 'category',
            type: "bool",
            filter: true,
            default: 'Релакс',
            list_value: [{label: 'Релакс', value: 'Релакс'}, {label: 'Активация', value: 'Активация'}, {label: 'Терапия', value: 'Терапия'}],
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
            list_value: [{label: 'Рояль', value: 'Рояль'}, {label: 'Флейта', value: 'Флейта'}, {label: 'Виолончель', value: 'Виолончель'}, {label: 'Скрипка', value: 'Скрипка'},
                {label: 'Вокал', value: 'Вокал'}, {label: 'Арфа', value: 'Арфа'}, {label: 'Клавесин', value: 'Клавесин'}, {label: 'Орган', value: 'Орган'}, ],
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
            value: 'label',
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
