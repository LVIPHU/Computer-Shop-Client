import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';
import { DefaultLayout } from './components/Layout';
// import { useSelector } from 'react-redux';
import 'antd/dist/antd.less';

function App() {
    // const { auth } = useSelector((state) => state);

    return (
        <Router>
            <div className="App">
                <Routes>
                    {
                        // !auth.token ?
                        publicRoutes.map((route, index) => {
                            let Layout = DefaultLayout;
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
                                            <Page></Page>
                                        </Layout>
                                    }
                                ></Route>
                            );
                        })
                        // : privateRoutes.map((route, index) => {
                        //       let Layout = DefaultLayout;
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
                        //                   <Layout>
                        //                       <Page></Page>
                        //                   </Layout>
                        //               }
                        //           ></Route>
                        //       );
                        //   })
                    }
                </Routes>
            </div>
        </Router>
    );
}

export default App;
