import moment from 'moment';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import Pagination from './Pagination'




import { selectUserDetails } from '../selectors/usersSelectors';

import { UserDetails } from '../api/user';


import { Store } from '../reducers/rootReducer';

import { defineMessages } from 'react-intl';
import ReactTable from 'react-table-6';
import { getQuestions, getSurvey, getSurveys } from '../api/getAllUsers';
import { Card } from '../ui/Card';

const messages = defineMessages({
  surveyTableHeader: {
    id: 'app.SurveysTable.surveyTableHeader',
    defaultMessage: 'Completed Surveys',
  },
  nameHeader: {
    id: 'app.SurveysTable.dateHeader',
    defaultMessage: 'Survey',
  },
  dateHeader: {
    id: 'app.SurveysTable.dateHeader',
    defaultMessage: 'Date',
  },
  surveyIdHeader: {
    id: 'app.SurveysTable.surveyIdHeader',
    defaultMessage: 'Survey ID',
  },
});

interface SurveyList {
  userID: string,
  identifier: string,
  startDate: string,
  endDate: string,
}

interface State {
  surveyList: SurveyList[]
  surveyIds: string[]
}

class SurveysTable extends React.Component<SurveyHeaderProps, State> {
  constructor(props) {
    super(props)
    this.state = {
      surveyIds: [],
      surveyList: [],

    }
  }


  componentDidMount() {
    const { userID } = this.props;
    const tempSurveyList: any[] = [];


    getSurveys(userID).then((querySnapshot) => {
      const ids = querySnapshot.docs.map(doc => doc.id);
      this.setState({
        surveyIds: [...ids]
      })
      ids.map((surveyId) => {
        return getSurvey(userID, surveyId)
          .then((data) => {
            if (data.payload) {
              const startDate = moment(data?.payload?.startDate.substring(0, 10)).format('ll')
              const identifier = data?.payload?.name || data?.payload?.identifier
              const surveyData = {
                startDate,
                identifier,
                view:
                  <div>
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 shadow-lg dark:bg-green-700 dark:text-green-100">
                      <Link to={`${window.location.pathname}/${surveyId}`}>View Response</Link>
                    </span>
                  </div>
              }
              tempSurveyList.push(surveyData)
              this.setState({
                surveyList: [...tempSurveyList]
              })
            }
          })
      })
    })
  }

  // recieveQuestions = async (qid) => {
  //   let questionName = await getQuestions(qid)
  //                           .then((question) => {
  //                             return question.name
  //                           })

  //   console.log(questionName)
  //   return questionName
  // }

  render() {
    const { userID } = this.props;

    if (!userID) {
      return (
        <Card>
          <p className="p-5">{userID}</p>
        </Card>
      );
    }

    const columns = [
      {
        Header: () => (
          <div className="text-xs font-semibold text-center tracking-wide text-left text-gray-500 uppercase dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">Name</div>
        ),
        accessor: 'identifier',
        className: 'font',
        width: 350,
        Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
      },
      {
        Header: () => (
          <div className="text-xs font-semibold text-center tracking-wide text-left text-gray-500 uppercase dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">Submitted Date</div>
        ),
        accessor: 'startDate',
        className: "px-4 py-3 text-sm",
        width: 300,
        Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
      },
      {
        Header: () => (
          <div className="text-xs font-semibold text-center tracking-wide text-left text-gray-500 uppercase dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">action</div>
        ),
        accessor: 'view',
        filterable: false,
        width: 350,
        Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
      }
    ];
    return (
      <div className="container px-6 mx-auto " >
        <div className="grid mb-8 w-full">
          <ReactTable
            data={this.state.surveyList}
            columns={columns}
            defaultPageSize={5}
            PaginationComponent={Pagination}
            className={"ReactTable " + (this.state.surveyList === [] ? 'animate-pulse' : '')}
          // filterable={true}
          />
        </div>
      </div>
    );
  }
}

type SurveyHeaderProps = SurveysStoreProps &
  SurveysTableProps;

interface SurveysStoreProps {
  userDetails: UserDetails | undefined;
}

interface SurveysTableProps {
  userID: string;
}

function mapStateToProps(
  state: Store,
  props: SurveysTableProps
): SurveysStoreProps {
  return {
    userDetails: selectUserDetails(state, props),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {};
}

export default connect<
  SurveysStoreProps,
  {},
  SurveysTableProps,
  Store
>(
  mapStateToProps,
  mapDispatchToProps
)(SurveysTable);
