import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment, useContext } from 'react';

import { publicRoutes } from '~/routes';
import { DefaultLayout } from './layouts/DefaultLayout';
import { ModalContext } from './components/ModalProvider';
import Admin from './layouts/Admin';
import Tutor from './layouts/Tutor';

function App() {
    const role = useContext(ModalContext);
    return (
        <Router>
            <div>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;

                        let Layout = DefaultLayout;

                        if (role?.auth?.role?.UserRole === 'Tutor') {
                            Layout = Tutor;
                        } else if (role?.auth?.role?.UserRole === 'Admin') {
                            Layout = Admin;
                        }

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
