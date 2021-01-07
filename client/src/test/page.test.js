import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import {createStore, applyMiddleware, compose} from 'redux';
import reducers from '../reducers';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
import {Provider} from 'react-redux';
import reduxThunk from 'redux-thunk';
import {Router, Route, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';
const history = createBrowserHistory();

import BookDetail from '../pages/page.book.detail';
import BorrowList from '../pages/page.borrow.list';
import Category from '../pages/page.category';
import Default from '../pages/page.default';
import Login from '../pages/page.login';
import My from '../pages/page.my';
import Release from '../pages/page.release';
import RequestList from '../pages/page.request.list';
import Signup from '../pages/page.signup';

describe('/api/borrow', () => {
  it('page.signup', () => {
    render(
      <Provider store={createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)))}>
        <Router history={history}>
          <Signup history={history} location={{search: 'aaa=234'}} />
        </Router>
      </Provider>,
    );
  });

  it('page.release', () => {
    render(
      <Provider store={createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)))}>
        <Router history={history}>
          <RequestList history={history} location={{search: 'aaa=234'}} />
        </Router>
      </Provider>,
    );
  });

  it('page.release', () => {
    render(
      <Provider store={createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)))}>
        <Router history={history}>
          <Release history={history} location={{search: 'aaa=234'}} />
        </Router>
      </Provider>,
    );
  });

  it('page.my', () => {
    render(
      <Provider store={createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)))}>
        <Router history={history}>
          <My history={history} match={{params: {id: 111}}} />
        </Router>
      </Provider>,
    );
  });

  it('page.default', () => {
    render(
      <Provider store={createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)))}>
        <Router history={history}>
          <Login history={history} match={{params: {id: 111}}} />
        </Router>
      </Provider>,
    );
  });

  it('page.default', () => {
    render(
      <Provider store={createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)))}>
        <Router history={history}>
          <Default history={history} match={{params: {id: 111}}} />
        </Router>
      </Provider>,
    );
  });

  it('page.category', () => {
    render(
      <Provider store={createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)))}>
        <Router history={history}>
          <Category history={history} match={{params: {id: 111}}} />
        </Router>
      </Provider>,
    );
  });

  it('page.borrow.list', () => {
    render(
      <Provider store={createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)))}>
        <Router history={history}>
          <BorrowList history={history} match={{params: {id: 111}}} />
        </Router>
      </Provider>,
    );
  });

  it('page.book.detail', () => {
    render(
      <Provider store={createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)))}>
        <Router history={history}>
          <BookDetail history={history} match={{params: {id: 111}}} />
        </Router>
      </Provider>,
    );
    expect(screen.getByText(/name/i)).toBeInTheDocument();
  });
});
