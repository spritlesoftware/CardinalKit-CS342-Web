import * as React from 'react';
import SurveyGraph from './surveyGraph';

import SurveysTable from './SurveysTable';
import UserDetailHeader from './UserDetailHeader';

interface UserPageProps {
  match: {
    params: {
      userID: string;
    };
  };
}

export default class UserPage extends React.PureComponent<UserPageProps> {



  render() {
    const userID = this.props.match.params.userID;

    return (
      <div className="container mx-auto ">
        {/* <UserDetailHeader userID={userID} /> */}
        <h2 className="px-6 my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
              Survey List
            </h2>
        <SurveysTable userID={userID} />
      </div>
    );
  }
}
