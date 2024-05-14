import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [year, setYear] = React.useState('');

  const handleChange = (event) => {
    setYear(event.target.value);
    console.log(event.target.value);
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
          <MenuItem value={"HK1 (2023-2024)"}>HK1 (2023-2024)</MenuItem>
          <MenuItem value={"HK2 (2023-2024)"}>HK2 (2023-2024)</MenuItem>
          <MenuItem value={"HK3 (2023-2024)"}>HK3 (2023-2024)</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
