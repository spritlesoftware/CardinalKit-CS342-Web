import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { defineMessages, FormattedMessage } from 'react-intl';

import { loginUser } from '../actions/loginActions';
import { getLoginState, isAuthenticated } from '../selectors/loginSelectors';

import { Button, ButtonColor, ButtonType } from '../ui/Button';

import logo from '../images/login-office.jpeg';
import logo2 from '../images/cardinal_logo.svg';

export default function DashboardPage() {
  return <div>xczvzxcv</div>;
}
