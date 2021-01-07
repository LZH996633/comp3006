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

import MyNav from '../components/component.mynav';
import Header from '../components/component.header';
import BookItem from '../components/component.book.item';
import Confirm from '../components/component.confirm';
import Message from '../components/component.message';
import PageNavigation from '../components/component.page.navigation';

it('component.mynav', () => {
  render(
    <Provider store={createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)))}>
      <Router history={history}>
        <MyNav history={history} />
      </Router>
    </Provider>,
  );
  expect(screen.getByText(/My Book List/i)).toBeInTheDocument();
  expect(screen.getByText(/Release/i)).toBeInTheDocument();
  expect(screen.getByText(/Request List/i)).toBeInTheDocument();
  expect(screen.getByText(/Borrow List/i)).toBeInTheDocument();
});
it('component.header', () => {
  render(
    <Provider store={createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)))}>
      <Router history={history}>
        <Header history={history} />
      </Router>
    </Provider>,
  );
  expect(screen.getByText(/all/i)).toBeInTheDocument();
});

it('component.book.item', () => {
  const book = {price: 111, book_name: 'book_name', image: '', is_borrow: false};
  render(
    <Provider store={createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)))}>
      <Router history={history}>
        <BookItem history={history} book={book} />
      </Router>
    </Provider>,
  );
  expect(screen.getByText(/book_name/i)).toBeInTheDocument();
});

it('component.confirm', () => {
  render(
    <Provider store={createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)))}>
      <Router history={history}>
        <Confirm history={history} />
      </Router>
    </Provider>,
  );
  expect(screen.getByText(/message/i)).toBeInTheDocument();
});

it('component.message', () => {
  const item = {
    id: '5fe20a7ed2453c5f68eb2c84',
    book_id: '5fe205f944a0a822d8c869f2',
    book_user_id: '5fe205c344a0a822d8c869f1',
    book_username: '123',
    book_address: '123',
    book_name: '1',
    book_price: 1,
    request_user_id: '5fda37fa496ade443c6c50f3',
    request_username: 'ee',
    request_address: 'aaaa',
    message: [
      {request_msg: 'aaaa', create_time: '2020-12-22T15:02:22.797Z', reply_msg: ''},
      {request_msg: '', reply_msg: '123', create_time: '2020-12-22T15:02:45.73Z'},
      {request_msg: '', reply_msg: '6548979651', create_time: '2020-12-22T15:02:54.88Z'},
      {request_msg: '', reply_msg: '//////////', create_time: '2020-12-22T15:02:58.981Z'},
      {request_msg: 'aaee', create_time: '2020-12-22T15:03:08.849Z', reply_msg: ''},
      {request_msg: '', reply_msg: '', create_time: '2020-12-22T15:03:11.868Z'},
    ],
    state: 2,
    create_time: '2020-12-22T15:02:22.803Z',
    update_time: '2020-12-22T15:03:11.868Z',
  };
  
  render(
    <Provider store={createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)))}>
      <Router history={history}>
        <Message history={history} item={item} />
      </Router>
    </Provider>,
  );
  
});

it('component.page.navigation', () => {
  render(
    <Provider store={createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)))}>
      <Router history={history}>
        <PageNavigation history={history} />
      </Router>
    </Provider>,
  );
  expect(screen.getByText(/<</i)).toBeInTheDocument();
});
