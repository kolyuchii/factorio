import {createTheme} from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#ffb703',
      main: '#fb8500',
      dark: '#a66b00',
      contrastText: '#fff',
    },
    secondary: {
      light: '#cbf3f0',
      main: '#8ecae6',
      dark: '#219ebc',
      contrastText: '#fff',
    },
  },
});

export default theme;
