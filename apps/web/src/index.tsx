import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "@cpc/assets/fonts/onest.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./utils/i18n";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import LanguageProvider from "./providers/languageProvider";

const root = ReactDOM.createRoot(document.getElementById('root')!);
const queryClient = new QueryClient();
root.render(
    <React.StrictMode>
        <LanguageProvider>
            <QueryClientProvider client={queryClient}>
                <App/>
            </QueryClientProvider>
        </LanguageProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
