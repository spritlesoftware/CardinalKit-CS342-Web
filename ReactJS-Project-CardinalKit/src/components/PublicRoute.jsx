import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';


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
