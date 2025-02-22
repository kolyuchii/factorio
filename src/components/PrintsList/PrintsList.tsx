import styles from './PrintsList.module.css';
import {ToggleButton, ToggleButtonGroup} from '@mui/material';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {SORT_TYPE, VIEW_TYPE} from '../../values.ts';
import {SyntheticEvent, useEffect, useState} from 'react';
import {$prints, getPrints} from '@stores/prints.ts';
import {useStore} from '@nanostores/react';
import classNames from 'classnames';
import FavoriteButton from '@components/FavoriteButton';
import Time from '@components/Time';

export type PageControlsProps = {
  userId?: string;
};

const PrintsList = ({userId}: PageControlsProps) => {
  const [viewType, setViewType] = useState(VIEW_TYPE.TILES);
  const [sortType, setSortType] = useState(SORT_TYPE.PUBLISHED);
  const onViewToggle = (_e: SyntheticEvent, view: string) => {
    if (view) setViewType(view);
  };
  const onSortToggle = (_e: SyntheticEvent, sort: string) => {
    if (sort) setSortType(sort);
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
                  <Time timeStr={item.updated || item.published} />
                  <FavoriteButton
                    printId={item.id}
                    isFavourite={item.isFavourite}
                    rating={item.rating}
                  />
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
