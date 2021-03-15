import * as React from 'react';
import * as PropTypes from 'prop-types';

import { connect } from 'react-redux';

import app from 'firebase/app';
import { toast } from 'react-toastify';
import { loginUser } from '../actions/loginActions';
import { getLoginState, isAuthenticated } from '../selectors/loginSelectors';

import { Button, ButtonColor } from '../ui/Button';
import Firebase from './Firebase';
import logo from '../images/health_.svg';
import logo2 from '../images/cardinalKitLogo.ico';

toast.configure();

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
    const verifyCode = Math.floor(1000 + Math.random() * 9000);
    localStorage.setItem('verifyCode', verifyCode);
    this.props.history.push('/verify_code');
    return verifyCode;
  };

  sendMail = (email, code) => {
    window.Email.send({
      Host: process.env.REACT_APP_EMAIL_HOST,
      Username: process.env.REACT_APP_EMAIL_USER_NAME,
      Password: process.env.REACT_APP_EMAIL_PASSWORD,
      To: email,
      From: process.env.REACT_APP_EMAIL_USER_NAME,
      Subject: 'Two factor authentication code',
      Body: `Your two factor authentication code ${code}`,
    });
  };

  validateFields = (email, password) => {
    if (!email && !password) {
      toast.error('Please enter your Email and Password!');
    } else if (!email || !password) {
      if (!email) {
        toast.error('Please enter your Email');
      } else if (!password) {
        toast.error('Please enter your Password');
      }
    }
  };

  signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    this.validateFields(email, password);
    const firebase = new Firebase();
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        const verifyCode = this.setVerificationCode();
        this.sendMail(email, verifyCode);
        this.setState({
          loggedIn: true,
        });
      })
      .catch(error => {
        this.setState({ erroMsg: 'Error signing in with password and email!' });
        console.error('Error signing in with password and email', error);
      });
  };

  validateUser = email => email.includes(process.env.REACT_APP_VERIFIED_EMAIL_SUBDOMAIN);

  handleSubmit = () => {
    const firebase = new Firebase();
    firebase.doSignInWithGoogle().then(data => {
      if (this.validateUser(data.user.email)) {
        const verifyCode = this.setVerificationCode();
        this.sendMail(app.auth().currentUser.email, verifyCode);
        this.props.history.push('/verify_code');
      } else {
        const error_msg =`Email sub-domain not allowed, only ${process.env.REACT_APP_VERIFIED_EMAIL_SUBDOMAIN} allowed to login with Google.`;
        toast.error(error_msg);
        this.props.history.push('/login');
      }
    });
  };

  render() {
    const { loading } = this.props;

    return (
      <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white shadow-2xl dark:bg-gray-800">
          <form
            onSubmit={event => {
              this.signInWithEmailAndPasswordHandler(
                event,
                this.state.userEmail,
                this.state.userPassword
              );
            }}
          >
            <div className="flex flex-col overflow-y-auto md:flex-row">
              <div className="h-1/2 md:h-auto md:w-1/2">
                <img
                  aria-hidden="true"
                  className="object-fill h-10 mx-3 stroke-current text-red-400 dark:block"
                  src={logo2}
                  alt="Office"
                />
                <img
                  aria-hidden="true"
                  className="object-cover mb-10 overflow-hidden w-full dark:hidden mx-5"
                  src={logo}
                  alt="Office"
                />
              </div>

              <div className="h-80 mt-14 w-1 mx-5 rounded shadow-2xl bg-gray-200" />

              <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                <div className="w-full">
                  <h1 className="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-200">
                    Login to Survey Admin Panel
                  </h1>
                  <div className="bg-red-500 w-1/5 h-1 mb-2 " />
                  <label className="block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Email</span>
                    <input
                      className="block w-full mt-1 text-sm rounded-none	 dark:border-gray-600 dark:bg-gray-700 focus:border-red-400 focus:outline-red-500 focus:shadow-outline-red dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      type="email"
                      name="userEmail"
                      value={this.state.userEmail}
                      placeholder="E.g: faruq123@gmail.com"
                      id="userEmail"
                      autoFocus
                      onChange={event => this.handleChange(event)}
                    />
                  </label>
                  <label className="block mt-4 text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Password</span>
                    <input
                      className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-red-400 focus:outline-red-500 focus:shadow-outline-red dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      type="password"
                      name="userPassword"
                      value={this.state.userPassword}
                      placeholder="Your Password"
                      id="userPassword"
                      onChange={event => this.handleChange(event)}
                    />
                  </label>

                  <button
                    className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 hover:bg-red-400 border border-transparent active:bg-red-600 bg-red-600 focus:outline-none focus:shadow-outline-purple"
                    type="submit"
                  >
                    Log in
                  </button>

                  <hr className="my-8" />
                  <Button
                    className="flex items-center justify-center w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-white text-gray-700 transition-colors duration-150 border border-gray-300 dark:text-gray-400 active:bg-transparent focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray"
                    onClick={() => {
                      this.handleSubmit();
                    }}
                    selected={loading}
                    color={ButtonColor.Blue}
                  >
                    Login with Google
                  </Button>
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
