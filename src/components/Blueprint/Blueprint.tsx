import styles from './Blueprint.module.css';
import {BlueprintType} from '@types';
import {SyntheticEvent} from 'react';

export type BlueprintProps = {
  blueprint: BlueprintType;
};

const Blueprint = ({blueprint}: BlueprintProps) => {
  if (!blueprint) return null;
  const onChangeEntity = (event: SyntheticEvent) => {
    console.log('onChangeEntity_47');
  };

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
    Array(Math.abs(mapSize.y.max - mapSize.y.min) * 2 + 1),
    () => new Array(Math.abs(mapSize.x.max - mapSize.x.min) * 2 + 1).fill(null),
  );

  eRec.forEach((item) => {
    map[Math.abs(mapSize.y.min - item.position.y) * 2][
      Math.abs(mapSize.x.min - item.position.x) * 2
    ] = item;
  });

  const entitiesArr = Object.entries(entities)
    .map((item) => ({
      name: item[0],
      count: item[1],
      url: `/public/icons/entity/${item[0]}.png`,
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
        {map.map((row) => {
          return row.map((cell) => {
            // cell.direction
            if (cell === null) {
              return <div />;
            }

            return (
              <img
                alt={cell.name}
                src={`/public/icons/entity/${cell.name}.png`}
                className={styles.entityImage}
              />
            );
          });
        })}
      </div>
    </div>
  );
};

export default Blueprint;
