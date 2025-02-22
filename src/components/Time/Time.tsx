import styles from './Time.module.css';
import time from '@utils/time.ts';

export type TimeProps = {
  timeStr: string;
};

const Time = ({timeStr}: TimeProps) => {
  if (!timeStr) return null;
  const parsedTime = time(timeStr);
  return (
    <div
      className={
        styles.time
      }>{`${parsedTime.day} ${parsedTime.monthName} ${parsedTime.year}`}</div>
  );
};

export default Time;
