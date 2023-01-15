export const checkLanguage = (field, language) => {
    let data = field?.find(item => item?.language === language && item.value?.length);
    if (!data) return field[0].value;
    return data.value;
}

export const checkLanguageConst = (value, translations) => {
    if (!value) return '';
    return (translations && translations[value]) ? translations[value] : value;
}
