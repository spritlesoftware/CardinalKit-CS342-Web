import * as React from 'react';
import { toast } from 'react-toastify';
import logo from '../images/catdinalKitFemale.png';
import logo2 from '../images/cardinal_logo.svg';

class VerificationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userCode: null,
    };
  }

  onSubmitHandler = e => {
    e.preventDefault();
    if (this.state.userCode === localStorage.getItem('verifyCode')) {
      this.props.history.push('/users');
      window.localStorage.setItem('isLoggedIn', true);
      window.localStorage.removeItem('verifyCode');
      window.location.reload();
    } else {
      this.state.userCode === ''
        ? toast.warning('Please enter the Verification Code')
        : toast.warning('Incorrect verfication code!');
    }
  };

  render() {
    return (
      <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <div className="flex flex-col overflow-y-auto md:flex-row">
            <div className=" flex flex-row h-32 ml-10 md:h-auto md:w-1/2">
              <img
                aria-hidden="true"
                className="mb-14  mr-8 h-70 dark:hidden"
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

            <div className="h-80 mt-8 w-1 mx-5 rounded shadow-2xl bg-gray-200" />

            <div className="flex flex-row overflow-y-auto md:flex-row">
              <div className="px-4 py-3 mt-8 w-3/4 bg-white dark:bg-gray-800">
                <h4 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
                  Two Factor Authentication
                </h4>

                <form onSubmit={e => this.onSubmitHandler(e)}>
                  <label className="block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">
                      Please Enter the Two Factor Authentication code sent to your email.
                    </span>
                  </label>
                  <input
                    className="w-full mt-2 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-red-400 focus:outline-none focus:shadow-outline-red dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    placeholder="Enter your verification code"
                    id="verificationCode"
                    onChange={e => this.setState({ userCode: e.target.value })}
                    autoComplete="off"
                    autoFocus
                  />

                  <button
                    className="flex items-center  mt-5 justify-center w-100 px-auto content-center py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-red-500 border border-transparent shadow-2xl active:bg-red-400 hover:bg-red-400 focus:outline-none focus:shadow-outline-purple w-full"
                    type="submit"
                  >
                    <span>Submit</span>
                  </button>
                </form>

                <p className="mt-5 text-gray-500 text-center">
                  Note: If you didn't recieve any emails in the Inbox, please check the Spam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VerificationPage;
