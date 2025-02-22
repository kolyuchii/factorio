import styles from './AuthWrapper.module.css';
import React from 'react';
import {useStore} from '@nanostores/react';
import $auth from '@stores/auth.ts';
import LoginPage from '@pages/LoginPage';

export type AuthWrapperProps = {
  children: React.ReactNode;
};

const AuthWrapper = ({children}: AuthWrapperProps) => {
  const user = useStore($auth);

  return (
    <div className={styles.authWrapper}>{user ? children : <LoginPage />}</div>
  );
};

export default AuthWrapper;
