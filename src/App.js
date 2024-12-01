import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '~/routes';
import DefaultLayout from '~/layouts';
import { Fragment } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import PrivateRoute from './routes/PrivateRoute';

const router = createBrowserRouter(
    [
        ...publicRoutes.map((route, index) => {
            let Layout = DefaultLayout;
            if (route.layout) {
                Layout = route.layout;
            } else if (route.layout === null) {
                Layout = Fragment;
            }

            const Page = route.component;

            return {
                path: route.path,
                element: (
                    <Layout>
                        <Page />
                    </Layout>
                )
            };
        }),
        ...privateRoutes.map((route, index) => {
            let Layout = DefaultLayout;
            if (route.layout) {
                Layout = route.layout;
            } else if (route.layout === null) {
                Layout = Fragment;
            }

            const Page = route.component;

            return {
                path: route.path,
                element: (
                    <Layout>
                        <PrivateRoute>
                            <Page />
                        </PrivateRoute>
                    </Layout>
                )
            };
        })
    ],
    {
        future: {
            v7_startTransition: true // Kích hoạt cờ này để thử tính năng mới
        }
    }
);

function App() {
    return (
        <>
            <ToastContainer
                position='top-right'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
            />
            <RouterProvider router={router} />;
        </>
    );
}

export default App;
