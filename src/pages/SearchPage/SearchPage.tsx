import styles from './SearchPage.module.css';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Button,
  ButtonGroup,
  Pagination,
  TextField,
  FormControl,
} from '@mui/material';
import PrintsList from '../../components/PrintsList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useState} from 'react';
import {PrintType} from '@types';

export type SearchPageProps = {};

const SearchPage = (props: SearchPageProps) => {
  const [options, setOptions] = useState<PrintType[]>([]);
  const onSearch = () => {
    console.log('onSearch_23');
    setTimeout(() => setOptions([{title: '111'}, {title: '222'}]), 4000);
  };

  const onEnter = (e) => {
    e.preventDefault();
    console.log('onEnter_23');
  };

  return (
    <div className={styles.searchPage}>
      <form onSubmit={onEnter} className={styles.searchBox}>
        <TextField className={styles.searchBoxText} size={'small'} />
        <Button size={'medium'} variant={'contained'} type={'submit'}>
          Search
        </Button>
      </form>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header">
          <h3>Advanced Search</h3>
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.filters}>
            <TextField
              id="outlined-basic"
              label="Entities"
              variant="outlined"
            />
            <TextField id="outlined-basic" label="Recipes" variant="outlined" />
            <TextField
              id="outlined-basic"
              label="Versions"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Blueprint type"
              variant="outlined"
            />
            <TextField id="outlined-basic" label="Tags" variant="outlined" />
          </div>
        </AccordionDetails>
        <AccordionActions>
          <Button>Clear</Button>
          <Button>Apply</Button>
        </AccordionActions>
      </Accordion>

      <PrintsList />

      <div className={styles.searchResult}>sfasdf</div>
    </div>
  );
};

export default SearchPage;
