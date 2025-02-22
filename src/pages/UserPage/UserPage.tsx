import styles from './UserPage.module.css';
import $auth from '@stores/auth.ts';
import PrintsList from '@components/PrintsList';
import {useStore} from '@nanostores/react';

const UserPage = () => {
  const auth = useStore($auth);

  return (
    <div className={styles.userPage}>
      <h1>{`${auth.displayName}'s prints`}</h1>
      <PrintsList userId={auth.uid} />
    </div>
  );
};

export default UserPage;
