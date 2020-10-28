import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import app from 'firebase/app';
// import * as admin from 'firebase-admin';

class VerificationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userCode: null,

    };
  }

  onSubmitHandler = () => {
    if (this.state.userCode == localStorage.getItem('verify-code')) {
      const currentUser = app.auth().currentUser;
      this.props.history.push('/users');
      // admin
      //   .auth()
      //   .updateUser(currentUser.uid, { emailVerified: true })
      //   .then(function(userRecord) {
      //     console.log('update success', userRecord.toJSON());
      //   })
      //   .catch(function(err) {
      //     console.log('Error updating user', err);
      //   });
    }
  };

  render() {
    return (
      <div className="container px-6 mx-auto grid">
        <h4 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">Verfy Code</h4>
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <label className="block text-sm">
            <span className="text-gray-700 dark:text-gray-400">Verification code</span>
            <input
              className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
              placeholder="Enter your verification code"
              type="number"
              value={this.state.userCode}

              onChange={e => this.setState({ userCode: e.target.value })}
            />
          </label>

          <button
            style={{ marginTop: 10 }}
            className="flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            onClick={() => this.onSubmitHandler()}
          >
            <span>Submit</span>
          </button>
        </div>
      </div>
    );
  }
}

export default VerificationPage;
