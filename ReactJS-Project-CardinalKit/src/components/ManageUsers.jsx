import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase/app';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
class ManageUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
    };
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  onSubmit = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(cred => {
        console.log(cred, '-=-=-=-=-');
        toast.success('User created succesfully');
        this.props.history.push('/users');
      });
  };

  render() {
    return (
      <div class="container px-6 mx-auto grid">
        <h4 class="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">Create User</h4>
        <div class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <label class="block text-sm">
            <span class="text-gray-700 dark:text-gray-400">First Name</span>
            <input
              class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
              placeholder="Jane Doe"
              name="firstName"
              value={this.state.firstName}
              onChange={e => this.handleChange(e.target.name, e.target.value)}
            />
          </label>
          <br />
          <br />
          <label class="block text-sm">
            <span class="text-gray-700 dark:text-gray-400">Last Name</span>
            <input
              class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
              placeholder="Jane Doe"
              name="lastName"
              value={this.state.lastName}
              onChange={e => this.handleChange(e.target.name, e.target.value)}
            />
          </label>
          <br />
          <br />
          <label class="block text-sm">
            <span class="text-gray-700 dark:text-gray-400">Email</span>
            <input
              class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
              placeholder="Jane Doe"
              name="email"
              value={this.state.email}
              onChange={e => this.handleChange(e.target.name, e.target.value)}
            />
          </label>
          <br />
          <br />
          <label class="block text-sm">
            <span class="text-gray-700 dark:text-gray-400">Password</span>
            <input
              class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
              placeholder=""
              name="password"
              value={this.state.password}
              onChange={e => this.handleChange(e.target.name, e.target.value)}
            />
          </label>
          <br />
          <br />
          <br />
          <button
            onClick={() => this.onSubmit()}
            class="flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
          >
            <span>Create User</span>
          </button>
        </div>
      </div>
    );
  }
}

export default ManageUsers;
