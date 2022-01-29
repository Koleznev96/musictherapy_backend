import React, {useState} from "react";
import {PopupFormContext} from '../context/PopupFormContext';

export const PopupFormProvider = ({children, ...props}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState(null);

    const openHandler = (new_data) => {
        setData(new_data);
        setIsOpen(true);
    }

    const exitHandler = () => {
        setData(null);
        setIsOpen(false);
    }

    return <PopupFormContext.Provider
        value={{
            isOpen,
            data,
            openHandler,
            exitHandler,
        }}
        {...props}
    >
        {children}
    </PopupFormContext.Provider>
}
