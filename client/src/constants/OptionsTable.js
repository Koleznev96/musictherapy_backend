export const optionUser = {
    url: '/re_user',
    fields: [
        {
            label: 'Фамилия',
            value: 'fullName',
            type: "input",
            filter: true,
        },
        {
            label: 'Имя',
            value: 'name',
            type: "input",
            filter: true,
        },
        {
            label: 'Телефон',
            value: 'telephone',
            type: "input",
            filter: false,
        },
        {
            label: 'E-mail',
            value: 'email',
            type: "input",
            filter: false,
        },
        {
            label: 'Дата регистрации',
            value: 'registration_date',
            type: "date",
            filter: true,
        },
        {
            label: 'Дата последнего входа',
            value: 'date_last_activity',
            type: "date",
            filter: true,
        },
        {
            label: 'Статус',
            value: 'status',
            type: "status",
            filter: false,
        },
    ],
}

export const optionPoster = {
    delete_url: '/delete_live_sound',
    url: '/re_live_sound',
    fields: [
        {
            label: 'Название',
            value: 'label',
            type: "input",
            filter: true,
        },
        {
            label: 'Даты мероприятия',
            value: 'date_event',
            type: "date",
            filter: true,
        },
        {
            label: 'Картинка афиши',
            value: 'img',
            type: "img",
            filter: false,
        },
        {
            label: 'Ссылку на покупку билетов',
            value: 'url',
            type: "input",
            filter: false,
        },
    ],
}

export const optionVideo = {
    delete_url: '/delete_video',
    url: '/re_video',
    fields: [
        {
            label: 'Название',
            value: 'label',
            type: "input",
            filter: true,
        },
        {
            label: 'Категория',
            value: 'category',
            type: "bool",
            filter: true,
        },
        {
            label: 'Постер для видео',
            value: 'poster',
            type: "img",
            filter: false,
        },
        {
            label: 'Видео',
            value: 'video',
            type: "video",
            filter: false,
        },
        {
            label: 'Описание',
            value: 'text',
            type: "inputarrea",
            filter: false,
        },
        {
            label: 'E-mail',
            value: 'email',
            type: "input",
            filter: false,
        },
    ],
}

export const optionCreateVideo = {
    url: '/create_video',
    fields: [
        {
            label: 'Название',
            value: 'label',
            type: "input",
            filter: true,
        },
        {
            label: 'Категория',
            value: 'category',
            type: "bool",
            filter: true,
        },
        {
            label: 'Постер для видео',
            value: 'poster',
            type: "img",
            filter: false,
        },
        {
            label: 'Видео',
            value: 'video',
            type: "video",
            filter: false,
        },
        {
            label: 'Описание',
            value: 'text',
            type: "inputarrea",
            filter: false,
        },
        {
            label: 'E-mail',
            value: 'email',
            type: "input",
            filter: false,
        },
    ],
}

export const optionCreatePoster = {
    url: '/create_live_sound',
    fields: [
        {
            label: 'Название',
            value: 'label',
            type: "input",
            filter: true,
        },
        {
            label: 'Даты мероприятия',
            value: 'date_event',
            type: "date",
            filter: true,
        },
        {
            label: 'Картинка афиши',
            value: 'img',
            type: "img",
            filter: false,
        },
        {
            label: 'Ссылку на покупку билетов',
            value: 'url',
            type: "input",
            filter: false,
        },
    ],
}
