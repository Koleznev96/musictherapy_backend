import { createContext } from "react";

function noop() {}

export const AuthContext = createContext({
    token: null,
    login: noop,
    logout: noop,
    isAuthenticated: false,
    email: null,
    newEmail: null,
    type_admin: null,
    name: null,
    language: null,
    newLanguage: noop,
    translations: null,
    languages_list: null,
    get_list_lengs: noop,
});
