import { Box, Button, TextField } from '@mui/material';
import {
  AddCircleOutlineOutlined, SaveOutlined
} from '@mui/icons-material';
import { ChangeEvent, useContext, useState } from 'react';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {

  const { addNewEntry } = useContext(EntriesContext);
  const { setIsAddingEntry, isAddingEntry } = useContext(UIContext);

  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false);

  const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onSave = () => {
    if (inputValue.length === 0) return;
    addNewEntry(inputValue);
    setIsAddingEntry(false);
    setTouched(false);
    setInputValue('');
  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>

      {
        isAddingEntry
        ? (
          <>
            <TextField
              fullWidth
              sx={{
                marginTop: 2,
                marginBottom: 1,
              }}
              placeholder={'new Entry'}
              autoFocus
              multiline
              label={'New Entry'}
              helperText={inputValue.length <= 0 && touched && 'set value'}
              error={inputValue.length <= 0 && touched}
              value={inputValue}
              onChange={onTextFieldChanged}
              onBlur={() => setTouched(true)}
            />
            <Box display={'flex'} justifyContent={'space-between'}>
              <Button
                variant={'text'}
                onClick={() => {
                  setIsAddingEntry(false);
                }}
              >
                Cancel
              </Button>
              <Button
                variant={'outlined'}
                color={'secondary'}
                endIcon={<SaveOutlined/>}
                onClick={onSave}
              >
                Save
              </Button>
            </Box>
          </>
        )
        : (
          <Button
            variant={'outlined'}
            fullWidth
            startIcon={<AddCircleOutlineOutlined/>}
            onClick={() => {
              setIsAddingEntry(true);
            }}
          >
            Add Task
          </Button>
        )
      }
    </Box>
  );
};
