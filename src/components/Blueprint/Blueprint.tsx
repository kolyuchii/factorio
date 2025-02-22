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
  blueprint.entities.forEach((entity) => {
    if (entities[entity.name]) {
      entities[entity.name] = entities[entity.name] + 1;
    } else {
      entities[entity.name] = 1;
    }
  });
  const entitiesArr = Object.entries(entities)
    .map((item) => ({
      name: item[0],
      count: item[1],
      url: `/public/icons/${item[0]}.png`,
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
              <img alt={''} src={entity.url} className={styles.entityImage} />
              <div className={styles.entityCount}>{entity.count}</div>
              <div className={styles.entityName}>{entity.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Blueprint;
