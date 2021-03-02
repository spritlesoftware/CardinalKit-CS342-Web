import * as React from 'react';
import firebase from 'firebase/app';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
class ManageUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
  }

  checkForNumericInName = (fieldName, value) => {
    const letters = /^[a-zA-Z,.()+\s-]*$/; // regex to allow only alphabets and Empty spaces
    return value.match(letters) || fieldName === 'email' || fieldName === 'password';
  };

  validatePassword = passwordValue => {
    // const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}|(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}|(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}|(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[a-z]).{8,}|(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/;
    console.log('this is a function to validate password');
  };

  handleChange = (name, value) => {
    if (name === 'password') {
      this.validatePassword(value);
    }

    this.checkForNumericInName(name, value)
      ? this.setState({ [name]: value })
      : toast.warning('Only alphabets are allowed in First Name and Last Name.');
  };

  showHidePasswordToggle = () => {
    const passwordField = document.getElementById('password');
    passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
  };

  onSubmit = () => {
    const { firstName, lastName, email, password } = this.state;
    if (firstName && lastName && email && password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(cred => {
          toast.success('User created succesfully');
          this.props.history.push('/users');
        });
    } else {
      toast.warn('Empty field(s) found.');
    }
  };

  validate;

  render() {
    const { firstName, lastName, email, password } = this.state;

    return (
      <div className=" container px-6 mx-auto grid">
        <div className="px-4 py-3 my-8 bg-white shadow-md dark:bg-gray-800">
          <h2 className="mb-4 mt-4  text-lg font-semibold text-gray-600 dark:text-gray-300">
            Manage Users
          </h2>
          <label className="block text-sm">
            <span className="text-gray-700 dark:text-gray-400">First Name: </span>
            <input
              className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-red-400 focus:outline-none focus:shadow-outline-red dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
              placeholder="Jane"
              name="firstName"
              value={firstName}
              autoFocus
              required
              autoComplete="off"
              onChange={e => this.handleChange(e.target.name, e.target.value)}
            />
          </label>
          <br />
          <br />
          <label className="block text-sm">
            <span className="text-gray-700 dark:text-gray-400">Last Name: </span>
            <input
              className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-red-400 focus:outline-none focus:shadow-outline-red dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
              placeholder="Doe"
              name="lastName"
              value={lastName}
              autoComplete="off"
              onChange={e => this.handleChange(e.target.name, e.target.value)}
            />
          </label>
          <br />
          <br />
          <label className="block text-sm">
            <span className="text-gray-700 dark:text-gray-400">Email address: </span>
            <input
              className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-red-400 focus:outline-none focus:shadow-outline-red dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
              placeholder="JaneDoe@gmail.com"
              name="email"
              value={email}
              onChange={e => this.handleChange(e.target.name, e.target.value)}
            />
          </label>
          <br />
          <br />
          <label className="block text-sm">
            <div className="flex content-center w-1/4 justify-left">
              <span className="text-gray-700 dark:text-gray-400">Password: </span>
              {password && (
                <div className="mx-2">
                  <input
                    type="checkbox"
                    name="showPassword"
                    className="mx-1"
                    onChange={() => this.showHidePasswordToggle()}
                  />
                  <label className="text-gray-500">Show Password</label>
              </div>)}
            </div>
            <input
              className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-red-400 focus:outline-none focus:shadow-outline-red dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
              placeholder="********"
              name="password"
              type="password"
              id="password"
              value={password}
              onChange={e => this.handleChange(e.target.name, e.target.value)}
            />
          </label>
          <br />
          <br />
          <br />
          <button
            onClick={() => this.onSubmit()}
            type="submit"
            className="flex items-center justify-between inset-y-0 right-0 px-4 py-2 mb-6 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-red-600 border border-transparent shadow-2xl active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
          >
            <span>Create User</span>
            <i className="fas fa-heart mx-2 animate-bounce" />
          </button>
        </div>
      </div>
    );
  }
}

export default ManageUsers;
