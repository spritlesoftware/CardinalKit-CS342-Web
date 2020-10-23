import React, { Component } from 'react';
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import "./styles/customStyle.css";

class UserList extends Component {
  render() {
    const data =  [{
                    email: 'jeev.paul.robinson@spritle.com',
                    created: 'Oct 22, 2020',
                    signedIn: 'Oct 22, 2020'
                  },
                  {
                    email: 'siva.kb+sep26@spritle.com',
                    created: 'Sep 26, 2020',
                    signedIn: 'Oct 22, 2020'
                  },
                  {
                    email: 'pradeep0199228@gmail.com',
                    created: 'Sep 28, 2020',
                    signedIn: 'Oct 20, 2020'
                  },
                  {
                    email: 'sivahomeairtel@gmail.com',
                    created: 'Sep 21, 2020',
                    signedIn: 'Oct 21, 2020'
                  },
                  {
                    email: 'cbkmar92@gmail.com',
                    created: 'Sep 12, 2020',
                    signedIn: 'Oct 22, 2020'
                  },
                  {
                    email: 'jeev.paul.robinson@gmail.com',
                    created: 'Oct 15, 2020',
                    signedIn: 'Oct 20, 2020'
                  }]

      const columns = [ {
                          Header: 'Email',
                          accessor: 'email',
                          className: "emailField"
                        }, {
                          Header: 'Created',
                          accessor: 'created'
                        }, {
                          Header: 'Signed In',
                          accessor: 'signedIn'
                        }]

      return (
        <ReactTable
          data={data}
          columns={columns}
          className="usersTable"
        />
      )
  }
}

export default UserList;