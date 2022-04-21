import { NextPage } from 'next';
import { Layout } from '../../components/layouts';
import {
  Button, capitalize,
  Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel,
  FormLabel, Grid, IconButton, Radio,
  RadioGroup,
  TextField
} from '@mui/material';
import { DeleteOutline, SaveOutlined } from '@mui/icons-material';
import { EntryStatus } from '../../interfaces';
import { ChangeEvent, useMemo, useState } from 'react';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

const EntryPage: NextPage = () => {

  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState<EntryStatus>('pending');
  const [touched, setTouched] = useState(false);

  const isNotValid = useMemo(() => inputValue.length <= 0 && touched,
    [inputValue, touched]);

  const onInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  };

  const onSave = () => {

  };


  return (
    <Layout title={'....'}>
      <Grid
        container
        justifyContent={'center'}
        sx={{ marginTop: 2 }}
      >
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
        >
          <Card>
            <CardHeader title={`Entry: ${inputValue}`}
                        subheader={'created 3 minutes ago'}/>

            <CardContent>
              <TextField
                sx={{
                  marginTop: 2,
                  marginBottom: 1
                }}
                placeholder={'New Entry'}
                fullWidth
                autoFocus
                multiline
                label={'new Entry'}
                value={inputValue}
                onChange={onInputValueChange}
                helperText={isNotValid && 'set a value'}
                onBlur={() => setTouched(true)}
                error={isNotValid}
              />
              <FormControl>
                <FormLabel>
                  Status:
                </FormLabel>
                <RadioGroup row value={status} onChange={onStatusChange}>
                  {
                    validStatus.map(option => (
                      <FormControlLabel
                        value={option}
                        key={option}
                        control={<Radio/>}
                        label={capitalize(option)}
                      />
                    ))
                  }
                </RadioGroup>
              </FormControl>
            </CardContent>

            <CardActions>
              <Button
                startIcon={<SaveOutlined/>}
                variant={'contained'}
                fullWidth
                onClick={onSave}
                disabled={inputValue.length <= 0}
              >
                Save
              </Button>
            </CardActions>

          </Card>
        </Grid>
      </Grid>

      <IconButton
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          backgroundColor: 'error.dark'
        }}
      >
        <DeleteOutline/>
      </IconButton>


    </Layout>
  );
};

export default EntryPage;
