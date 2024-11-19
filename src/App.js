import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/components/Layout';
import { Fragment } from 'react';

const router = createBrowserRouter(
    publicRoutes.map((route, index) => {
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
            ),
        };
    }),
    {
        future: {
            v7_startTransition: true, // Kích hoạt cờ này để thử tính năng mới
        },
    },
);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
