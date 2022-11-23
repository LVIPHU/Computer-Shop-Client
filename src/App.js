import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';
import { LayoutDefault } from './components/Layout';
import { useSelector } from 'react-redux';
import React, { Suspense } from 'react';

import 'antd/dist/antd.min.css';
import '@/common/index.scss';
import GlobalLoading from './components/Loading/Global';

function App() {
    const authLogin = useSelector((state) => state.authLogin);
    // const { userInfo } = authLogin;

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
                        {authLogin.userInfo.token[0] === 'ADMIN' &&
                            privateRoutes.map((route, index) => {
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
