import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { Box } from '@mui/material';

const getListOfBars = (
  numbers,
  maxNum,
  groupA,
  groupB,
  groupC,
  groupD,
  sortedIndices
) => {
  return numbers.map((num, i) => {
    const width = 100 / numbers.length;
    const height = (num / maxNum) * 100;

    const isStateA = groupA.includes(i);
    const isStateB = groupB.includes(i);
    const isStateC = groupC.includes(i);
    const isStateD = groupD.includes(i);
    const isSorted = sortedIndices.includes(i);

    const margin =
      i === numbers.length ? '0' : width > 3 ? '0.5rem' : '0.125rem';

    // Set background color depending on state
    let backgroundColor = 'var(--white)';
    if (isStateA) backgroundColor = 'var(--amber)';
    else if (isStateB) backgroundColor = 'var(--secondary)';
    else if (isStateC) backgroundColor = 'var(--red)';
    else if (isStateD) backgroundColor = 'var(--blue)';
    if (isSorted) backgroundColor = 'var(--primary)';

    return (
      <Box
        key={`${i}_${num}`}
        sx={{
          display: 'flex',
          flexDirection: 'column-reverse',
          alignItems: 'flex-end',
          justifyContent: 'flex-start',
          width: `${width}%`,
          height: `${height}%`,
          backgroundColor,
          color: 'var(--text-color-dark)',
          marginRight: margin,
          transition: 'all 125ms ease-in-out',
          fontSize: width > 4 ? '0.75rem' : '0',
          borderRadius: '4px',
          border: '1px solid black',
        }}
      >
        {width > 4 ? (
          <Box
            component="span"
            sx={{
              margin: '0 auto 0.25rem',
            }}
          >
            {num}
          </Box>
        ) : null}
      </Box>
    );
  });
};


const SortChart = ({
  numbers,
  maxNum,
  groupA,
  groupB,
  groupC,
  groupD,
  sortedIndices
}) => {
  return (
    <div className="SortChart">
      {getListOfBars(
        numbers,
        maxNum,
        groupA,
        groupB,
        groupC,
        groupD,
        sortedIndices
      )}
    </div>
  );
};

SortChart.propTypes = {
  numbers: PropTypes.arrayOf(PropTypes.number),
  maxNum: PropTypes.number,
  groupA: PropTypes.arrayOf(PropTypes.number),
  groupB: PropTypes.arrayOf(PropTypes.number),
  groupC: PropTypes.arrayOf(PropTypes.number),
  groupD: PropTypes.arrayOf(PropTypes.number),
  sortedIndices: PropTypes.arrayOf(PropTypes.number)
};

export default SortChart;
