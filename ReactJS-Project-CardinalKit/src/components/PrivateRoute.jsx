import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


import { isAuthenticated } from '../selectors/loginSelectors';
import SideBar from './SideBar';
import Header from './Header';

const verifyCode = window.localStorage.getItem('verifyCode')

const PrivateRoute = ({ isLoggedIn, component: Component, ...rest }) => (
 <Route
    {...rest}
    render={props =>
      (isLoggedIn || verifyCode)  ?  (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
          <SideBar/>
          <div className="flex flex-col flex-1 w-full">
            <Header />
            <main className="h-full overflow-y-auto">
              <Component {...props} />
            </main>
          </div>
        </div>
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);


export default PrivateRoute