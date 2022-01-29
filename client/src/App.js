import React from 'react';
import './styles/index.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContext } from './context/authContext';
import { createTheme } from '@mui/material/styles';
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import {useAuth} from "./hooks/auth.hook";
import {useRoutes} from "./Routes";
import {PopupFormProvider} from "./provider/PopupFormProvider";
import {PopupForm} from "./components/popupForm/PopupForm";
import DateAdapter from '@mui/lab/AdapterDayjs';
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {ColorsStyles} from "./constants/ColorsStyles";

const theme = createTheme({
    palette: {
        primary: {
            light: '#FEDAD0',
            main: ColorsStyles.colorButton,
            dark: ColorsStyles.colorButton,
            contrastText: '#fff',
        },
        secondary: {
            light: '#99D9F0',
            main: '#009FDA',
            dark: '#12B2ED',
            contrastText: '#fff',
        },
    },
});

function App() {
    const {token, login, logout, ready, email, newEmail} = useAuth();

    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated);

    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
        <ThemeProvider theme={theme}>
            <AuthContext.Provider value={{
                token, login, logout, isAuthenticated, email, newEmail
            }}>
                <PopupFormProvider>
                    <PopupForm />
                    <Router>{routes}</Router>
                </PopupFormProvider>
            </AuthContext.Provider>
        </ThemeProvider>
        </LocalizationProvider>
    );
}

export default App;
