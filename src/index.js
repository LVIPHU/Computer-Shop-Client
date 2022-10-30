import reportWebVitals from './reportWebVitals';
import * as ReactDOMClient from 'react-dom/client';
import React from 'react';
import App from './App';
import DataProvider from '@/redux/store.js';
const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <DataProvider>
            <App />
        </DataProvider>
    </React.StrictMode>,
);

reportWebVitals();
