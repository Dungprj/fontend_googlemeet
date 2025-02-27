import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from '~/components/GlobalStyles';

import { UserProvider } from '~/Context/UserContext/UserContext';
import { MeetingProvider } from '~/Context/MeetingContext';
import { CallFixProvider } from '~/Context/CallContext/CallContextfix';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <GlobalStyle>
        <UserProvider>
            <MeetingProvider>
                <CallFixProvider>
                    <App />
                </CallFixProvider>
            </MeetingProvider>
        </UserProvider>
    </GlobalStyle>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
