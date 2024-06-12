import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment, useState, useContext } from 'react';

import { DefaultLayout } from './layouts/DefaultLayout';
import {RouterContext} from './components/RoleSide/RoleSide'


function App() {
        const Routers = useContext(RouterContext)
    return (
        <Router>
        <div>
            <Routes>
                {Routers.map((route, index) => {
                    const Page = route.component;

                    let Layout = DefaultLayout;

                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }

                    return (
                        <Route
                            exact
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page></Page>
                                </Layout>
                            }
                        ></Route>
                    );
                })}
            </Routes>
        </div>
    </Router>
    );
}

export default App;
