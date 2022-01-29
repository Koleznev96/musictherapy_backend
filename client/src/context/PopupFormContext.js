import {createContext} from "react";

function noop(){}

export const PopupFormContext = createContext({
    isOpen: null,
    data: null,
    openHandler: noop,
    exitHandler: noop,
});
