import * as React from 'react';
import { Link } from 'react-router-dom';
import { defineMessages, FormattedMessage } from 'react-intl';

const messages = defineMessages({
  header: {
    id: 'app.NotFoundPage.header',
    defaultMessage: 'Page Not Found',
  },
});

export default class NotFoundPage extends React.Component {
  render() {
    return (
      <div className="container mx-auto">
        {/* <h1>
            <FormattedMessage {...messages.header} />
          </h1> */}
        <div className="w-100 my-48 text-center">
          <div className="flex mx-40 justify-center">
            <h1 className="text-7xl text-gray-400">Page Not Found!</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-20 w-20 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="mt-4 text-grey-600">
            Go to{' '}
            <Link to="/users" className="text-red-700">
              Dashboard
            </Link>
            ?
          </p>
        </div>
      </div>
    );
  }
}
