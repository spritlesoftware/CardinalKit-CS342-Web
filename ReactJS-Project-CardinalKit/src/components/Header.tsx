import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { LogOut } from 'react-feather';

import { logoutUser } from '../actions/loginActions';
import { Store } from '../reducers/rootReducer';
import Firebase from './Firebase';
import app from 'firebase/app'


interface State {
  currentUser: any
  collapsed: any
}

class Header extends React.Component<HeaderProps, State> {
  constructor(props){
    super(props)
    this.state = {
      collapsed: false,
      currentUser: null
    };
  }


  componentDidMount() {
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          currentUser: user
        })
      }
    });
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  signOut = () => {
    const firebase = new Firebase();
    firebase.doSignOut().then(() => {
      window.location.reload();
      window.localStorage.clear();
    });
  };

  render() {
    return (
      <div className="z-10">
        <header className="z-10 bg-white shadow-sm dark:bg-gray-800">
          <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
            <div className="flex justify-center flex-1 lg:mr-32">
              <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500" />
            </div>
            <ul className="flex items-center flex-shrink-0 space-x-6">
              <span className="text-gray-500">{this.state.currentUser?.email}</span>
              <div className="h-16 p-2 mr-2 flex flex-col justify-center" onClick={this.signOut}>
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
