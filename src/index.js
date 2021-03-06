import React from 'react';
import ReactDOM from 'react-dom';
import Https from 'react-https-redirect';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Store from './store';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const store = createStore(
    Store,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
<Https>
    <Provider store={store}>
        <App />
    </Provider>    
</Https>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
