import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import { Store } from './reducers/rootReducer';
import { isAuthenticated } from './selectors/loginSelectors';
import SideBar from './components/SideBar';
import DashboardPage from './components/DashboardPage';
import Header from './components/Header';
import LoginPage from './components/LoginPage';
import NotFoundPage from './components/NotFoundPage';
import UserPage from './components/UserPage';
import UsersPage from './components/UsersPage';
import UserList from './components/UserList';

interface AppProps {
  isAuth: boolean;
}

class App extends React.Component<AppProps> {
  render() {
    const { isAuth } = this.props;

    return (
      <Router>
        <div>
          <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            {isAuth && (
              <>
                <SideBar />
              </>
            )}
            <div className="flex flex-col flex-1 w-full">
              {isAuth && <Header />}
              <main className="h-full overflow-y-auto">
                <Switch>
                  <Route exact={true} path="/login" component={LoginPage} />
                  <Route exact={true} path="/dashboard" component={DashboardPage} />
                  <PrivateRoute exact={true} path="/users" component={UsersPage} />
                  <PrivateRoute
                    exact={true}
                    path="/user/:userID"
                    component={(props: any) => <UserPage {...props} />}
                  />
                  <Redirect exact={true} from="/" to="/users" />
                  <Route component={NotFoundPage} />
                </Switch>
              </main>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state: Store) {
  return {
    isAuth: isAuthenticated(state),
  };
}

export default connect(mapStateToProps)(App);
