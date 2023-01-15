import React, { useContext, useEffect, useState } from "react";
import s from "./Header.module.scss";
import GlobalStyle from "../GlobalStyle.module.scss";
import { usePopupForm } from "../../hooks/usePopupForm";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { FormReEmail } from "./FormReEmail";
import { FormRePassword } from "./FormRePassword";
import {
    optionTranslation,
    optionTranslationAdmin,
    optionVersion,
} from "../../constants/OptionsTable";
import { useHttp } from "../../hooks/http.hook";
import { FormReTranslation } from "./FormReTranslation";
import { checkLanguageConst } from "../../hooks/translashion";
import { FormVersion } from "./FormVersion";
import { LogoApp } from "../../Settings/Components/LogoApp/LogoApp";
import { GlobalSvgSelector } from "../../assets/icons/global/GlobalSvgSelector";
import { FormSelect } from "./FormSelect";

const label_menu = [
    {
        label: "Users",
        url: "/admin_panel/users",
    },
    {
        label: "Video",
        url: "/admin_panel/video",
    },
    {
        label: "Audio",
        url: "/admin_panel/audio",
    },
    {
        label: "Playlists",
        url: "/admin_panel/playlists",
    },
    {
        label: "Events",
        url: "/admin_panel/posters",
    },
    // {
    //     label: 'Карты',
    //     url: '/admin_panel/maps'
    // },
    {
        label: "Tests",
        url: "/admin_panel/tests",
    },
    {
        label: "Course",
        url: "/admin_panel/courses",
    },
    // {
    //     label: '?',
    //     url: '/admin_panel/consultant'
    // },
];

const label_menu_fin = [
    {
        label: "Users",
        url: "/admin_panel/users_fin",
    },
];

export const Header = () => {
    const popupForm = usePopupForm();
    const auth = useContext(AuthContext);
    const { request, error, clearError, loading } = useHttp();
    const [status, setStatus] = useState(false);
    const [version, setVersion] = useState(null);
    const [active_list_menu, set_active_list_menu] = useState(label_menu_fin);

    const getVersion = async () => {
        try {
            const answer = await request(`/api/data/version`, "GET", null, {
                Authorization: auth.token,
            });
            setVersion(answer.version);
        } catch (e) {}
    };

    useEffect(() => {
        if (auth.type_admin === "Администратор") {
            set_active_list_menu(label_menu);
        }
    }, [auth.type_admin]);

    useEffect(() => {
        getVersion();
    }, []);

    const profileHandler = () => {
        setStatus(!status);
    };

    const reEmailHandler = () => {
        profileHandler();
        popupForm.openHandler(<FormReEmail />);
    };

    const rePasswordHandler = () => {
        profileHandler();
        popupForm.openHandler(<FormRePassword />);
    };

    const logoutHandler = () => {
        profileHandler();
        auth.logout();
    };

    const translationHandler = () => {
        profileHandler();
        popupForm.openHandler(
            <FormReTranslation option={optionTranslation} status={true} />
        );
    };

    const translationAdminHandler = () => {
        profileHandler();
        popupForm.openHandler(
            <FormReTranslation option={optionTranslationAdmin} status={true} />
        );
    };

    const versionHandler = () => {
        profileHandler();
        popupForm.openHandler(
            <FormVersion
                data={version}
                option={optionVersion}
                reload={getVersion}
                status={false}
            />
        );
    };

    const selectLenHandler = () => {
        popupForm.openHandler(
            <FormSelect
                title={"SelectLanguage"}
                data={auth.languages_list}
                value_code={"code"}
                label_code={"name"}
                select_handler={auth.newLanguage}
                selectedValue={auth.language}
            />
        );
    };

    return (
        <>
            <div className={s.root}>
                <div className={s.block}>
                    <LogoApp translations={auth.translations} />
                    {/* <img src={logo} alt="Logo" style={s.logo} />

                    <div
                        className={
                            GlobalStyle.BellotaFontRegular + " " + s.label
                        }
                    >
                        {checkLanguageConst(
                            "ApplicationName",
                            auth.translations
                        )}
                    </div> */}

                    <div className={s.menu}>
                        {active_list_menu.map((item, index) => (
                            <NavLink
                                to={item.url}
                                key={item.label}
                                className={s.button_item}
                                activeClassName={s.button_item_active}
                            >
                                <div
                                    className={
                                        GlobalStyle.CustomFontRegular +
                                        " " +
                                        s.item_label
                                    }
                                >
                                    {checkLanguageConst(
                                        item.label,
                                        auth.translations
                                    )}
                                </div>
                            </NavLink>
                        ))}
                    </div>
                </div>
                <div className={s.lines}>
                    <div className={s.lang}>
                        <div
                            onClick={() => selectLenHandler()}
                            className={s.lenBut}
                        >
                            {checkLanguageConst("Language", auth.translations)}
                            {": "}
                            {auth.languages_list?.find(
                                (item) => item.code === auth.language
                            )
                                ? checkLanguageConst(
                                      auth.languages_list?.find(
                                          (item) => item.code === auth.language
                                      ).name,
                                      auth.translations
                                  )
                                : ""}
                            <div
                                style={{
                                    marginLeft: 8,
                                }}
                            >
                                <GlobalSvgSelector id="edit_mini" />
                            </div>
                        </div>
                        {/* <div
                            onClick={() => auth.newLanguage("com")}
                            className={
                                GlobalStyle.CustomFontMedium +
                                " " +
                                (auth.language === "com"
                                    ? s.lang_item_active
                                    : s.lang_item)
                            }
                        >
                            {checkLanguageConst("eng", auth.translations)}
                        </div> */}
                    </div>
                    <div
                        className={
                            status ? s.block_profile_active : s.block_profile
                        }
                    >
                        <div
                            className={s.block_profile_header}
                            onClick={() => profileHandler()}
                        >
                            {status ? (
                                <div
                                    className={
                                        GlobalStyle.CustomFontMedium +
                                        " " +
                                        s.email
                                    }
                                >
                                    {auth.email}
                                </div>
                            ) : null}
                            <div className={s.profile}>
                                <div
                                    className={
                                        GlobalStyle.CustomFontRegular +
                                        " " +
                                        s.label_profile
                                    }
                                >
                                    A
                                </div>
                            </div>
                        </div>
                        {status ? (
                            <div className={s.list_button}>
                                {auth.type_admin === "Администратор" ? (
                                    <>
                                        <div
                                            className={s.button_profile_item}
                                            onClick={() => versionHandler()}
                                        >
                                            <div
                                                className={
                                                    GlobalStyle.CustomFontMedium +
                                                    " " +
                                                    s.button_profile_item_text
                                                }
                                            >
                                                {checkLanguageConst(
                                                    "ApplicationVersion",
                                                    auth.translations
                                                )}
                                            </div>
                                        </div>
                                        <NavLink
                                            to={"/admin_panel/lengs/"}
                                            className={s.button_profile_item}
                                            activeClassName={
                                                s.button_profile_item
                                            }
                                            onClick={() => profileHandler()}
                                        >
                                            <div
                                                className={
                                                    GlobalStyle.CustomFontMedium +
                                                    " " +
                                                    s.button_profile_item_text
                                                }
                                            >
                                                {checkLanguageConst(
                                                    "Languages",
                                                    auth.translations
                                                )}
                                            </div>
                                        </NavLink>
                                        <div
                                            className={s.button_profile_item}
                                            onClick={() => translationHandler()}
                                        >
                                            <div
                                                className={
                                                    GlobalStyle.CustomFontMedium +
                                                    " " +
                                                    s.button_profile_item_text
                                                }
                                            >
                                                {checkLanguageConst(
                                                    "ApplicationTranslations",
                                                    auth.translations
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className={s.button_profile_item}
                                            onClick={() =>
                                                translationAdminHandler()
                                            }
                                        >
                                            <div
                                                className={
                                                    GlobalStyle.CustomFontMedium +
                                                    " " +
                                                    s.button_profile_item_text
                                                }
                                            >
                                                {checkLanguageConst(
                                                    "AdminTranslations",
                                                    auth.translations
                                                )}
                                            </div>
                                        </div>
                                    </>
                                ) : null}
                                <div
                                    className={s.button_profile_item}
                                    onClick={() => rePasswordHandler()}
                                >
                                    <div
                                        className={
                                            GlobalStyle.CustomFontMedium +
                                            " " +
                                            s.button_profile_item_text
                                        }
                                    >
                                        {checkLanguageConst(
                                            "ChangePassword",
                                            auth.translations
                                        )}
                                    </div>
                                </div>
                                <div
                                    className={s.button_profile_item}
                                    onClick={() => reEmailHandler()}
                                >
                                    <div
                                        className={
                                            GlobalStyle.CustomFontMedium +
                                            " " +
                                            s.button_profile_item_text
                                        }
                                    >
                                        {checkLanguageConst(
                                            "ChangedE-mail",
                                            auth.translations
                                        )}
                                    </div>
                                </div>
                                <div
                                    className={s.button_profile_item}
                                    onClick={() => logoutHandler()}
                                >
                                    <div
                                        className={
                                            GlobalStyle.CustomFontMedium +
                                            " " +
                                            s.button_profile_item_text
                                        }
                                    >
                                        {checkLanguageConst(
                                            "Logout",
                                            auth.translations
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    );
};
