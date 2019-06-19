import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import libraryLanding from './components/libraryLanding'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './main.css'

const BaseLayout = () => (
    <div className="grid-container">
        <header className="header">
            <div className="header__search">Online Library System</div>
            <div className="header__avatar">Welcome User</div>
        </header>

        <div className="main">
            <Route path="/" exact component={libraryLanding} />
            {/* <Route path="/search" component={searchBook} /> */}
            {/* <Route component={ErrorPage} /> */}
        </div>
        <footer className="footer">
            <div className="footer__copyright"></div>
            <div className="footer__signature"></div>
        </footer>
    </div>
)

export const ReactApp = () => {
    return (
        <BrowserRouter>
            <Switch>
                <BaseLayout />
            </Switch>
        </BrowserRouter>
    );
};
import reducer from './reducers';
const store = createStore(reducer);
ReactDOM.render(
    <Provider store={store}>
        <ReactApp />
    </Provider>
    , document.getElementById('react-app')
);

