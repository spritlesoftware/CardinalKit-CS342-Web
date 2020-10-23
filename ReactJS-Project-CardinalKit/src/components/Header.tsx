import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Link } from 'react-router-dom';

import { LogOut } from 'react-feather';

import { logoutUser } from '../actions/loginActions';
import { Store } from '../reducers/rootReducer';

import logo from '../images/cardinal_logo_white.svg';

class Header extends React.Component<HeaderProps> {
  state = { collapsed: false };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { logout } = this.props;
    return (
      // <div className="mb-3 h-16 bg-red-custom shadow-md flex justify-between items-center">
      //   <Link to="/" className="h-16 p-2 flex flex-col justify-center">
      //     <img src={logo} className="h-12" alt="Logo" />
      //   </Link>

      //   <div className="w-64 flex justify-end items-center">
      //     <div className="h-16 p-2 flex flex-col justify-center">
      //       {/*<Link
      //         to="/users/"
      //         className="text-white text-xl font-semibold text-center no-underline"
      //       >
      //         Users
      //       </Link>*/}
      //     </div>
      //     <div className="h-16 p-2 flex flex-col justify-center" onClick={logout}>
      //       <LogOut color="white" />
      //     </div>
      //   </div>
      // </div>
      <div>
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
          <aside className="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0">
            <div className="py-4 text-gray-500 dark:text-gray-400">
              <a className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200" href="#">
                Standford Medicine
              </a>
              <ul className="mt-6">
                <li className="relative px-6 py-3">
                  <span
                    className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                    aria-hidden="true"
                  >
                    ""
                  </span>
                  <a
                    className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100"
                    href="index.html"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="ml-4">Survey</span>
                  </a>
                </li>
              </ul>
              <ul className="mt-6">
                <li className="relative px-6 py-3">
                  <span
                    className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                    aria-hidden="true"
                  />
                  <a
                    className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                    href="manage_users.html"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    <span className="ml-4">Manage Users</span>
                  </a>
                </li>
              </ul>
              <ul className="mt-6">
                <li className="relative px-6 py-3">
                  <span
                    className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                    aria-hidden="true"
                  />
                  <a
                    className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                    href="settings.html"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                    <span className="ml-4">Setting</span>
                  </a>
                </li>
              </ul>
            </div>
          </aside>
          <div className="flex flex-col flex-1 w-full">
            <header className="z-10 py-4 bg-white shadow-md dark:bg-gray-800">
              <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
                <div className="flex justify-center flex-1 lg:mr-32">
                  <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500" />
                </div>
                <ul className="flex items-center flex-shrink-0 space-x-6">
                  <li />
                </ul>
              </div>
            </header>
          </div>
        </div>
      </div>
    );
  }
}

type HeaderProps = HeaderDispatchProps;

interface HeaderDispatchProps {
  logout: () => void;
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    logout: () => {
      dispatch(logoutUser());
    },
  };
}

export default connect<{}, HeaderDispatchProps, {}, Store>(
  null,
  mapDispatchToProps
)(Header);
