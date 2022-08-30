import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import {Buffer} from 'buffer';
import 'share-api-polyfill/dist/share-min';
import {App} from './App'

window.Buffer = Buffer;
/**
if (import.meta.env.DEV) {
    setUseWhatChange(true);
    whyDidYouRender(React, {
        trackAllPureComponents: true,
    });
}*/

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
)