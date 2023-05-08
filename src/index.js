import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAacrIvyzPgfKodQpaKTEg5gvpVZRNvbp8",
  authDomain: "harvest-tracker-cf6d9.firebaseapp.com",
  projectId: "harvest-tracker-cf6d9",
  storageBucket: "harvest-tracker-cf6d9.appspot.com",
  messagingSenderId: "845433280676",
  appId: "1:845433280676:web:7e9e3cfa8276f09d68ee31",
  measurementId: "G-VLMTJS6D6X",
  databaseURL: "https://harvest-tracker-cf6d9-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const database = getDatabase(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

