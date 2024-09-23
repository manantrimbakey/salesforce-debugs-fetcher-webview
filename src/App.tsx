import React from "react";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Main from "./Main";
import globalProps from './global_props.js';

export const GLOBAL_CSS = {
    marginTop: '2rem',
    marginBottom: '2rem',
    marginLeft: '2rem',
    marginRight: '2rem',
}

// Create a constant for the full server URL
export const SERVER_URL = `${globalProps.server_url}:${globalProps.server_port}`;

function App() {
    return (
        <div className="App">
            <Main />
        </div>
    );
}

export default App;
