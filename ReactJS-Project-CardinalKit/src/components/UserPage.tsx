import * as React from 'react';

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
        <div className="w-full mt-4 mb-4 ml-4">
          <h2>Survey List</h2>
        </div>
        <SurveysTable userID={userID} />
      </div>
    );
  }
}
