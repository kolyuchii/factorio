import styles from './AppWrapper.module.css';
import {Outlet} from 'react-router';
import Header from '../components/Header';
import {useStore} from '@nanostores/react';
import $auth from '@stores/auth.ts';
import Loading from '@components/Loading';

export type AppWrapperProps = {};

const AppWrapper = (props: AppWrapperProps) => {
  const auth = useStore($auth);
  return (
    <div className={styles.appWrapper}>
      <Header />
      {auth === undefined ? <Loading /> : <Outlet />}
    </div>
  );
};

export default AppWrapper;
