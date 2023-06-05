import { createRoot } from 'react-dom/client';
import React from "react";
import App from './components/App'

const div = document.createElement('div');
document.querySelector('body').appendChild(div);
div.setAttribute('id', 'root');
const root = createRoot(document.getElementById('root'));
root.render(<App/>);

/*
const root = createRoot(div);
*/