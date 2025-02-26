import styles from './Loading.module.css';
import classNames from 'classnames';

export type LoadingProps = {};

const Loading = (props: LoadingProps) => {
  return (
    <div className={styles.loading}>
      <h3>Loading</h3>
      <div className={classNames(styles.loader, 'loader')} />
    </div>
  );
};

export default Loading;
