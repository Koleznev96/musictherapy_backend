import GlobalStyle from "../GlobalStyle.module.scss";
import s from "../tableCard/Form.module.scss";
import React, {useState} from "react";
import {listField, optionLanguages} from "../../constants/OptionsTable";
import {checkLanguageConst} from "../../hooks/translashion";

export const FieldListMenu = ({labels, list_menu_fields, change, value, id_data, translations}) => {
    const [itemMenu, setItemMenu] = useState(0);
    return (
        <>
            <div className={s.liner_menu}>
                {labels?.map((item, index) => (
                    <div
                        onClick={() => setItemMenu(index)}
                        className={s.liner_menu_item + (itemMenu === index ? (' ' + s.liner_menu_item_active): '')}
                    >
                        {checkLanguageConst(item, translations)}
                    </div>
                ))}
            </div>
            {(
                list_menu_fields[itemMenu]?.map(item => {
                    return listField({translations, item: item, change: change, value: value, optionLanguages: optionLanguages, id_data: id_data})
                })
            )}
        </>
    )
}
