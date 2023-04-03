import React from "react";
import ReactDOM from "react-dom/client";

import App from '@components/App';
import '@css/__app.css';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(<App />);
