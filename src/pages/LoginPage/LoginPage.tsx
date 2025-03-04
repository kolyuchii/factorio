import styles from './LoginPage.module.css';
import {Button} from '@mui/material';
import googleAuth from '@utils/auth/google.ts';
import GoogleIcon from '@mui/icons-material/Google';

const LoginPage = () => {
  return (
    <div className={styles.loginPage}>
      <div className={styles.options}>
        <div className={styles.title}>Log in with</div>
        <Button
          size="large"
          startIcon={<GoogleIcon />}
          variant={'contained'}
          onClick={googleAuth}>
          Google
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
