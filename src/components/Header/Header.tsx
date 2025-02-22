import styles from './Header.module.css';

export type HeaderProps = {};

const Header = (props: HeaderProps) => {
  return (
    <div className={styles.header}>
      <a href={'/'} className={styles.title}>
        <img
          alt={''}
          height={40}
          src={'https://cdn.factorio.com/assets/img/web/factorio-logo2.png'}
        />
        <h1 className={styles.description}>Factorio Prints</h1>
      </a>
      <ul className={styles.nav}>
        <li className={styles.navItem}>
          <a href={'/search'} className={styles.navLink}>
            Search
          </a>
        </li>
        <li className={styles.navItem}>
          <a href={'/create'} className={styles.navLink}>
            Create
          </a>
        </li>
        <li className={styles.navItem}>
          <a href={'/account'} className={styles.navLink}>
            Account
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Header;
