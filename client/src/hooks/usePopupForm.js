import {useContext} from "react";
import {PopupFormContext} from "../context/PopupFormContext";

export const usePopupForm = () => useContext(PopupFormContext);
