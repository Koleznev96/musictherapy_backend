import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {Auth} from "./pages/Auth/Auth";
import {Header} from "./components/header/Header";
import {Users} from "./pages/Users/Users";
import {Poster} from "./pages/Poster/Poster";
import {Video} from "./pages/Video/Video";

export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <>
                <Header />
                <Switch>
                    <Route path="/admin_panel/users" exact>
                        <Users/>
                    </Route>
                    <Route path="/admin_panel/video" exact>
                        <Video />
                    </Route>
                    <Route path="/admin_panel/posters" exact>
                        <Poster />
                    </Route>
                    <Redirect to="/admin_panel/users" />
                </Switch>
            </>
        );
    }

    return (
        <Switch>
            <Route path="/admin_panel/auth" exact>
                <Auth />
            </Route>
            <Redirect to="/admin_panel/auth" />
        </Switch>
    );
};
