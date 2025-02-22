import styles from './LoginPage.module.css';
import {Button} from '@mui/material';
import googleAuth from '@utils/auth/google.ts';

export type LoginPageProps = {};

const LoginPage = (props: LoginPageProps) => {
  return (
    <div className={styles.loginPage}>
      <div>
        Log in with{' '}
        <Button variant={'contained'} onClick={googleAuth}>
          Google
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
