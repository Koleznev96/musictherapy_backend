import GlobalStyle from "../GlobalStyle.module.scss";
import s from "../tableCard/Form.module.scss";
import React, {useEffect, useState} from "react";

export const FieldBool = ({label, name, change, value, name_two, value_two, label_two}) => {
    const [statusField, setStatusField] = useState('classic');
    const [boxField, setBoxField] = useState([]);

    useEffect(() => {
        if (value && value.length > 0) {
            setStatusField(value);
        } else {
            change({name, value: 'classic'});
        }
    }, [value]);

    useEffect(() => {
        if (value_two && value_two.length > 0) {
            setBoxField(value_two);
        } else {
            change({name: name_two, value: []});
        }
    }, [value_two]);

    const clickHandler = (data) => {
        change({name, value: data});
    }

    const boxHandler = (data) => {
        let arr_1 = value_two;
        if (arr_1.indexOf(data) !== -1) {
            arr_1.splice(arr_1.indexOf(data), 1);
        } else {
            arr_1 = [...arr_1, data];
            arr_1 = [...new Set(arr_1)];
        }
        change({name: name_two, value: arr_1});
    }

    return (
        <div className={s.wrapper_box}>
            <div className={s.block_root}>
                <div className={GlobalStyle.CustomFontRegular + ' ' + s.placeholder}>
                    {label}
                </div>
                <div className={s.root_click}>
                    <div className={s.button_input} onClick={() => clickHandler('classic')}>
                        <div className={statusField === 'classic' ? s.clip_active : s.clip}/>
                        <div className={s.clip_text}>
                            Классика HD
                        </div>
                    </div>
                    <div className={s.button_input} onClick={() => clickHandler('meditation')}>
                        <div className={statusField === 'meditation' ? s.clip_active : s.clip}  />
                        <div className={s.clip_text}>
                            Медитация
                        </div>
                    </div>
                    <div className={s.button_input} onClick={() => clickHandler('tool')}>
                        <div className={statusField === 'tool' ? s.clip_active : s.clip}  />
                        <div className={s.clip_text}>
                            Инструменты
                        </div>
                    </div>
                </div>
            </div>
            <div className={s.block_root}>
                <div className={GlobalStyle.CustomFontRegular + ' ' + s.placeholder}>
                    {label_two}
                </div>
                <div className={s.root_click}>
                    <div className={s.button_input} onClick={() => boxHandler('Без регистрации')}>
                        <div className={boxField.indexOf('Без регистрации') !== -1 ? s.box_active : s.box}/>
                        <div className={s.clip_text}>
                            Без регистрации
                        </div>
                    </div>
                    <div className={s.button_input} onClick={() => boxHandler('Гость')}>
                        <div className={boxField.indexOf('Гость') !== -1 ? s.box_active : s.box}  />
                        <div className={s.clip_text}>
                            Гость
                        </div>
                    </div>
                    <div className={s.button_input} onClick={() => boxHandler('Премиум')}>
                        <div className={boxField.indexOf('Премиум') !== -1 ? s.box_active : s.box}  />
                        <div className={s.clip_text}>
                            Премиум
                        </div>
                    </div>
                    <div className={s.button_input} onClick={() => boxHandler('VIP')}>
                        <div className={boxField.indexOf('VIP') !== -1 ? s.box_active : s.box}  />
                        <div className={s.clip_text}>
                            VIP
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
