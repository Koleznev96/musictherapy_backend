import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {Auth} from "./pages/Auth/Auth";
import {Header} from "./components/header/Header";
import {Users} from "./pages/Users/Users";
import {Poster} from "./pages/Poster/Poster";
import {Video} from "./pages/Video/Video";
import {Audio} from "./pages/Audio/Audio";
// import {Maps} from "./pages/Maps/Maps";
import {Tests} from "./pages/Tests/Tests";
import {Courses} from "./pages/Courses/Courses";


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
                    <Route path="/admin_panel/audio" exact>
                        <Audio />
                    </Route>
                    <Route path="/admin_panel/posters" exact>
                        <Poster />
                    </Route>
                    <Route path="/admin_panel/tests" exact>
                        <Tests />
                    </Route>
                    <Route path="/admin_panel/courses" exact>
                        <Courses />
                    </Route>
                    {/*<Route path="/admin_panel/maps" exact>*/}
                    {/*    <Maps />*/}
                    {/*</Route>*/}
                    {/*<Route path="/admin_panel/consultant" exact>*/}
                    {/*    <Test />*/}
                    {/*</Route>*/}
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
