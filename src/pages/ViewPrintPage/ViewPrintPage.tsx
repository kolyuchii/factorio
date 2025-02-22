import styles from './ViewPrintPage.module.css';
import {SyntheticEvent, useEffect, useState} from 'react';
import {getPrintById} from '@stores/prints.ts';
import {useParams} from 'react-router';
import {PrintType} from '@types';
import Loading from '@components/Loading';
import {decodeV15Base64} from '@utils/decodeFromBase64.ts';
import {TextField} from '@mui/material';
import classNames from 'classnames';

export type ViewPrintPageProps = {};

const ViewPrintPage = (props: ViewPrintPageProps) => {
  const {id} = useParams();
  const [print, setPrint] = useState<PrintType>();

  useEffect(() => {
    if (id)
      getPrintById(id).then((data: PrintType) => {
        setPrint(data);
      });
  }, []);

  if (!print) return <Loading />;

  console.log(
    'ViewPrintPage_23',
    JSON.parse(decodeV15Base64(print.blueprint), null, 2),
  );

  const bpJson = JSON.parse(decodeV15Base64(print.blueprint));
  const entities = {};

  bpJson.blueprint.entities.forEach((entity) => {
    if (entities[entity.name]) {
      entities[entity.name] = entities[entity.name] + 1;
    } else {
      entities[entity.name] = 1;
    }
  });

  const entitiesArr = Object.entries(entities).map((item) => ({
    name: item[0],
    count: item[1],
    url: `/public/icons/${item[0]}.png`,
  }));

  const onChangeEntity = (event: SyntheticEvent) => {
    console.log('onChangeEntity_47');
  };

  return (
    <div className={styles.viewPrintPage}>
      <h1 className={styles.name}>{print.name}</h1>
      <div className={styles.summary}>{print.summary}</div>
      <div className={styles.description}>{print.description}</div>
      <div>{print.rating}</div>
      <a href={'/user/' + print.author.id}>{print.author.name}</a>
      <div>{print.published}</div>

      <TextField value={print.blueprint} multiline disabled maxRows={10} />
      <div className={styles.twoColumn}>
        <div
          className={classNames(styles.gallery, {
            [styles.oneColumn]: print.images.length === 1,
            [styles.twoColumn]: print.images.length === 2,
            [styles.threeColumn]: print.images.length === 3,
          })}>
          {print.images.map((image) => (
            <img alt={''} src={image.url} className={styles.image} />
          ))}
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
    </div>
  );
};

export default ViewPrintPage;
