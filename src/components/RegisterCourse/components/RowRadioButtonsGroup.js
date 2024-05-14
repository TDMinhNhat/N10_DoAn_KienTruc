import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { options } from '../FakeData.ts';
const formatLabel = (value) => {
  if (value === 'hoc moi') return 'Học mới';
  if (value === 'hoc lai') return 'Học lại';
  if (value === 'hoc cai thien') return 'Học cải thiện';
  return value;
}

export default function RowRadioButtonsGroup({ onValueChange }) {
  const [value, setValue] = React.useState('hoc moi');

  const handleChange = (event) => {
    setValue(event.target.value);
    onValueChange(event.target.value);
  };

  return (
    <FormControl>
      {/* <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel> */}
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        {options.map((option, index) => (
          <FormControlLabel key={index} value={option} control={<Radio />} label={formatLabel(option)} />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
