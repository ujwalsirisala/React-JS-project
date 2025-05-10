import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import authReducer from "./state";
import {configureStore} from '@reduxjs/toolkit';//configureStore is used to store related data persistence
import {Provider} from 'react-redux';//Provider is used to send the data from parent component to required child components
import {persistStore, persistReducer,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER} from 'redux-persist';//To maintain state and Persistence State Related to our Application we need to use redux-persist. 

//PersistStore is used to maintain persistent storage(persist State) related to our application

//persistReducer is used to return persistent reducer object it will call rehydrate

//FLUSH is used to write all pending states to disk and returns a promise

//PAUSE is used to pause persistent store is there is any problem in application.

//PERSIST is used to resume the persistence store after problem solve

//PURGE is used to return state from disk and return a promise

//REHYDRATE phase is where the persist the store a data browser replace the data in redux store.Across all reducer every local state is rehydrated and is replaced by the persisted store.Each Reducer replaces the content by 


import  storage from 'redux-persist/lib/storage';//Storage will  store the DATA in the user Browser. 
import {PersistGate} from 'redux-persist/integration/react';//Persist Gate delays the rendering of our application related UI until our Persisted State from the store has been retrieved and save to redux. 

const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
  serializableCheck: {
  ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
  }),
  });
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <Provider store={store}>
   <PersistGate loading={null} persistor={persistStore(store)}>
    <App />
	</PersistGate>
	</Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
