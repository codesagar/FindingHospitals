import React,{Suspense} from 'react';

import { Switch, Route } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import Header from './components/Header';
import Footer from './components/Footer';

import './App.css';

require('dotenv').config();

const Home = React.lazy(() => import('./views/HomePage'));
const Terms = React.lazy(() => import('./views/TermsPage'));
const Contact = React.lazy(() => import('./views/ContactPage'));

const Loading = () => {
  return <div className="progress-container">
    <CircularProgress />
  </div>
}

const App = () => {
  return (
    <div>
      <div className="app-main">
        <Header />
        <Suspense fallback={<Loading/>}>
          <Switch>
            <Route path='/contact' component={Contact}/>
            <Route path='/terms' component={Terms}/>
            <Route path='/' component={Home}/>
          </Switch>
        </Suspense>
      </div>
      <Footer/>
    </div>
  );
}

export default App;