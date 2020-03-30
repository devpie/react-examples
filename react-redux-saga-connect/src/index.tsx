import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore, Middleware} from 'redux';
import {createLogger} from 'redux-logger';
import App from './containers/App';
import reducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import fetchPostsSaga from './sagas/fetchPosts';

const sagaMiddleware = createSagaMiddleware();
const middleware: Middleware[] = [];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}
middleware.push(sagaMiddleware);

const store = createStore(
  reducer,
  applyMiddleware(...middleware),
);

sagaMiddleware.run(fetchPostsSaga);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
