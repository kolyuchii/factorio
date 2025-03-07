import styles from './FavoriteButton.module.css';
import {Button} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {toggleFavourite} from '@stores/prints.ts';
import {useStore} from '@nanostores/react';
import $auth from '@stores/auth.ts';
import {useState} from 'react';
import {PrintType} from '@types';

export type FavoriteButtonProps = {
  printId: string;
  isFavourite: boolean;
  initialRating?: number;
  size: 'small' | 'medium' | 'large';
};

const FavoriteButton = ({
  printId,
  isFavourite = false,
  initialRating = 0,
  size = 'medium',
}: FavoriteButtonProps) => {
  const auth = useStore($auth);
  const [loading, setLoading] = useState<boolean>(false);
  const [rating, setRating] = useState(initialRating);
  const [favorite, setFavorite] = useState<PrintType>(isFavourite);

  const handleAddToFavourite = (printId: string, isFavourite: boolean) => {
    setLoading(true);
    toggleFavourite(printId, auth.uid, isFavourite)
      .then((data) => {
        setRating(data.rating);
        setFavorite(data.isFavourite);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className={styles.favoriteButton}>
      <Button
        disabled={loading}
        loading={loading}
        onClick={(event) => {
          event.preventDefault();
          handleAddToFavourite(printId, !!favorite);
        }}
        size={size}
        variant={'contained'}
        endIcon={favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}>
        {rating}
      </Button>
    </div>
  );
};

export default FavoriteButton;
