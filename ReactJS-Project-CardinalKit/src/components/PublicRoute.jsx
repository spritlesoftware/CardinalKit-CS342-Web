import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { isAuthenticated } from '../selectors/loginSelectors';
import SideBar from './SideBar';
import Header from './Header';

const PublicRoute = ({ isLoggedIn, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn ? (
        <Redirect
          to={{
            pathname: '/users',
            state: { from: props.location },
          }}
        />
      ) : (
        <main className="h-full overflow-y-auto">
          <Component {...props} />
        </main>
      )
    }
  />
);

export default PublicRoute;
