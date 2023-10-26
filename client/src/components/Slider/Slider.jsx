import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 50,
    label: '1K',
  },
  {
    value: 100,
    label: '100K',
  },
];

function valuetext(value) {
  return `${value}K`;
}

export default function DiscreteSliderMarks() {
  return (
    <Box sx={{ width: "100%" }}>
      <Slider
        aria-label="Price"
        defaultValue={50}
        getAriaValueText={valuetext}
        step={1}
        valueLabelDisplay="auto"
        marks={marks}
      />
    </Box>
  );
}
