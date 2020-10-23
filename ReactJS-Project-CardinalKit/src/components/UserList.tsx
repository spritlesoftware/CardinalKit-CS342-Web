import firestore from 'firebase/firestore';
import React, { Component } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Firebase from './Firebase';
import { db } from './Firebase/firebase';
import './styles/customStyle.css';
import app from 'firebase/app';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount = () => {
    console.log('lllllll');

    const firebase = new Firebase();
    db.collection('studies')
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        console.log(data); // array of cities objects
      });
    // .get()
    // .then(doc => {
    //   console.log(doc, 'data');
    // });
  };

  render() {
    const data = [
      {
        email: 'jeev.paul.robinson@spritle.com',
        created: 'Oct 22, 2020',
        signedIn: 'Oct 22, 2020',
      },
      {
        email: 'siva.kb+sep26@spritle.com',
        created: 'Sep 26, 2020',
        signedIn: 'Oct 22, 2020',
      },
      {
        email: 'pradeep0199228@gmail.com',
        created: 'Sep 28, 2020',
        signedIn: 'Oct 20, 2020',
      },
      {
        email: 'sivahomeairtel@gmail.com',
        created: 'Sep 21, 2020',
        signedIn: 'Oct 21, 2020',
      },
      {
        email: 'cbkmar92@gmail.com',
        created: 'Sep 12, 2020',
        signedIn: 'Oct 22, 2020',
      },
      {
        email: 'jeev.paul.robinson@gmail.com',
        created: 'Oct 15, 2020',
        signedIn: 'Oct 20, 2020',
      },
    ];

    const columns = [
      {
        Header: 'Email',
        accessor: 'email',
        className: 'emailField',
      },
      {
        Header: 'Created',
        accessor: 'created',
      },
      {
        Header: 'Signed In',
        accessor: 'signedIn',
      },
    ];

    return (
      <div className="container px-6 mx-auto grid">
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
            <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
              </svg>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Users
              </p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">30</p>
            </div>
          </div>

          <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
            <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
              </svg>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">New Users</p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">5</p>
            </div>
          </div>

          <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
            <div className="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Survey
              </p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">35</p>
            </div>
          </div>
        </div>
        {/* <ReactTable data={data} columns={columns} className="usersTable" /> */}
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th className="px-4 py-3">Users</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Actions</th>
                  <th className="px-4 py-3">Submitted at</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                <tr className="text-gray-700 dark:text-gray-400">
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                          alt=""
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        ></div>
                      </div>
                      <div>
                        <p className="font-semibold">Hans Burger</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">hans@gmail.com</td>
                  <td className="px-4 py-3 text-xs">
                    <a href="survey_response.html">
                      <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                        View Response
                      </span>
                    </a>
                  </td>
                  <td className="px-4 py-3 text-sm">6/10/2020</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default UserList;
