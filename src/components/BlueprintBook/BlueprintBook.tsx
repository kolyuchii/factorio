import styles from './BlueprintBook.module.css';
import {BlueprintBookType} from '@types';
import Blueprint from '@components/Blueprint';

export type BlueprintBookProps = {
  book: BlueprintBookType;
};

const BlueprintBook = ({book}: BlueprintBookProps) => {
  console.log('BlueprintBook_10', book);
  return (
    <div className={styles.blueprintBook}>
      {book.blueprints.map((item) => (
        <Blueprint blueprint={item.blueprint} />
      ))}
    </div>
  );
};

export default BlueprintBook;
