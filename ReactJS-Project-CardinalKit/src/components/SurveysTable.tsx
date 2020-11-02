import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { selectUserDetails } from '../selectors/usersSelectors';

import { Survey } from '../api/survey';
import { UserDetails } from '../api/user';
import { db } from './Firebase/firebase';


import { Store } from '../reducers/rootReducer';

import { defineMessages, FormattedDate, FormattedMessage } from 'react-intl';
import { TextInfoBubble } from './TextInfoBubble';
import { Card } from '../ui/Card';
import {
  CardTable,
  CardTableCol,
  CardTableHeader,
  CardTableRow,
  CardTableTitle,
} from '../ui/CardTable';
import { getSurveys } from '../api/getAllUsers';
import Firebase from './Firebase';
import { start } from 'repl';
import ReactTable from 'react-table-6';

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
      surveyList: []
    }
  }


  componentDidMount() {
    const { userID } = this.props;
    const { surveyIds, surveyList } = this.state;
    const tempSurveyList : any[] = [];
    getSurveys(userID).then((querySnapshot) => {
      const data = querySnapshot.docs.map(doc => doc.id);
      this.setState({
          surveyIds: [...data]
      })
      console.log(surveyIds)
      data.map((surveyId) => {
        db.collection('studies')
          .doc('com.siva.cardinalkit-example')
          .collection('users')
          .doc(userID)
          .collection('surveys')
          .doc(surveyId)
          .get()
          .then((doc) => {
            const data = doc.data()
            const endDate = data?.payload?.endDate
            const startDate = data?.payload?.startDate
            const userID = data?.userId
            const identifier = data?.payload?.identifier
            const surveyData = {
              startDate,
              identifier,
              viewResponse: <a href="#">View Response</a>
            }
            tempSurveyList.push(surveyData)
            this.setState({
              surveyList: [...tempSurveyList]
            })
            console.log(this.state.surveyList)
          })
      })
    })
  }

  render() {
    const { userID } = this.props;
    console.log(this.props)

    if (!userID ) {
      return (
        <Card>
          <p className="p-5">{userID}</p>
        </Card>
      );
    }

    const columns = [
      {
        Header: 'SURVEY',
        accessor: 'identifier',
      },
      {
        Header: 'CREATED AT',
        accessor: 'startDate',
      },
      {
        Header: "action",
        accessor: "veriResponse"
      }
    ];


    return (
      <div className="container px-6 mx-auto ">
        <div className="grid gap-6 mb-8 w-full mt-40 ">
          <ReactTable
              data={this.state.surveyList}
              columns={columns}
              className="surveyTable"
            />
        </div>
      </div>
      // <CardTable>
      //   <CardTableTitle>
      //     <FormattedMessage {...messages.surveyTableHeader} />
      //   </CardTableTitle>
      //   <CardTableHeader>
      //     <CardTableCol widthPercent={25}>
      //       <FormattedMessage {...messages.nameHeader} />
      //     </CardTableCol>
      //     <CardTableCol widthPercent={25}>
      //       <FormattedMessage {...messages.dateHeader} />
      //     </CardTableCol>
      //     <CardTableCol widthPercent={25}>
      //       <FormattedMessage {...messages.surveyIdHeader} />
      //     </CardTableCol>
      //   </CardTableHeader>
      //   {this.state.surveyList.map((survey: Survey, i: number) => (
      //     <CardTableRow key={`survey-${survey.taskRunUUID}`} isLast={this.state.surveyList.length - 1 === i}>
      //       <CardTableCol widthPercent={25}>
      //         <TextInfoBubble label={survey.identifier} />
      //       </CardTableCol>
      //       <CardTableCol widthPercent={25}>
      //         <FormattedDate
      //           value={survey.startDate}
      //           year="numeric"
      //           month="numeric"
      //           day="2-digit"
      //         />
      //       </CardTableCol>
      //       <CardTableCol className="font-mono text-sm" widthPercent={25}>
      //         {survey.taskRunUUID}
      //       </CardTableCol>
      //     </CardTableRow>
      //   ))}
      // </CardTable>
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
