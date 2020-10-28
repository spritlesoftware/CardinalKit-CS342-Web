import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import { loginUser } from '../actions/loginActions';
import { getLoginState, isAuthenticated } from '../selectors/loginSelectors';
import app from 'firebase/app';


import { Button, ButtonColor, ButtonType } from '../ui/Button';
import Firebase from './Firebase';
import logo from '../images/login-office.jpeg';
import logo2 from '../images/cardinal_logo.svg';

// const messages = defineMessages({
//   header: {
//     id: 'LoginPage.header',
//     defaultMessage: 'Login with Google',
//   },
// });

export class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      erroMsg: '',
      userEmail: '',
      userPassword: '',
      loggedIn: false,
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  setVerificationCode = () => {
    var verifyCode = Math.floor(Math.random() * 9999 + 1);
    localStorage.setItem('verify-code', verifyCode);
    this.props.history.push('/verify_code');
    return verifyCode
  }

  sendMail = (email, code) => {
    window.Email.send({
      SecureToken: 'b432cf0c-5911-4601-a8e2-374473f6dbf4',
      To: email,
      From: 'cbkmar92@gmail.com',
      Subject: 'Verfication code',
      Body: 'Your verification code ' + code,
    }).then(message => alert(message))
  };

  signInWithEmailAndPasswordHandler = (event, email, password) => {
    const firebase = new Firebase();
    event.preventDefault();
    console.log(email, password);
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(res => {
        const verifyCode = this.setVerificationCode()
        this.sendMail(email, verifyCode);
        this.setState({
          loggedIn: true
        })
      })
      .then(res => {
        console.log(res, 'verfication');

      })
      .catch(error => {
        this.setState({ erroMsg: 'Error signing in with password and email!' });
        console.error('Error signing in with password and email', error);
      });
  };



  handleSubmit = (event) => {
    console.log('submit');
    this.props.onSubmitForm(event)
    this.setState({
      loggedIn: true
    })
    const verifyCode = this.setVerificationCode()
    this.sendMail(app.auth().currentUser.email, verifyCode)

  };

  render() {
    const { isAuth, location, loading } = this.props;
    console.log(isAuth, 'isAuth');

    if (this.state.loggedIn) {
      return <Redirect to = {{ pathname: '/verify_code' }}/>
    }

    return (
      <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <form onSubmit={() => {
            this.handleSubmit()
           }}>
            <div className="flex flex-col overflow-y-auto md:flex-row">
              <div className="h-32 md:h-auto md:w-1/2">
                <img
                  aria-hidden="true"
                  className="object-cover w-full h-full dark:hidden"
                  src={logo}
                  alt="Office"
                />
                <img
                  aria-hidden="true"
                  className="hidden object-cover w-full h-full dark:block"
                  src={logo2}
                  alt="Office"
                />
              </div>
              <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                <div className="w-full">
                  <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                    Login
                  </h1>
                  <label className="block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Email</span>
                    <input
                      className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      placeholder="Jane Doe"
                      type="email"
                      name="userEmail"
                      value={this.state.userEmail}
                      placeholder="E.g: faruq123@gmail.com"
                      id="userEmail"
                      onChange={event => this.handleChange(event)}
                    />
                  </label>
                  <label className="block mt-4 text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Password</span>
                    <input
                      className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      placeholder="***************"
                      type="password"
                      name="userPassword"
                      value={this.state.userPassword}
                      placeholder="Your Password"
                      id="userPassword"
                      onChange={event => this.handleChange(event)}
                    />
                  </label>

                  <a
                    className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                    href="../index.html"
                    onClick={event => {
                      this.signInWithEmailAndPasswordHandler(
                        event,
                        this.state.userEmail,
                        this.state.userPassword
                      );
                    }}
                  >
                    Log in
                  </a>

                  <hr className="my-8" />
                  <a href="../index.html" />
                  <Button
                    className="flex items-center justify-center w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-white text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray"
                    type={ButtonType.Submit}
                    selected={loading}
                    color={ButtonColor.Blue}
                  >
                    Login with Google
                  </Button>

                  <p className="mt-4">
                    <a
                      className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                      href="./forgot-password.html"
                    >
                      Forgot your password?
                    </a>
                  </p>
                  <p className="mt-1">
                    <a
                      className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                      href="./create-account.html"
                    >
                      Create account
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  isAuth: PropTypes.bool,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  onSubmitForm: PropTypes.func,
  location: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }

      dispatch(loginUser());
    },
  };
}

export function mapStateToProps(state) {
  console.log(state, 'state');
  const { loading, error } = getLoginState(state);
  return {
    isAuth: isAuthenticated(state),
    loading,
    error: error && error !== '',
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
