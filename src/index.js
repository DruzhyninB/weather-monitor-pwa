import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import ReduxToastr from 'ultumus-react-redux-toastr';
import 'ultumus-react-redux-toastr/lib/css/react-redux-toastr.min.css';
import "antd/dist/antd.css";
import {store} from 'store';

import App from './App';
import './index.sass'

ReactDOM.render(
    <Provider store={store}>
        <App />
        <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            position="bottom-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            closeOnToastrClick
        />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
