import React from 'react';
import s from './PopupForm.module.scss';
import {usePopupForm} from "../../hooks/usePopupForm";


export const PopupForm = () => {
    const rootPopup = usePopupForm();

    if (!rootPopup.isOpen) {
        return null;
    }

    const folHandler = (e) => {
        e.stopPropagation();
    }

    return (
        <div className={s.blur} onClick={() => rootPopup.exitHandler()}>
            <div className={s.root} onClick={(e) => folHandler(e)}>
                {rootPopup.data}
            </div>
        </div>
    );
};
