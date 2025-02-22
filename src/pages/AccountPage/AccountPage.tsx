import styles from './AccountPage.module.css';
import {Box, Button, Tab, Tabs, TextField} from '@mui/material';
import {ReactNode, useState, SyntheticEvent} from 'react';
import $auth, {logOut} from '@stores/auth.ts';
import PrintsList from '@components/PrintsList';
import {useStore} from '@nanostores/react';

export type AccountPageProps = {};

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
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}>
      {value === index && <Box sx={{pt: 3, pb: 3}}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const AccountPage = (props: AccountPageProps) => {
  const auth = useStore($auth);
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={styles.userPage}>
      <div className={styles.top}>
        <div className={styles.displayName}>
          <TextField
            id="outlined-basic"
            label="Display Name"
            variant="outlined"
            className={styles.text}
          />
          <Button>Save</Button>
        </div>
      </div>

      <Box sx={{width: '100%'}}>
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="My Prints" {...a11yProps(0)} />
            <Tab label="Favourites" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <PrintsList userId={auth.uid} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Item Two
        </CustomTabPanel>
      </Box>

      <div>
        <Button variant={'contained'} onClick={logOut}>
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default AccountPage;
