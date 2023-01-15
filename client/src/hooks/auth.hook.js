import { useState, useCallback, useEffect } from "react";
import { useHttp } from "./http.hook";

const storageName = "userData";

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [ready, setReady] = useState(false);
    const [email, setEmail] = useState(null);
    const [type_admin, set_type_admin] = useState(null);
    const [name, set_name] = useState(null);
    const [language, setLanguage] = useState(null);
    const [translations, setTranslations] = useState(null);
    const { loading, request, error, clearError } = useHttp();
    const [languages_list, setLanguages_list] = useState([]);

    const newEmail = useCallback((email) => {
        setEmail(email);

        localStorage.setItem("email", JSON.stringify(email));
    }, []);

    const login = useCallback((jwtToken, email, type_admin, name) => {
        setToken(jwtToken);
        setEmail(email);
        set_type_admin(type_admin);
        set_name(name);

        localStorage.setItem(
            storageName,
            JSON.stringify({
                token: jwtToken,
            })
        );
        localStorage.setItem("email", JSON.stringify(email));
        localStorage.setItem("type_admin", JSON.stringify(type_admin));
        localStorage.setItem("name", JSON.stringify(name));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setEmail(null);
        set_type_admin(null);

        localStorage.removeItem(storageName);
    }, []);

    const getTranslations = async (language_) => {
        try {
            const data = await request(
                `/api/admin_panel/translations/admin/${language_}`,
                "GET",
                null,
                {
                    Authorization: `${token}`,
                }
            );
            setTranslations(data);
        } catch (e) {
            console.log("error-", e);
        }
    };

    const newLanguage = async (language_) => {
        setLanguage(language_);
        await localStorage.setItem("language", language_);
        await getTranslations(language_);
    };

    const get_list_lengs = async () => {
        try {
            const data = await request(`/api/admin_panel/lengs`, "GET", null, {
                Authorization: `${token}`,
            });
            setLanguages_list(data);
        } catch (e) {}
    };

    useEffect(() => {
        get_list_lengs();
        const data = JSON.parse(localStorage.getItem(storageName));
        const email = JSON.parse(localStorage.getItem("email"));
        const type_admin = JSON.parse(localStorage.getItem("type_admin"));
        const name = JSON.parse(localStorage.getItem("name"));
        const language_ = localStorage.getItem("language");
        newLanguage(language_ ? language_ : "ru");

        if (data && data.token && email && type_admin && name) {
            login(data.token, email, type_admin, name);
        }
        setReady(true);
    }, [login]);

    return {
        login,
        logout,
        token,
        ready,
        email,
        newEmail,
        type_admin,
        name,
        language,
        newLanguage,
        translations,
        languages_list,
        get_list_lengs,
    };
};
