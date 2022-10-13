import reportWebVitals from './reportWebVitals';
import * as ReactDOMClient from 'react-dom/client';
import React from 'react';
import App from './App';

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);

reportWebVitals();
