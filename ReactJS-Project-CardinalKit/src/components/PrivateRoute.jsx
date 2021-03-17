import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

import SideBar from './SideBar';
import Header from './Header';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const verifyCode = window.localStorage.getItem('verifyCode');
  const isLoggedIn = window.localStorage.getItem('isLoggedIn');

  useEffect(() => {
    window.addEventListener('storage', e => {
      if (!window.localStorage.getItem('isLoggedIn')) {
        window.location.reload();
      }
    });
  });

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn || verifyCode ? (
          <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <SideBar />
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
};

export default PrivateRoute;
