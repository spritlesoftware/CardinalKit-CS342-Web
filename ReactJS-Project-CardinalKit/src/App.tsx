import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import LoginPage from './components/LoginPage';
import ManageUsers from './components/ManageUsers';
import NotFoundPage from './components/NotFoundPage';
import SideBar from './components/SideBar';
import UserPage from './components/UserPage';
import UsersPage from './components/UsersPage';
import VerificationPage from './components/VerificationPage';
import ViewResponse from './components/ViewResponse';
import { Store } from './reducers/rootReducer';
import { isAuthenticated } from './selectors/loginSelectors';

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
  }

  render() {
    const { isLoggedIn } = this.state;

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
                    <Route exact path={['/', '/users']} component={UsersPage} />
                    <Route exact path="/manage_users" component={ManageUsers} />
                    <Route
                      exact
                      path="/users/:userID"
                      component={(props: any) => <UserPage {...props} />}
                    />
                    <Route
                      exact
                      path="/users/:userID/:surveyId"
                      component={(props: any) => <ViewResponse {...props} />}
                    />
                    <Route component={NotFoundPage} />
                  </Switch>
                </main>
              </div>
            </div>
          </Router>
        </div>
      );
    } else {
      return (
        <div>
          <Router>
            <Redirect to={{ pathname: '/login' }} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/verify_code" component={VerificationPage} />
          </Router>
        </div>
      );
    }
  }
}

function mapStateToProps(state: Store) {
  return {
    isAuth: isAuthenticated(state),
  };
}

export default connect(mapStateToProps)(App);
