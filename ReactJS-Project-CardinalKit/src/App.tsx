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

class App extends React.Component<AppProps, { isLoggedIn: any }> {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  componentWillMount() {
    if (window.localStorage.getItem('isLoggedIn') !== null) {
      var isLoggedIn: any = window.localStorage.getItem('isLoggedIn');
      this.setState({
        isLoggedIn
      });
    }
  }

  render() {
    const { isLoggedIn } = this.state;

    return (
      <Router>
        <Switch>
          <PrivateRoute
            exact
            path={['/', '/users']}
            component={UsersPage}
            isLoggedIn={isLoggedIn}
          />

          <PrivateRoute
            exact
            path="/manage_users"
            component={ManageUsers}
            isLoggedIn={isLoggedIn}
          />

          <PrivateRoute
            exact
            path="/users/:userID"
            component={(props: any) => <UserPage {...props} />}
            isLoggedIn={isLoggedIn}
          />

          <PrivateRoute
            exact
            path="/manage_surveys"
            component={ManageSurveys}
            isLoggedIn={isLoggedIn}
          />

          <PrivateRoute
            exact
            path="/create_survey"
            component={CreateSurvey}
            isLoggedIn={isLoggedIn}
          />

          <PrivateRoute
            exact
            path="/users/:userID/:surveyId"
            component={(props: any) => <ViewResponse {...props} />}
            isLoggedIn={isLoggedIn}
          />

          <PublicRoute exact path="/login" component={LoginPage} isLoggedIn={isLoggedIn} />

          <PublicRoute
            exact
            path="/verify_code"
            component={VerificationPage}
            isLoggedIn={isLoggedIn}
          />

          <PrivateRoute component={NotFoundPage} isLoggedIn={isLoggedIn} />
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
