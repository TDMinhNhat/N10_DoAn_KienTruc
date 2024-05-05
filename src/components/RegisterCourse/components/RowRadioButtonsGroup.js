import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RowRadioButtonsGroup() {
  const [value, setValue] = React.useState('hoc moi');

  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(event.target.value);
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
        <FormControlLabel value="hoc moi" control={<Radio />} label="Học mới" />
        <FormControlLabel value="hoc lai" control={<Radio />} label="Học lại" />
        <FormControlLabel value="hoc cai thien" control={<Radio />} label="Học cải thiện" />
      </RadioGroup>
    </FormControl>
  );
}
