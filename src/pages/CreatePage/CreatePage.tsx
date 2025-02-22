import styles from './CreatePage.module.css';
import {Button, ButtonGroup, TextField} from '@mui/material';
import {useState, ChangeEvent} from 'react';
import {createPrint} from '@stores/prints.ts';
import {v4 as uuidv4} from 'uuid';
import {useStore} from '@nanostores/react';
import $auth from '@stores/auth.ts';
import {PrintType} from '@types';

export type CreatePageProps = {};

const CreatePage = (props: CreatePageProps) => {
  const user = useStore($auth);
  const [blueprint, setBlueprint] = useState<PrintType>({
    images: [],
    name: '',
    summary: '',
    description: '',
    published: '',
    rating: 0,
    blueprint: '',
    author: {id: user.uid, name: user.displayName},
  });

  const update = (data) => {
    setBlueprint(Object.assign({}, blueprint, data));
  };

  const addImage = () => {
    setBlueprint(
      Object.assign({}, blueprint, {
        images: [...blueprint.images, {id: uuidv4(), url: ''}],
      }),
    );
  };

  const saveAndPublish = () => {
    createPrint(blueprint);
  };

  return (
    <div className={styles.createPage}>
      <TextField
        id="outlined-basic"
        label="Title"
        variant="outlined"
        onInput={(e: ChangeEvent<HTMLInputElement>) => {
          update({name: e.target.value});
        }}
      />
      <TextField
        id="outlined-basic"
        multiline
        label="Summary"
        variant="outlined"
        minRows={3}
        onInput={(e: ChangeEvent<HTMLInputElement>) => {
          update({summary: e.target.value});
        }}
      />
      <TextField
        id="outlined-basic"
        multiline
        label="Description"
        variant="outlined"
        minRows={8}
        onInput={(e: ChangeEvent<HTMLInputElement>) => {
          update({description: e.target.value});
        }}
      />
      <div className={styles.imagesContainer}>
        {blueprint.images.map((image) => (
          <div className={styles.image} id={image.id}>
            <TextField
              id="outlined-basic"
              label="Image Url"
              variant="outlined"
              defaultValue={image.url}
              onInput={(e: ChangeEvent<HTMLInputElement>) => {
                blueprint.images.forEach((item) => {
                  if (item.id === image.id) {
                    item.url = e.target.value;
                  }
                });

                update(blueprint.images);
              }}
            />
            <img alt={''} src={image.url} width={'100%'} />
            <Button color={'secondary'} variant="contained">
              delete Image
            </Button>
          </div>
        ))}
        <div className={styles.addImage} onClick={addImage}>
          Add Image
        </div>
      </div>
      <TextField
        id="outlined-basic"
        label="Blueprint String"
        variant="outlined"
        multiline
        minRows={8}
        onInput={(e: ChangeEvent<HTMLInputElement>) => {
          update({blueprint: e.target.value});
        }}
      />
      <TextField id="outlined-basic" label="Tags" variant="outlined" />
      <div className={styles.controls}>
        <Button color={'secondary'} variant="contained">
          Cancel
        </Button>
        <ButtonGroup variant="contained" aria-label="Basic button group">
          <Button color={'primary'} variant="contained">
            Save as Draft
          </Button>
          <Button
            color={'primary'}
            variant="contained"
            onClick={saveAndPublish}>
            Save and Publish
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default CreatePage;
