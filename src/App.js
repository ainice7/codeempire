import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {QuestionState} from './data/QuestionState'
import {Home} from './pages/Home'
import {Result} from './pages/Result'
import { Header } from './components/Header';

function App() {

  return (
    <BrowserRouter>
      <QuestionState>
        <Header />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/result/' component={Result} />
        </Switch>
      </QuestionState>
    </BrowserRouter>
  );
}

export default App;
