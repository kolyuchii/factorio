import styles from './BlueprintBook.module.css';
import {BlueprintBookType} from '@types';
import Blueprint from '@components/Blueprint';

export type BlueprintBookProps = {
  book: BlueprintBookType;
};

const BlueprintBook = ({book}: BlueprintBookProps) => {
  if (!book) return null;
  return (
    <div className={styles.blueprintBook}>
      {book.blueprints.map((item) => (
        <Blueprint blueprint={item.blueprint} />
      ))}
    </div>
  );
};

export default BlueprintBook;
