import moment from 'moment';
import React, { Component } from 'react';   
import { Link } from 'react-router-dom';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import { getAllFirebaseUsers, getSurveys, getQuestions } from '../api/getAllUsers';
import Pagination from './Pagination';
import './styles/customStyle.css';

export interface users {
  userId: string;
  endDate: string;
}

class UserList extends Component<{}, { users: any[]; newUsers: any[]; totalSurveys: any[]; totalUsers: number; questions: [] }> {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      newUsers: [],
      totalSurveys: [],
      questions: [],
      totalUsers: 0
    };
  }

  componentDidMount = () => {
    getAllFirebaseUsers()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => {
          return {
            userId: doc.id,
          };
        });
        this.setState({
          users: [...data],
        });
      })
      .then(() => {
        this.getSurveyDetails();
      });
  };


  updateTotalSurvey = (snapshot) => {
    const totalSurveys: any[] = [];
    snapshot.docs.map(survey => {
      totalSurveys.push(survey.id.substring(0, 14));
      this.setState({
        totalSurveys: [
          ...totalSurveys.filter(function(item, index, inputArray) {
            return inputArray.indexOf(item) === index;
          }),
        ],      
      })
    });
  }

  updateNewUsers = (doc) => {
    let newUsers: any[] = [];
    const today = new Date();

    const surveyDate = new Date(doc.payload.endDate.substring(0, 10));

    if (surveyDate === today) {
      newUsers.push(doc.userId);
    }
  }

  recieveQuestions = questionId => {
    getQuestions(questionId).then(doc => {
      if (doc.questions.length !== this.state.questions.length) {
        this.setState({
          questions: doc.questions
        })
      }
    }).then(() => {
      console.log(this.state.questions)
    })
  };

  downloadCsv = (uid) => {
    // console.log(uid)
    getSurveys(uid)
      .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => {
          console.log(doc.data().surveyQuestionId)
          this.recieveQuestions(doc.data().surveyQuestionId)
        })
      })
  }

  getSurveyDetails = () => {
    const { users } = this.state;
    const surveyData: any[] = [];
    users.map(({ userId }) => {

      return getSurveys(userId).then(querySnapshot => {

        surveyData.push(querySnapshot.docs[0].data());
        const data = surveyData.map(doc => {


          this.updateTotalSurvey(querySnapshot);

          this.updateNewUsers(doc)

          return {
            name: 'John Adams',
            email: 'john@example.com',
            userId: doc.userId,
            endDate: moment(doc.payload.endDate.substring(0, 10)).format('LL'),
            view: (
              <div>
                <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                  <Link to={`/users/${doc.userId}`} className="animate-bounce ease-out duration-700">View Surveys</Link>
                </span>
                <button onClick={() => this.downloadCsv(doc.userId)}>
                  <span className="px-2 py-1  font-semibold bg-blue-200 leading-tight rounded-full dark:bg-blue-700 dark:text-blue-100">
                    Response
                    <i className="ml-1 fas fa-cloud-download-alt  text-gray-700	animate-bounce ease-out hover:scale-50" />
                  </span>
                </button>
              </div>
            ),
          };
        });
        this.setState({
          users: [...data],
          totalUsers: data.length
        });
      });
    });
  };

  render() {
    const columns = [
      {
        Header: () => (
          <div className="text-xs text-center shadow-none font-semibold tracking-wide text-gray-500 uppercase dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
            Name
          </div>
        ),
        accessor: 'name',
        className: 'font',
        width: 250,
        Cell: row => <div className="text-center h-4">{row.value}</div>

      },
      {
        Header: () => (
          <div className="text-xs text-center font-semibold tracking-wide text-left text-gray-500 uppercase dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
            Email
          </div>
        ),
        accessor: 'email',
        className: 'font',
        width: 250,
        Cell: row => <div className="text-center h-6">{row.value}</div>
      },
      {
        Header: () => (
          <div className="text-xs text-center font-semibold tracking-wide text-left text-gray-500 uppercase dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
            Submitted Date
          </div>
        ),
        accessor: 'endDate',
        className: 'px-4 py-3 text-sm',
        width: 250,
        Cell: row => <div className="text-center h-4">{row.value}</div>
      },
      {
        Header: () => (
          <div className="text-xs text-center font-semibold tracking-wide text-left text-gray-500 uppercase text-center dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
            actions
          </div>
        ),
        accessor: 'view',
        filterable: false,
        width: 250,
        Cell: row => <div className="text-center h-4">{row.value}</div>
      },
    ];

    return (
      <div className="container px-6 mx-auto grid">
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          <div className="flex items-center p-4 bg-white rounded-lg shadow-lg  transition duration-1000 ease-in dark:bg-gray-800">
            <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
              </svg>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Users
              </p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {this.state.totalUsers}
              </p>
            </div>
          </div>

          <div className="flex items-center p-4 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
              </svg>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">New Users</p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {this.state.newUsers.length}
              </p>
            </div>
          </div>

          <div className="flex items-center p-4 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <div className="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Surveys
              </p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {this.state.totalSurveys.length}
              </p>
            </div>
          </div>
        </div>
        <ReactTable
          data={this.state.users}
          columns={columns}
          className={"ReactTable " + (this.state.totalUsers === 0 ? 'animate-pulse' : '')}
          // filterable={true}
          sortable={true}
          defaultPageSize={5}
          PaginationComponent={Pagination}
        />
        {/* {console.log(this.state.users)} */}

        <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">Charts</h2>
        <div className="grid gap-6 mb-8 md:grid-cols-2">
          <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
            <h4 className="mb-4 font-semibold text-gray-800 dark:text-gray-300">Survey</h4>
            <canvas id="pie"></canvas>
            <div className="flex justify-center mt-4 space-x-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 mr-1 bg-blue-500 rounded-full"></span>
                <span>ShortWalkTask</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 mr-1 bg-teal-600 rounded-full"></span>
                <span>SurveyTask-SF12</span>
              </div>
            </div>
          </div>
          <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
            <h4 className="mb-4 font-semibold text-gray-800 dark:text-gray-300">Traffic</h4>
            <canvas id="line"></canvas>
            <div className="flex justify-center mt-4 space-x-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 mr-1 bg-teal-600 rounded-full"></span>
                <span>User</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserList;
