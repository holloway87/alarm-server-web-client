import {CContainer} from '@coreui/react';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';

import './index.scss';

ReactDOM.render(
    <React.StrictMode>
        <div className="c-wrapper">
            <div className="c-body">
                <main className="c-main">
                    <CContainer>
                        <App/>
                    </CContainer>
                </main>
            </div>
        </div>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
