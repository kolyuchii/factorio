import styles from './ViewPrintPage.module.css';
import {ReactNode, SyntheticEvent, useEffect, useMemo, useState} from 'react';
import {getPrintById} from '@stores/prints.ts';
import {useParams} from 'react-router';
import {Plan, PrintType} from '@types';
import Loading from '@components/Loading';
import {decodeV15Base64} from '@utils/decodeFromBase64.ts';
import {Box, Button, Tab, Tabs, TextField} from '@mui/material';
import FavoriteButton from '@components/FavoriteButton';
import Time from '@components/Time';
import Blueprint from '@components/Blueprint';
import BlueprintBook from '@components/BlueprintBook';

export type ViewPrintPageProps = {};

function CustomTabPanel({
  value,
  index,
  children,
  ...other
}: {
  value: number;
  index: number;
  children: ReactNode;
}) {
  return (
    <div
      className={styles.tabPanel}
      role="tabpanel"
      hidden={value !== index}
      {...other}>
      {value === index && (
        <Box
          sx={{pt: 3, pb: 3, gap: 4, display: 'flex', flexDirection: 'column'}}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ViewPrintPage = (props: ViewPrintPageProps) => {
  const {id} = useParams();
  const [print, setPrint] = useState<PrintType>();
  const bpJson: Plan = useMemo(() => {
    if (print?.blueprint) {
      return JSON.parse(decodeV15Base64(print?.blueprint));
    }
    return null;
  }, [print]);
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (id)
      getPrintById(id).then((data: PrintType) => {
        setPrint(data);
      });
  }, [id]);

  if (!print) return <Loading />;

  return (
    <div className={styles.viewPrintPage}>
      <div className={styles.heading}>
        <h1 className={styles.name}>{print.name}</h1>
        <FavoriteButton
          size="big"
          printId={print.id}
          isFavourite={print.isFavourite}
          rating={print.rating}
        />
      </div>

      <div className={styles.gallery}>
        {print.images.map((image) => (
          <div className={styles.imageContainer}>
            <img alt={''} src={image.url} className={styles.image} />
          </div>
        ))}
      </div>

      <div className={styles.twoColumn}>
        <div className={styles.infoColumn}>
          <div>
            Author: <a href={'/user/' + print.author.id}>{print.author.name}</a>
          </div>
          <div>
            Created: <Time timeStr={print.published} />
          </div>
          {print.updated && (
            <div>
              Updated: <Time timeStr={print.updated} />
            </div>
          )}
          <Button variant={'contained'}>Copy Blueprint</Button>
        </div>
        <div className={styles.dataColumn}>
          <Box sx={{width: '100%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto">
                <Tab label="Description" {...a11yProps(0)} />
                <Tab label="Blueprint" {...a11yProps(1)} />
                <Tab label="Entities" {...a11yProps(2)} />
                <Tab label="JSON" {...a11yProps(3)} />
                <Tab label="Render" {...a11yProps(4)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              {print.summary && (
                <div className={styles.summary}>
                  <h4>Summary</h4>
                  <p>{print.summary}</p>
                </div>
              )}
              {print.description && (
                <div className={styles.description}>
                  <h4>Description</h4>
                  <p>{print.description}</p>
                </div>
              )}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <TextField
                multiline={true}
                maxRows={10}
                value={print.blueprint}
                className={styles.blueprint}
              />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <Blueprint blueprint={bpJson.blueprint} />
              <BlueprintBook book={bpJson.blueprint_book} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              <div className={styles.codeWrapper}>
                <code className={styles.code}>
                  {JSON.stringify(bpJson, null, 2)}
                </code>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
              Render
            </CustomTabPanel>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default ViewPrintPage;
