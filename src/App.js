import { Fragment, useContext } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { publicRoutes, privateRoutes } from '~/routes';
import Admin from './layouts/Admin';
import Tutor from './layouts/Tutor';
import { DefaultLayout } from './layouts/DefaultLayout';
import { ModalContext } from './components/ModalProvider';
import PersistLogin from './components/Login/components/PersistLogin';
import RequireAuth from './pages/RequireAuth/RequireAuth';

function App() {
    const { auth } = useContext(ModalContext);
    const accessToken = sessionStorage.getItem('accessToken');
    return (
        <Router>
            <Routes>
                {accessToken
                    ? privateRoutes.map((route, index) => {
                          let Page = route.component;

                          let Layout = DefaultLayout;

                          const role = route.role;

                          if (auth?.role === 'Tutor') {
                              Layout = Tutor;
                          } else if (auth?.role === 'Admin') {
                              Layout = Admin;
                          }

                          if (route.layout) {
                              Layout = route.layout;
                          } else if (route.layout === null) {
                              Layout = Fragment;
                          }

                          return (
                              <Route key={index} element={<PersistLogin />}>
                                  <Route element={<RequireAuth reAuth allowedRoles={role} />}>
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
                                  </Route>
                              </Route>
                          );
                      })
                    : publicRoutes.map((route, index) => {
                          let Page = route.component;

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
        </Router>
    );
}

export default App;
