import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import './App.css';

import AppControls from './components/AppControls';
import SortVisualizer from './components/SortVisualizer';


import BubbleSort, {
  BubbleSortKey,
  BubbleSortDesc
} from './algorithms/BubbleSort';
import SelectionSort, {
  SelectionSortKey,
  SelectionSortDesc
} from './algorithms/SelectionSort';
import InsertionSort, {
  InsertionSortKey,
  InsertionSortDesc
} from './algorithms/InsertionSort';
import MergeSort, {
  MergeSortKey,
  MergeSortDesc
} from './algorithms/MergeSort';
import QuickSort, {
  QuickSortKey,
  QuickSortDesc
} from './algorithms/QuickSort';
import HeapSort, {
  HeapSortKey,
  HeapSortDesc
} from './algorithms/HeapSort';

function App() {
  // State using useState hooks
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(10);
  const [trace, setTrace] = useState([]);
  const [algorithm, setAlgorithm] = useState(null);

  // Algorithm mappings - defined outside of render cycles
  const ALGORITHM = {
    'Bubble Sort': BubbleSort,
    'Selection Sort': SelectionSort,   //Mapping names (strings ) to their corresponding
                                      // sorting functions implementations.
    'Insertion Sort': InsertionSort,
    'Merge Sort': MergeSort,
    'Quick Sort': QuickSort,
    'Heap Sort': HeapSort,
  };

  const ALGORITHM_KEY = {
    'Bubble Sort': BubbleSortKey,
    'Selection Sort': SelectionSortKey,
    'Insertion Sort': InsertionSortKey,
    'Merge Sort': MergeSortKey,
    'Quick Sort': QuickSortKey,
    'Heap Sort': HeapSortKey,
  };

  const ALGORITHM_DESC = {
    'Bubble Sort': BubbleSortDesc,
    'Selection Sort': SelectionSortDesc,
    'Insertion Sort': InsertionSortDesc,
    'Merge Sort': MergeSortDesc,
    'Quick Sort': QuickSortDesc,
    'Heap Sort': HeapSortDesc,
  };

// Function to create trace after array changes
  const createTrace = () => {
    const numbers = [...array];
    const sort = ALGORITHM[algorithm];
    if (sort) {
      const newTrace = sort(numbers);
      setTrace(newTrace);
    }
  };

  // Function to generate random array
  const generateRandomArray = () => {
    // Generate pseudo-random number between 1 and max
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max)) + 1;
    }

    // Generate an array of length arraySize
    const newArray = Array(arraySize)
      .fill(0)
      .map(() => getRandomInt(arraySize * 5));    // the array elements from [1 to 5*arraySize]

    setArray(newArray);
    setTrace([]);
    
    // Use this pattern instead of setState callback
    // The trace creation will happen after state update due to the useEffect below
  };

  // Handle algorithm change
  const handleAlgorithmChange = (newAlgorithm) => {
    setAlgorithm(newAlgorithm);
    // We'll handle array regeneration in useEffect
  };

  // Handle array size change
  const handleArraySizeChange = (size) => {
    size = Number(size);
    size = size > 100 ? 100 : size;
    size = size < 0 ? 0 : size;
    setArraySize(size);
    // We'll handle array regeneration in useEffect
  };


  // Equivalent to componentDidMount
  useEffect(() => {
    generateRandomArray();
    // Empty dependency array means this runs once on mount
  }, []);

  // Handle algorithm changes - regenerate array when algorithm changes
  useEffect(() => {
    if (algorithm !== null) {
      const newArray = [...array];
        setArray([...array]);
        setTrace([]);
    }
  }, [algorithm]);

  // Handle array size changes - regenerate array when size changes
  useEffect(() => {
    generateRandomArray();
  }, [arraySize]);

  // Create trace when array changes
  useEffect(() => {
    if (array.length > 0 && algorithm) {
      createTrace();
    }
  }, [array, algorithm]);

  const colorKey = ALGORITHM_KEY[algorithm];
  const desc = ALGORITHM_DESC[algorithm];

  const controls = (
    <AppControls
      onGenerateRandomArray={generateRandomArray}
      algorithm={algorithm}
      onAlgorithmChange={handleAlgorithmChange}
      arraySize={arraySize}
      onArraySizeChange={handleArraySizeChange}
    />
  );

  return (

    <div className='App'>
      <AppBar position="static" elevation={1} sx={{ backgroundColor: '#5E95DE' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="div" sx={{ color: 'white',fontSize: '2rem',fontFamily: 'Roboto, sans-serif',textShadow: '2px 2px 0 black, -2px 2px 0 black, 2px -2px 0 black, -2px -2px 0 black', }}>
              Sort Odyssey
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
            {controls}
          </Box>
        </Toolbar>
      </AppBar>


      <main className="App__Body">
        <SortVisualizer
          array={array}
          trace={trace}
          colorKey={colorKey}
          desc={desc}
        />
      </main>

      <footer>
        <section>
           built by{' '}
          Sandeep Yerrapragada
        </section>

        <section>
          <a
            href="https://github.com/yspsandeep/Sort-Odyssey"
            target="_blank"
            rel="noopener noreferrer"
            className="Footer__Link"
          >
            Code
          </a>
        </section>
      </footer>
    </div>
      
  );
}

export default App;
