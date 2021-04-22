import React from 'react';

import { Switch, Route } from 'react-router-dom';

import ContactPage from './views/ContactPage';
import HomePage from './views/HomePage';
import TermsPage from './views/TermsPage';
import Header from './components/Header';
import Footer from './components/Footer';

import './App.css';

require('dotenv').config();

const App = () => {
  return (
    <div>
      <div className="app-main">
      <Header />
      <Switch>
        <Route path='/contact'>
          <ContactPage />
        </Route>
        <Route path='/terms'>
          <TermsPage />
        </Route>
        <Route path='/'>
          <HomePage />
        </Route>
        </Switch>
      </div>
      <Footer/>
    </div>
  );
}

export default App;