import styles from './Loading.module.css';

export type LoadingProps = {};

const Loading = (props: LoadingProps) => {
  return <div className={styles.loading}>Loading</div>;
};

export default Loading;
