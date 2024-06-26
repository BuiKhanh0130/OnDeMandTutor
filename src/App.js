import { Fragment, useContext } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { publicRoutes, privateRoutes } from '~/routes';
import Admin from './layouts/Admin';
import Tutor from './layouts/Tutor';
import { DefaultLayout } from './layouts/DefaultLayout';
import { ModalContext } from './components/ModalProvider';
import PersistLogin from './components/Login/components/PersistLogin';
import RequireAuth from './pages/RequireAuth/RequireAuth';

// Configure Firebase.

function App() {
    const { handleUser, auth } = useContext(ModalContext);

    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) handleUser();

    // useEffect(() => {
    //     const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
    //         if (!user) {
    //             // user logs out, handle something here
    //             console.log('User is not logged in');
    //             return;
    //         }

    //         console.log('Logged in user: ', user.displayName);
    //         const token = await user.getIdToken();
    //         console.log('Logged in user token: ', token);
    //     });

    //     return () => unregisterAuthObserver();
    // }, []);

    return (
        <Router>
            <div>
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
                                  <Route element={<PersistLogin />}>
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
            </div>
        </Router>
    );
}

export default App;
