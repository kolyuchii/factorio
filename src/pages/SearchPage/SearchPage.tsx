import styles from './SearchPage.module.css';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  ButtonGroup,
  Pagination,
  TextField,
} from '@mui/material';
import PrintsList from '../../components/PrintsList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export type SearchPageProps = {};

const SearchPage = (props: SearchPageProps) => {
  return (
    <div className={styles.searchPage}>
      <div className={styles.searchBox}>
        <ButtonGroup variant="contained">
          <TextField
            className={styles.searchBoxText}
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
          />
          <Button color={'primary'} className={styles.searchBoxButton}>
            Search
          </Button>
        </ButtonGroup>
      </div>
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
