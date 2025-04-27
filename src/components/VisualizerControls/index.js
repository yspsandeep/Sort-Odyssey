import React from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton, Stack, MenuItem, Select } from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  SkipNext as ForwardIcon,
  SkipPrevious as BackwardIcon,
  Replay as RepeatIcon
} from '@mui/icons-material';

// Helper function
function isDisabled(action, disabled = false) {
  return action === undefined || disabled;
}

const VisualizerControls = ({
  // Actions
  onPlay,
  onPause,
  onBackward,
  onForward,
  onRepeat,
  onAdjustSpeed,

  // States
  playing,
  playDisabled,
  pauseDisabled,
  backwardDisabled,
  forwardDisabled,
  repeatDisabled,
  playbackSpeed
}) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{ padding: 2 }}
    >
      {/* Repeat */}
      <IconButton
        color="primary"
        onClick={onRepeat}
        disabled={isDisabled(onRepeat, repeatDisabled)}
      >
        <RepeatIcon />
      </IconButton>

      {/* Backward */}
      <IconButton
        color="primary"
        onClick={onBackward}
        disabled={isDisabled(onBackward, backwardDisabled)}
      >
        <BackwardIcon />
      </IconButton>

      {/* Play/Pause */}
      <Button
        variant="contained"
        size="large"
        onClick={playing ? onPause : onPlay}
        disabled={
          playing
            ? isDisabled(onPause, pauseDisabled)
            : isDisabled(onPlay, playDisabled)
        }
        sx={{
          borderRadius: '50%',
          minWidth: '64px',
          width: '64px',
          height: '64px',
          fontSize: '2rem',
          bgcolor: '#ED6DBE',
        }}
      >
        {playing ? <PauseIcon fontSize="inherit" /> : <PlayIcon fontSize="inherit" />}
      </Button>

      {/* Forward */}
      <IconButton
        color="primary"
        onClick={onForward}
        disabled={isDisabled(onForward, forwardDisabled)}
      >
        <ForwardIcon />
      </IconButton>

      {/* Playback Speed Selector */}
      <Select
        value={`${playbackSpeed}x`}
        onChange={(e) => onAdjustSpeed(e.target.value.replace('x', ''))}
        displayEmpty
        size="small"
        sx={{ width: 100 }}
      >
        {['0.25x', '0.5x', '1x', '2x', '4x'].map((speed) => (
          <MenuItem key={speed} value={speed}>
            {speed}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
};

VisualizerControls.propTypes = {
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onBackward: PropTypes.func,
  onForward: PropTypes.func,
  onRepeat: PropTypes.func,
  onAdjustSpeed: PropTypes.func,

  playing: PropTypes.bool,
  playDisabled: PropTypes.bool,
  pauseDisabled: PropTypes.bool,
  backwardDisabled: PropTypes.bool,
  forwardDisabled: PropTypes.bool,
  repeatDisabled: PropTypes.bool,
  playbackSpeed: PropTypes.number
};

export default VisualizerControls;
