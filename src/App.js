import React from 'react';

import { Switch, Route } from 'react-router-dom';

import ContactPage from './views/ContactPage';
import HomePage from './views/HomePage';
import Header from './components/Header';

import './App.css';

require('dotenv').config();

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <Switch>
        <Route path='/contact'>
          <ContactPage />
        </Route>
        <Route path='/'>
          <HomePage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;