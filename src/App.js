import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';
import { LayoutDefault } from './components/Layout';
// import RequireRole from './routes/redirect';
// import { useSelector } from 'react-redux';
import React, { Suspense } from 'react';

import 'antd/dist/antd.min.css';
import '@/common/index.scss';
import GlobalLoading from './components/Loading/Global';

function App() {
    // const { auth } = useSelector((state) => state);

    return (
        <Router>
            <Suspense fallback={<GlobalLoading />}>
                <div className="App">
                    <Routes>
                        {
                            // !auth.token ?
                            publicRoutes.map((route, index) => {
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
                            // : privateRoutes.map((route, index) => {
                            //       let Layout = LayoutDefault;
                            //       if (route.layout) {
                            //           Layout = route.layout;
                            //       } else if (route.layout === null) {
                            //           Layout = React.Fragment;
                            //       }

                            //       const Page = route.component;
                            //       return (
                            //           <Route
                            //               key={index}
                            //               path={route.path}
                            //               element={
                            //                   <RequireRole>
                            //                       <Layout>
                            //                           <Page />
                            //                       </Layout>
                            //                   </RequireRole>
                            //               }
                            //           ></Route>
                            //       );
                            //   })
                        }
                    </Routes>
                </div>
            </Suspense>
        </Router>
    );
}

export default App;
