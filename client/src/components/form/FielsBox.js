import GlobalStyle from "../GlobalStyle.module.scss";
import s from "../tableCard/Form.module.scss";
import React, {useEffect, useState} from "react";

export const FieldBox = ({label, name, change, value, list_value, st}) => {
    const [boxField, setBoxField] = useState([]);

    useEffect(() => {
        if (value && value.length > 0) {
            setBoxField(value);
        }
    }, [value]);

    const boxHandler = (data) => {
        let arr_1 = value;
        // if (!arr_1) {
        //
        // } else
        if (arr_1.indexOf(data) !== -1) {
            arr_1.splice(arr_1.indexOf(data), 1);
        } else {
            arr_1 = [...arr_1, data];
            arr_1 = [...new Set(arr_1)];
        }
        change({name, value: arr_1});
    }

    return (
        <>
            <div className={GlobalStyle.CustomFontRegular + ' ' + s.placeholder}>
                {label}
            </div>
            <div className={s.wrapper_bool}>
                {st ? (
                    <div className={s.root_click_}>
                        {list_value?.map((item, index) => (
                            <div key={index} className={s.button_input_b} onClick={() => boxHandler(item.value)}>
                                <div className={boxField.indexOf(item.value) !== -1 ? s.box_active : s.box}/>
                                <div className={s.clip_text}>
                                    {item.label}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                    <div className={s.root_click}>
                        {list_value?.slice(0, list_value.length/2 + 1).map((item, index) => (
                            <div key={index} className={s.button_input_b} onClick={() => boxHandler(item.value)}>
                                <div className={boxField.indexOf(item.value) !== -1 ? s.box_active : s.box}/>
                                <div className={s.clip_text}>
                                    {item.label}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={s.root_click}>
                        {list_value?.slice(list_value.length/2 + 1, list_value.length).map((item, index) => (
                            <div key={index} className={s.button_input_b} onClick={() => boxHandler(item.value)}>
                                <div className={boxField.indexOf(item.value) !== -1 ? s.box_active : s.box}/>
                                <div className={s.clip_text}>
                                    {item.label}
                                </div>
                            </div>
                        ))}
                    </div>
                    </>
                )}
            </div>
            {/*<div className={s.root_click_b}>*/}
            {/*    <div className={s.block_wrapper_b}>*/}
            {/*    <div className={s.button_input_b} onClick={() => boxHandler('Без регистрации')}>*/}
            {/*        <div className={boxField.indexOf('Без регистрации') !== -1 ? s.box_active : s.box}/>*/}
            {/*        <div className={s.clip_text}>*/}
            {/*            Без регистрации*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className={s.button_input_b} onClick={() => boxHandler('Гость')}>*/}
            {/*        <div className={boxField.indexOf('Гость') !== -1 ? s.box_active : s.box}  />*/}
            {/*        <div className={s.clip_text}>*/}
            {/*            Гость*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    </div>*/}
            {/*    <div className={s.block_wrapper_b}>*/}
            {/*    <div className={s.button_input_b} onClick={() => boxHandler('Премиум')}>*/}
            {/*        <div className={boxField.indexOf('Премиум') !== -1 ? s.box_active : s.box}  />*/}
            {/*        <div className={s.clip_text}>*/}
            {/*            Премиум*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className={s.button_input_b} onClick={() => boxHandler('VIP')}>*/}
            {/*        <div className={boxField.indexOf('VIP') !== -1 ? s.box_active : s.box}  />*/}
            {/*        <div className={s.clip_text}>*/}
            {/*            VIP*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    )
}
