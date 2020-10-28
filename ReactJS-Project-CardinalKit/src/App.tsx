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
import { Store } from './reducers/rootReducer';
import { isAuthenticated } from './selectors/loginSelectors';

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
            {/* {isAuth && (
              <>
                <SideBar />
              </>
            )} */}
            <div className="flex flex-col flex-1 w-full">
              {isAuth && <Header />}
              <main className="h-full overflow-y-auto">
                <Switch>
                  <Route exact={true} path="/login" component={LoginPage} />
                  <Route exact={true} path="/dashboard" component={DashboardPage} />
                  <Route exact={true} path="/users" component={UsersPage} />
                  <Route exact={true} path="/verify_code" component={VerificationPage} />
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
