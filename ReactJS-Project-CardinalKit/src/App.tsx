import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import CreateSurvey from './components/CreateSurvey';
import LoginPage from './components/LoginPage';
import ManageSurveys from './components/ManageSurveys';
import ManageUsers from './components/ManageUsers';
import NotFoundPage from './components/NotFoundPage';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import UserPage from './components/UserPage';
import UsersPage from './components/UsersPage';
import VerificationPage from './components/VerificationPage';
import ViewResponse from './components/ViewResponse';
import { Store } from './reducers/rootReducer';
import { isAuthenticated } from './selectors/loginSelectors';

interface AppProps {
  isAuth: boolean;
}
class App extends React.Component<AppProps> {

  render() {

    return (
      <Router>
        <Switch>
          <PrivateRoute
            exact
            path={['/', '/users']}
            component={UsersPage}
          />

          <PrivateRoute
            exact
            path="/manage_users"
            component={ManageUsers}
          />

          <PrivateRoute
            exact
            path="/users/:userID"
            component={(props: any) => <UserPage {...props} />}
          />

          <PrivateRoute
            exact
            path="/manage_surveys"
            component={ManageSurveys}
          />

          <PrivateRoute
            exact
            path="/create_survey"
            component={CreateSurvey}
          />

          <PrivateRoute
            exact
            path="/users/:userID/:surveyId"
            component={(props: any) => <ViewResponse {...props} />}
          />

          <PublicRoute 
            exact 
            path="/login" 
            component={LoginPage} 
          />

          <PublicRoute
            exact
            path="/verify_code"
            component={VerificationPage}
          />

          <PrivateRoute component={NotFoundPage} />
        </Switch>
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
