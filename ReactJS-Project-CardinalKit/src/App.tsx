import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import DashboardPage from './components/DashboardPage';
import Header from './components/Header';
import LoginPage from './components/LoginPage';
import NotFoundPage from './components/NotFoundPage';
import PrivateRoute from './components/PrivateRoute';
import SideBar from './components/SideBar';
import UserList from './components/UserList';
import UserPage from './components/UserPage';
import UsersPage from './components/UsersPage';
import VerificationPage from './components/VerificationPage';
import { loginReducer } from './reducers/loginReducer';
import { Store } from './reducers/rootReducer';
import { isAuthenticated } from './selectors/loginSelectors';
import ManageUsers from './components/ManageUsers';

interface AppProps {
  isAuth: boolean;
}

class App extends React.Component<AppProps, { isLoggedIn: any }> {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }
  componentWillMount() {
    this.setState({
      isLoggedIn: window.sessionStorage.getItem('isLoggedIn'),
    });
    console.log(window.sessionStorage.getItem('isLoggedIn'));
  }

  render() {
    const { isAuth } = this.props;
    const { isLoggedIn } = this.state;
    console.log(isAuth, 'isAuth');

    if (isLoggedIn) {
      return (
        <div>
          <Router>
          <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            {isLoggedIn && <SideBar />}
            <div className="flex flex-col flex-1 w-full">
              {isLoggedIn && <Header />}
              <main className="h-full overflow-y-auto">
                <Switch>
                  <Route exact={true} path="/">
                    <Redirect to={{ pathname: '/login' }} />
                  </Route>
                  <Route exact={true} path="/login" component={LoginPage} />
                  <Route exact={true} path="/dashboard" component={DashboardPage} />
                  <Route exact={true} path="/users" component={UsersPage} />
                  <Route exact={true} path="/verify_code" component={VerificationPage} />
                  <Route exact={true} path="/manage_users" component={ManageUsers} />
                  <Route
                    exact={true}
                    path="/users/:userID"
                    component={(props: any) => <UserPage {...props} />}
                  />
                  <Redirect exact={true} from="/" to="/users" />
                  <Route component={NotFoundPage} />
                </Switch>
              </main>
            </div>
            </div>
          </Router>
        </div>
      )
    } else {
      return (
        <div>
          <Router>
            <Redirect to={{pathname: '/login'}} />
            <Route
              exact={true}
              path="/login"
              component={LoginPage}
            />
            <Route
              exact={true}
              path="/verify_code"
              component={VerificationPage}
            />
          </Router>
        </div>
      )
    }
  }
  }


function mapStateToProps(state: Store) {
  return {
    isAuth: isAuthenticated(state),
  };
}

export default connect(mapStateToProps)(App);
