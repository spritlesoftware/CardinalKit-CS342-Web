import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Link, Redirect } from 'react-router-dom';

import { LogOut } from 'react-feather';

import { logoutUser } from '../actions/loginActions';
import { Store } from '../reducers/rootReducer';

import logo from '../images/cardinal_logo_white.svg';
import Firebase from './Firebase';

class Header extends React.Component<HeaderProps> {
  state = {
    collapsed: false,
    loggedOut: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  signOut = () => {
    const firebase = new Firebase();
    firebase.doSignOut().then(() => {
      this.setState({
        loggedOut: true
      })
      console.log(this.props)
    })
  }

  render() {
    const { logout } = this.props;
    if (this.state.loggedOut) {
      return <Redirect to = {{ pathname: '/login' }}/>
    }
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
      // <div className="h-16 p-2 flex flex-col justify-center" onClick={logout}>
      //   <LogOut color="white" />
      // </div>
      //   </div>
      // </div>
      <div>
        <header className="z-10 py-4 bg-white shadow-md dark:bg-gray-800">
          <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
            <div className="flex justify-center flex-1 lg:mr-32">
              <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500" />
            </div>
            <ul className="flex items-center flex-shrink-0 space-x-6">
              <div className="h-16 p-2 flex flex-col justify-center" onClick={this.signOut}>
                <LogOut color="black" />
              </div>
            </ul>
          </div>
        </header>
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
