import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import {Buffer} from 'buffer';
import 'share-api-polyfill/dist/share-min';
import {setUseWhatChange} from '@simbathesailor/use-what-changed';
import {App} from './App'

window.Buffer = Buffer;
setUseWhatChange(true);
/**
if (import.meta.env.DEV) {
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