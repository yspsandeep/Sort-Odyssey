// import React, { Component } from 'react';
import './style.css';

// Sub components
import SortChart from '../SortChart';
import VisualizerControls from '../VisualizerControls';
import { LinearProgress } from '@mui/material';
import ColorKey from '../ColorKey';
import SortInfo from '../SortInfo';
import { useState, useEffect, useRef } from 'react';


function SortVisualizer(props) {
  const [trace, setTrace] = useState([]);
  const [traceStep, setTraceStep] = useState(-1);
  const [originalArray, setOriginalArray] = useState([]);
  const [array, setArray] = useState([]);
  const [groupA, setGroupA] = useState([]);
  const [groupB, setGroupB] = useState([]);
  const [groupC, setGroupC] = useState([]);
  const [groupD, setGroupD] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [timeoutIds, setTimeoutIds] = useState([]);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  
  // Use ref to keep track of the latest timeoutIds value in callbacks
  const timeoutIdsRef = useRef([]);
  
  // Update the ref whenever timeoutIds changes
  useEffect(() => {
    timeoutIdsRef.current = timeoutIds;
  }, [timeoutIds]);

  // Handle prop changes
  useEffect(() => {
    if (props.array) {
      reset(props.array);
    }
  }, [props.array]);

  useEffect(() => {
    if (props.trace) {
      clearTimeouts();
      setTrace(props.trace);
    }
  }, [props.trace]);

  // Helper functions
  const reset = (array) => {
    setArray(array);
    setTrace([]);
    setTraceStep(-1);
    setGroupA([]);
    setGroupB([]);
    setGroupC([]);
    setGroupD([]);
    setSortedIndices([]);
    setOriginalArray([...array]);
  };

  const clearTimeouts = () => {
    timeoutIdsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
    setTimeoutIds([]);
  };

  const changeVisualState = (visualState) => {
    setArray(visualState.array);
    setGroupA(visualState.groupA);
    setGroupB(visualState.groupB);
    setGroupC(visualState.groupC);
    setGroupD(visualState.groupD);
    setSortedIndices(visualState.sortedIndices);
  };

  // Action functions
  const run = (traceToRun) => {
    const newTimeoutIds = [];
    const timer = 250 / playbackSpeed;  //(250 milliseconds)

    // Set a timeout for each item in the trace
    traceToRun.forEach((item, i) => {
      const timeoutId = setTimeout(() => {
        setTraceStep((prevStep) => prevStep + 1);
        changeVisualState(item);
      }, i * timer);

      newTimeoutIds.push(timeoutId);
    });

    // Clear timeouts upon completion
    const finalTimeoutId = setTimeout(() => {
      clearTimeouts();
    }, traceToRun.length * timer);
    
    newTimeoutIds.push(finalTimeoutId);
    setTimeoutIds(newTimeoutIds);
  };

  const pause = () => {
    clearTimeouts();
  };

  const continueAnimation = () => {
    const remainingTrace = trace.slice(traceStep);
    run(remainingTrace);
  };

  const stepForward = () => {
    if (traceStep < trace.length - 1) {
      const item = trace[traceStep + 1];
      setTraceStep(traceStep + 1);
      changeVisualState(item);
    }
  };

  const stepBackward = () => {
    if (traceStep > 0) {
      const item = trace[traceStep - 1];
      setTraceStep(traceStep - 1);
      changeVisualState(item);
    }
  };

  

  const repeat = () => {
    clearTimeouts();
    setArray([...originalArray]);
    setTraceStep(-1);
    setGroupA([]);
    setGroupB([]);
    setGroupC([]);
    setGroupD([]);
    setSortedIndices([]);
    run(trace);
  };

  const adjustPlaybackSpeed = (speed) => {
    const newSpeed = Number(speed.split('x')[0]);
    setPlaybackSpeed(newSpeed);
  };

  useEffect(() => {
    if (timeoutIds.length > 0) {
      // Means it was playing when speed changed
      pause();
      setTimeout(continueAnimation, 0);
    }
  }, [playbackSpeed]);

  return (
    <div className="SortVisualizer">
      <SortChart
        numbers={array}
        maxNum={Math.max(...array)}
        groupA={groupA}
        groupB={groupB}
        groupC={groupC}
        groupD={groupD}
        sortedIndices={sortedIndices}
      />


      <div className="SortVisualizer__ProgressBar">
        <LinearProgress
          variant="determinate"
          value={
            trace.length > 0 && traceStep !== -1
              ? (traceStep / (trace.length - 1)) * 100
              : 0
          }
          sx={{
            width: '100%',
            height: '0.375rem',        // Same as your CSS (6px)
            borderRadius: '4px',
            overflow: 'hidden',        // Needed to keep rounded corners
            backgroundColor: 'var(--gray-300)', // Track color
            '& .MuiLinearProgress-bar': {
              height: '100%',
              borderRadius: '4px',
              backgroundColor: 'var(--secondary-light)', // Active color
              animation: 'primary-translate 500ms',       // Match your animation
            },
            '@keyframes primary-translate': {
              '0%': {
                transform: 'translateX(0)',
              },
              '20%': {
                animationTimingFunction: 'cubic-bezier(0.5, 0, 0.701732, 0.495819)',
                transform: 'translateX(0)',
              },
              '59.15%': {
                animationTimingFunction: 'cubic-bezier(0.302435, 0.381352, 0.55, 0.956352)',
                transform: 'translateX(83.67142%)',
              },
              '100%': {
                transform: 'translateX(200.611057%)',
              },
            },
          }}
        />
      </div>

      <VisualizerControls
        onPlay={traceStep === -1 ? () => run(trace) : continueAnimation}
        onPause={pause}
        onForward={stepForward}
        onBackward={stepBackward}
        onRepeat={repeat}
        onAdjustSpeed={adjustPlaybackSpeed}
        playing={timeoutIds.length > 0}
        playDisabled={
          (traceStep >= trace.length - 1 && traceStep !== -1) ||
          trace.length <= 0
        }
        forwardDisabled={traceStep >= trace.length - 1}
        backwardDisabled={traceStep <= 0}
        repeatDisabled={traceStep <= 0}
        playbackSpeed={playbackSpeed}
      />

      <ColorKey {...props.colorKey} />

      <SortInfo {...props.desc} />
    </div>
  );
}

export default SortVisualizer;
