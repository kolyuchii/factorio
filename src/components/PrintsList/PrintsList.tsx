import styles from './PrintsList.module.css';
import {Button, ToggleButton, ToggleButtonGroup} from '@mui/material';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {SORT_TYPE, VIEW_TYPE} from '../../values.ts';
import {SyntheticEvent, useEffect, useState} from 'react';
import {$prints, getPrints, toggleFavourite} from '@stores/prints.ts';
import {useStore} from '@nanostores/react';
import time from '@utils/time.ts';
import $auth from '@stores/auth.ts';
import classNames from 'classnames';

export type PageControlsProps = {
  userId?: string;
};

const PrintsList = ({userId}: PageControlsProps) => {
  const auth = useStore($auth);
  const [viewType, setViewType] = useState(VIEW_TYPE.TILES);
  const [sortType, setSortType] = useState(SORT_TYPE.PUBLISHED);
  const onViewToggle = (_e: SyntheticEvent, view: string) => {
    if (view) setViewType(view);
  };
  const onSortToggle = (_e: SyntheticEvent, sort: string) => {
    if (sort) setSortType(sort);
  };
  const handleAddToFavourite = (printId: string, isFavourite: boolean) => {
    toggleFavourite(printId, auth.uid, isFavourite);
  };

  const data = useStore($prints);

  useEffect(() => {
    getPrints({sortType, userId, lastId: data?.lastId});
  }, [sortType, userId]);

  const drawPrints = () => {
    if (!data) return null;

    const {prints, total} = data;

    return (
      <div
        className={classNames(styles.printsContainer, {
          [styles.listView]: viewType === VIEW_TYPE.LIST,
        })}>
        {prints?.map((item, index) => {
          const date = time(item.published);
          return (
            <a href={'/print/' + item.id} className={styles.print} key={index}>
              {Array.isArray(item.images) && item.images[0] ? (
                <img
                  className={styles.printImg}
                  src={item.images[0].url}
                  alt={item.name}
                />
              ) : null}
              <div className={styles.printInfo}>
                <h2 className={styles.printName}>{item.name}</h2>
                <h3 className={styles.summary}>{item.summary}</h3>
                <h3 className={styles.description}>{item.description}</h3>
                <div className={styles.printInfoBottom}>
                  <div
                    className={
                      styles.date
                    }>{`${date.day} ${date.monthName} ${date.year}`}</div>
                  <div className={styles.rating}>
                    <Button
                      onClick={(event) => {
                        event.preventDefault();
                        handleAddToFavourite(item.id, item.isFavourite);
                      }}
                      size={'small'}
                      variant={'outlined'}
                      endIcon={
                        item.isFavourite ? (
                          <FavoriteIcon />
                        ) : (
                          <FavoriteBorderIcon />
                        )
                      }>
                      {item.rating}
                    </Button>
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    );
  };

  return (
    <div className={styles.printsList}>
      <div className={styles.pageControls}>
        <ToggleButtonGroup
          exclusive
          value={viewType}
          size={'small'}
          color={'secondary'}
          onChange={onViewToggle}>
          <ToggleButton value={VIEW_TYPE.TILES}>
            <ViewModuleIcon />
          </ToggleButton>
          <ToggleButton value={VIEW_TYPE.LIST}>
            <ViewListIcon />
          </ToggleButton>
        </ToggleButtonGroup>

        <div className={styles.sort}>
          Sort by:{' '}
          <ToggleButtonGroup
            exclusive
            color={'secondary'}
            value={sortType}
            size={'small'}
            onChange={onSortToggle}>
            <ToggleButton value={SORT_TYPE.RATING}>
              <FavoriteIcon />
            </ToggleButton>
            <ToggleButton value={SORT_TYPE.PUBLISHED}>
              <CalendarMonthIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
      {drawPrints()}
    </div>
  );
};

export default PrintsList;
