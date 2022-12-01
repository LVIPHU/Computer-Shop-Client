import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes, adminRoutes } from './routes';
import { LayoutDefault } from './components/Layout';
import { useSelector } from 'react-redux';
import React, { Suspense } from 'react';

import 'antd/dist/antd.min.css';
import '@/common/index.scss';
import GlobalLoading from './components/Loading/Global';

function App() {
    const authLogin = useSelector((state) => state.authLogin);
    return (
        <Router>
            <Suspense fallback={<GlobalLoading />}>
                <div className="App">
                    <Routes>
                        {!authLogin.userInfo
                            ? publicRoutes.map((route, index) => {
                                  let Layout = LayoutDefault;
                                  if (route.layout) {
                                      Layout = route.layout;
                                  } else if (route.layout === null) {
                                      Layout = React.Fragment;
                                  }
                                  const Page = route.component;
                                  return (
                                      <Route
                                          key={index}
                                          path={route.path}
                                          element={
                                              <Layout>
                                                  <Page />
                                              </Layout>
                                          }
                                      ></Route>
                                  );
                              })
                            : privateRoutes.map((route, index) => {
                                  let Layout = LayoutDefault;
                                  if (route.layout) {
                                      Layout = route.layout;
                                  } else if (route.layout === null) {
                                      Layout = React.Fragment;
                                  }

                                  const Page = route.component;
                                  return (
                                      <Route
                                          key={index}
                                          path={route.path}
                                          element={
                                              <Layout>
                                                  <Page />
                                              </Layout>
                                          }
                                      ></Route>
                                  );
                              })}
                        {authLogin.userInfo &&
                            authLogin.userInfo.roles[0] === 'ROLE_ADMIN' &&
                            adminRoutes.map((route, index) => {
                                let Layout = LayoutDefault;
                                if (route.layout) {
                                    Layout = route.layout;
                                } else if (route.layout === null) {
                                    Layout = React.Fragment;
                                }

                                const Page = route.component;
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                    ></Route>
                                );
                            })}
                    </Routes>
                </div>
            </Suspense>
        </Router>
    );
}

export default App;
