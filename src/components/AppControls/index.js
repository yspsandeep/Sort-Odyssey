import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';

import { Menu, MenuItem, Button } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'; // <-- import dropdown icon

const AppControls = ({
  algorithm,
  onAlgorithmChange,
  onGenerateRandomArray,
  arraySize,
  onArraySizeChange,
}) => {
  const [anchorElAlgorithm, setAnchorElAlgorithm] = useState(null);
  const [anchorElSize, setAnchorElSize] = useState(null);

  const handleOpenAlgorithmMenu = (event) => {
    setAnchorElAlgorithm(event.currentTarget);
  };

  const handleCloseAlgorithmMenu = () => {
    setAnchorElAlgorithm(null);
  };

  const handleOpenSizeMenu = (event) => {
    setAnchorElSize(event.currentTarget);
  };

  const handleCloseSizeMenu = () => {
    setAnchorElSize(null);
  };

  const algorithmOptions = [
    'Bubble Sort',
    'Selection Sort',
    'Insertion Sort',
    'Merge Sort',
    'Quick Sort',
    'Heap Sort',
  ];

  const sizeOptions = ['5', '10', '25', '50', '75', '100'];

  const buttonStyle = {
    fontSize: '1.2rem', // <-- increase font size
    textTransform: 'none', // optional: keep text normal case (not all uppercase)
    margin: '0 8px',
    color: 'white',
  };

  return (
    <Fragment>
      <div>
        <Button
          onClick={handleOpenAlgorithmMenu}
          style={buttonStyle}
          endIcon={<ArrowDropDownIcon />} // <-- add dropdown icon
        >
          {algorithm || 'Sort Algorithm'}
        </Button>
        <Menu
          anchorEl={anchorElAlgorithm}
          open={Boolean(anchorElAlgorithm)}
          onClose={handleCloseAlgorithmMenu}
        >
          {algorithmOptions.map((option) => (
            <MenuItem
              key={option}
              selected={option === algorithm}
              onClick={() => {
                onAlgorithmChange(option);
                handleCloseAlgorithmMenu();
              }}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>

      <div>
        <Button
          onClick={handleOpenSizeMenu}
          style={buttonStyle}
          endIcon={<ArrowDropDownIcon />} // <-- add dropdown icon
        >
          {arraySize ? `Size: ${arraySize}` : 'Size'}
        </Button>
        <Menu
          anchorEl={anchorElSize}
          open={Boolean(anchorElSize)}
          onClose={handleCloseSizeMenu}
        >
          {sizeOptions.map((size) => (
            <MenuItem
              key={size}
              selected={String(size) === String(arraySize)}
              onClick={() => {
                onArraySizeChange(Number(size));
                handleCloseSizeMenu();
              }}
            >
              {size}
            </MenuItem>
          ))}
        </Menu>
      </div>

      <Button
        onClick={onGenerateRandomArray}
        style={buttonStyle}
      >
        Randomize
      </Button>
    </Fragment>
  );
};

AppControls.propTypes = {
  algorithm: PropTypes.string,
  onAlgorithmChange: PropTypes.func.isRequired,
  onGenerateRandomArray: PropTypes.func.isRequired,
  arraySize: PropTypes.number,
  onArraySizeChange: PropTypes.func.isRequired,
};

export default AppControls;
