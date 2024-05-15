import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import {HK, Year } from '../FakeData.ts';

export default function BasicSelect({ onValueChange }) {
  const [year, setYear] = React.useState('');

  const handleChange = (event) => {
    setYear(event.target.value);
    console.log(event.target.value);
    onValueChange(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Year</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={year}
          label="Year"
          onChange={handleChange}
        >
          {Year.map((year) => (
            HK.map((hk) => (
              <MenuItem value={`${hk} (${year})`}>{`${hk} (${year})`}</MenuItem>
            ))
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}