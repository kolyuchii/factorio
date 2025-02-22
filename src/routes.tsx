import {createBrowserRouter} from 'react-router';
import AppWrapper from './AppWrapper';
import ErrorPage from './pages/ErrorPage';
import MainPage from './pages/MainPage';
import UserPage from './pages/UserPage';
import CreatePage from './pages/CreatePage';
import SearchPage from './pages/SearchPage';
import ViewPrintPage from '@pages/ViewPrintPage';
import AccountPage from '@pages/AccountPage';
import AuthWrapper from './AuthWrapper';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppWrapper />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/user/:userId',
        element: <UserPage />,
      },
      {
        path: '/account',
        element: (
          <AuthWrapper>
            <AccountPage />
          </AuthWrapper>
        ),
      },
      {
        path: '/search',
        element: <SearchPage />,
      },
      {
        path: '/create',
        element: (
          <AuthWrapper>
            <CreatePage />
          </AuthWrapper>
        ),
      },
      {
        path: '/print/:id',
        element: <ViewPrintPage />,
      },
    ],
  },
]);

export default router;
