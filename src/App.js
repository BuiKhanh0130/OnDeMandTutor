// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
import { Fragment, useContext, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { publicRoutes, privateRoutes } from '~/routes';
import Admin from './layouts/Admin';
import Tutor from './layouts/Tutor';
import Main from './pages/Main';
import { DefaultLayout } from './layouts/DefaultLayout';
import { ModalContext } from './components/ModalProvider';
import PersistLogin from './components/Login/components/PersistLogin';

// Configure Firebase.
// const config = {
//     apiKey: 'AIzaSyDERqCP1b33M7qBHOZpEF1b65iHNfPgvNM',
//     authDomain: 'on-demand-tutor-de8fd.firebaseapp.com',
//     // ...
// };
// firebase.initializeApp(config);

function App() {
    const context = useContext(ModalContext);

    const accessToken = localStorage.getItem('accessToken');

    //     useEffect(() => {
    //         const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
    //             if (!user) {
    //                 // user logs out, handle something here
    //                 console.log('User is not logged in');
    //                 return;
    //             }

    //             console.log('Logged in user: ', user.displayName);
    //             const token = await user.getIdToken();
    //             console.log('Logged in user token: ', token);
    //         });

    //         return () => unregisterAuthObserver();
    //     }, []);

    return (
        <Router>
            <div>
                <Routes>
                    {accessToken
                        ? privateRoutes.map((route, index) => {
                              console.log('hi');
                              let Page = route.component;

                              let Layout = DefaultLayout;

                              if (context?.auth?.role === 'Tutor') {
                                  Layout = Tutor;
                              } else if (context?.auth?.role === 'Admin') {
                                  Layout = Admin;
                              }

                              if (Layout === Admin) {
                                  Page = Main;
                              }

                              if (route.layout) {
                                  Layout = route.layout;
                              } else if (route.layout === null) {
                                  Layout = Fragment;
                              }

                              return (
                                  <Route element={<PersistLogin />}>
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
                              );
                          })
                        : publicRoutes.map((route, index) => {
                              console.log('hello');
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
