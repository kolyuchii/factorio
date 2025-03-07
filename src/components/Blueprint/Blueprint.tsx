import styles from './Blueprint.module.css';
import {BlueprintType} from '@types';
import {SyntheticEvent, useState} from 'react';
import classNames from 'classnames';

export type BlueprintProps = {
  blueprint: BlueprintType;
};

const Blueprint = ({blueprint}: BlueprintProps) => {
  if (!blueprint) return null;
  const onChangeEntity = (event: SyntheticEvent) => {
    console.log('onChangeEntity_47');
  };
  const [activeItem, setActiveItem] = useState(null);

  const entities = {};
  const mapSize = {
    x: {min: Infinity, max: -Infinity},
    y: {min: Infinity, max: -Infinity},
  };
  const eRec = [];
  blueprint.entities.forEach((entity) => {
    eRec.push(Object.assign({}, entity));
    if (entity.position) {
      mapSize.x.min = Math.min(entity.position.x, mapSize.x.min);
      mapSize.x.max = Math.max(entity.position.x, mapSize.x.max);
      mapSize.y.min = Math.min(entity.position.y, mapSize.y.min);
      mapSize.y.max = Math.max(entity.position.y, mapSize.y.max);
    }

    if (entities[entity.name]) {
      entities[entity.name] = entities[entity.name] + 1;
    } else {
      entities[entity.name] = 1;
    }
  });

  const map = Array.from(
    Array(Math.abs(mapSize.y.max - mapSize.y.min) * 2 + 11),
    () =>
      new Array(Math.abs(mapSize.x.max - mapSize.x.min) * 2 + 11).fill(null),
  );

  eRec.forEach((item) => {
    const row = Math.abs(mapSize.y.min - item.position.y) * 2 + 5;
    const col = Math.abs(mapSize.x.min - item.position.x) * 2 + 5;
    map[row][col] = item;

    if (item.name.includes('assembling-machine')) {
      for (let xRow = row - 2; xRow < row + 3; xRow++) {
        for (let xCol = col - 2; xCol < col + 3; xCol++) {
          if ((xRow !== row || xCol !== col) && map[xRow]) {
            map[xRow][xCol] = 0;
          }
        }
      }
    }
  });

  const entitiesArr = Object.entries(entities)
    .map((item) => ({
      name: item[0],
      count: item[1],
      url: `/icons/entity/${item[0]}.png`,
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className={styles.blueprint}>
      <div className={styles.blueprintInfo}>
        <h4>{blueprint.label}</h4>
        <p>{blueprint.description}</p>
      </div>
      <div className={styles.entities}>
        {entitiesArr.map((entity) => {
          return (
            <div
              key={entity.name}
              className={styles.entity}
              onClick={onChangeEntity}>
              <img
                alt={entity.name}
                src={entity.url}
                className={styles.entityImage}
              />
              <div className={styles.entityCount}>{entity.count}</div>
            </div>
          );
        })}
      </div>
      <div
        className={styles.render}
        style={{
          gridTemplateColumns: `repeat(${map[0].length}, 1fr)`,
          gridTemplateRows: `repeat(${map.length}, 1fr)`,
        }}>
        {map.map((row, rowIndex) => {
          return row.map((cell, colIndex) => {
            if (cell === 0) return null;
            // if (cell === 0) return <div style={{backgroundColor: 'red'}} />;

            // cell.direction
            if (cell === null) {
              return <div className={styles.cell} />;
            }

            const getStyles = () => {
              if (cell.name === 'assembling-machine-2') {
                return {
                  gridArea: `${Math.max(rowIndex + 1 - 2, 0)} / ${Math.max(colIndex + 1 - 2, 0)} / ${Math.max(rowIndex + 1 + 3, 0)} / ${Math.max(colIndex + 1 + 3, 0)}`,
                };
              }

              return {};
            };

            const id = `w${(rowIndex + 1) * (colIndex + 1)}-${rowIndex + 1}-${colIndex + 1}`;

            const getContent = () => {
              if (cell.request_filters) {
                return (
                  <div
                    className={classNames(styles.cellContent, {
                      [styles.active]: id === activeItem,
                    })}>
                    {cell.request_filters.map((item) => (
                      <div className={styles.cellContentItem}>
                        <img
                          alt={item.name}
                          src={`/icons/entity/${item.name}.png`}
                          className={styles.entityImageContent}
                        />
                        <div className={styles.entityImageContentCount}>
                          {item.count}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              }
              return null;
            };

            return (
              <div
                onClick={() => setActiveItem(id)}
                className={classNames(styles.cell, styles.cellActive)}
                style={getStyles()}>
                <img
                  id={id}
                  alt={cell.name}
                  src={`/icons/entity/${cell.name}.png`}
                  className={styles.entityImage}
                />
                {getContent()}
              </div>
            );
          });
        })}
      </div>
    </div>
  );
};

export default Blueprint;
