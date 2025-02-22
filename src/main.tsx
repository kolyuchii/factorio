import {createRoot} from 'react-dom/client';
import {RouterProvider} from 'react-router';
import routes from './routes';
import './styles.css';
import theme from './theme.ts';
import {ThemeProvider} from '@mui/material';
import '@utils/firebase.ts';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <RouterProvider router={routes} />
  </ThemeProvider>,
);
