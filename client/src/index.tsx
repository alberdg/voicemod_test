import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './index.css';
import './utils/string-extension';
import Login from './components/Login/login';
import Signup from './components/Signup/signup';
import Home from './components/Home/home';
import AddUser from './components/AddUser/add-user';
import EditUser from './components/EditUser/edit-user';
import AppContext from './context/app-context';
import UserContext from './context/user-context';
import PasswordContext from './context/password-context';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <AppContext>
      <UserContext>
        <PasswordContext>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/users" component={Home} />
              <Route exact path="/users/add" component={AddUser} />
              <Route exact path="/users/:id" component={EditUser} />
            </Switch>
          </BrowserRouter>
        </PasswordContext>
      </UserContext>
    </AppContext>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
