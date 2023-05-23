import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const REACT_APP_FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY
const REACT_APP_FIREBASE_APP_ID = process.env.REACT_APP_FIREBASE_APP_ID

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: "harvest-tracker-cf6d9.firebaseapp.com",
  projectId: "harvest-tracker-cf6d9",
  storageBucket: "harvest-tracker-cf6d9.appspot.com",
  messagingSenderId: "845433280676",
  appId: REACT_APP_FIREBASE_APP_ID,
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

