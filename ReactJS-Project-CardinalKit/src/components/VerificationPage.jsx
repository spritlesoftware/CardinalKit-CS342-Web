import * as React from 'react';
import logo from '../images/catdinalKitFemale.png';
import logo2 from '../images/cardinal_logo.svg';
import { toast } from 'react-toastify';

class VerificationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userCode: null,
    };
  }

  onSubmitHandler = (e) => {
    e.preventDefault()
    this.setState({
      userCode: document.getElementById('verificationCode'),
    });
    if (this.state.userCode === localStorage.getItem('verifyCode')) {
      window.sessionStorage.setItem('isLoggedIn', true);
      window.localStorage.clear();
      this.props.history.push('/users')
      window.location.reload()
    }  else {
      toast.warning('Incorrect verfication code!')
    }
  };

  render() {

    return (
      <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <div className="flex flex-col overflow-y-auto md:flex-row">

            <div className=" flex flex-row h-32 md:h-auto md:w-1/2">
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

            <div className="h-80 mt-8 w-1 mx-5 shadow-2xl bg-red-200"/>

            <div className="flex flex-row mt-10  overflow-y-auto md:flex-row">
              <div className="px-4 py-3 mt-8 w-3/4 bg-white rounded-lg dark:bg-gray-800">
                <h4 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">Two Factor Authentication</h4>

                <form onSubmit={(e) => this.onSubmitHandler(e)}>
                  <label className="block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Please Enter the Two Factor Authentication code sent to your email.</span>
                  </label>
                    <input
                      className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      placeholder="Enter your verification code"
                      id="verificationCode"
                      onChange={e => this.setState({ userCode: e.target.value })}
                      autoComplete={'off'}
                    />
                  

                  <button
                    className="flex items-center  mt-5 justify-center w-100 px-auto content-center py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-red-500 border border-transparent shadow-2xl active:bg-red-400 hover:bg-red-400 focus:outline-none focus:shadow-outline-purple w-full"
                    type="submit"
                  >
                    <span>Submit</span>
                  </button>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VerificationPage;
