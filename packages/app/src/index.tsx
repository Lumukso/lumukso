import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import {Buffer} from 'buffer';
import {setUseWhatChange} from '@simbathesailor/use-what-changed';
import whyDidYouRender from '@welldone-software/why-did-you-render';
import {App} from './App'

window.Buffer = Buffer;
setUseWhatChange(true);
whyDidYouRender(React, {
    trackAllPureComponents: true,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
)