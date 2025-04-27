
import React from 'react';
import { createRoot } from 'react-dom/client'; // 👈 updated import
import './index.css';
import App from './App';

const container = document.getElementById('root'); // 👈 get the root element
const root = createRoot(container); // 👈 create a root
root.render(<App />); // 👈 render your App