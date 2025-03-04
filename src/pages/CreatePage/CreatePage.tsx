import styles from './CreatePage.module.css';
import {Button, ButtonGroup, IconButton, TextField} from '@mui/material';
import {useState, ChangeEvent} from 'react';
import {createPrint} from '@stores/prints.ts';
import {v4 as uuidv4} from 'uuid';
import {useStore} from '@nanostores/react';
import $auth from '@stores/auth.ts';
import {PrintType} from '@types';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

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
    const id = uuidv4();
    setBlueprint(
      Object.assign({}, blueprint, {
        images: [...blueprint.images, {id, url: ''}],
      }),
    );
  };

  const saveAndPublish = () => {
    createPrint(blueprint);
  };

  const onDeleteImage = (id: string) => {
    setBlueprint(
      Object.assign({}, blueprint, {
        images: blueprint.images.filter((image) => image.id !== id),
      }),
    );
  };

  return (
    <div className={styles.createPage}>
      <TextField
        size={'small'}
        id="outlined-basic"
        label="Title"
        variant="outlined"
        required
        onInput={(e: ChangeEvent<HTMLInputElement>) => {
          update({name: e.target.value});
        }}
        className={styles.title}
      />
      <TextField
        size={'small'}
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
        size={'small'}
        required
        id="outlined-basic"
        multiline
        label="Description"
        variant="outlined"
        minRows={6}
        onInput={(e: ChangeEvent<HTMLInputElement>) => {
          update({description: e.target.value});
        }}
      />
      <div className={styles.imagesContainer}>
        {blueprint.images.map((image) => (
          <div className={styles.image} id={image.id}>
            <TextField
              className={styles.imageUrl}
              required={true}
              size={'small'}
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
            <img
              alt={''}
              src={image.url}
              className={styles.imageItem}
              width={'100%'}
            />
            <Button
              size={'small'}
              variant={'contained'}
              startIcon={<DeleteOutlineIcon />}
              onClick={() => onDeleteImage(image.id)}
              className={styles.deleteImage}>
              Delete
            </Button>
          </div>
        ))}
        <div className={styles.addImage} onClick={addImage}>
          <AddCircleOutlineIcon />
          Add Image
        </div>
      </div>
      <TextField
        size={'small'}
        required
        id="outlined-basic"
        label="Blueprint String"
        variant="outlined"
        multiline
        minRows={3}
        onInput={(e: ChangeEvent<HTMLInputElement>) => {
          update({blueprint: e.target.value});
        }}
      />
      <TextField id="outlined-basic" label="Tags" variant="outlined" />
      <div className={styles.controls}>
        <Button color={'secondary'} variant="contained">
          Cancel
        </Button>
        <Button color={'primary'} variant="contained" onClick={saveAndPublish}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default CreatePage;
