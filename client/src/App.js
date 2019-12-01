import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { Provider } from 'react-redux';
import initiateStore from './redux/store';

// intiate redux storage
const store = initiateStore();
export const dispatch = store.dispatch;

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <AppRoutes />
        </Router>
      </Provider>
    );
  }
}
