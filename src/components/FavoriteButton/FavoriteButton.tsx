import styles from './FavoriteButton.module.css';
import {Button} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {toggleFavourite} from '@stores/prints.ts';
import {useStore} from '@nanostores/react';
import $auth from '@stores/auth.ts';
import {useState} from 'react';

export type FavoriteButtonProps = {
  printId: string;
  isFavourite: boolean;
  rating: number;
  size: 'small' | 'medium' | 'large';
};

const FavoriteButton = ({
  printId,
  isFavourite,
  rating,
  size = 'medium',
}: FavoriteButtonProps) => {
  const auth = useStore($auth);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddToFavourite = (printId: string, isFavourite: boolean) => {
    setLoading(true);
    toggleFavourite(printId, auth.uid, isFavourite).finally(() =>
      setLoading(false),
    );
  };

  return (
    <div className={styles.favoriteButton}>
      <Button
        disabled={loading}
        loading={loading}
        onClick={(event) => {
          event.preventDefault();
          handleAddToFavourite(printId, isFavourite);
        }}
        size={size}
        variant={'contained'}
        endIcon={isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}>
        {rating}
      </Button>
    </div>
  );
};

export default FavoriteButton;
