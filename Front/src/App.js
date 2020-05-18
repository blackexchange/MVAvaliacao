import React from 'react';
import logo from './logo.svg';
import './App.css';
import { store } from "./actions/store";
import { Provider } from "react-redux";

import DJogadores from './components/DJogadores';
import DPartidas from './components/DPartidas';
import DTimes from './components/DTimes';

import { Container } from "@material-ui/core";
import { ToastProvider } from "react-toast-notifications";
import { dJogador } from './reducers/dJogador';

function App() {
  return (
    <Provider store={store}>
      <ToastProvider autoDismiss={true}>
        <Container maxWidth="lg">
        <DTimes />
        <DJogadores/>
      
        <DPartidas />
       
         
        </Container>
      </ToastProvider>
    </Provider>
  );
}

export default App;
