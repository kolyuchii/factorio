import styles from './MainPage.module.css';
import PrintsList from '../../components/PrintsList';

const MainPage = () => {
  return (
    <div className={styles.mainPage}>
      <PrintsList />
    </div>
  );
};

export default MainPage;
