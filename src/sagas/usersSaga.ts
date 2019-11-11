import { call, put, select, takeLatest } from 'redux-saga/effects';

import { getAllFirebaseUsers, getFirebaseUser } from '../api/getAllUsers';

import { getAuthToken } from '../selectors/loginSelectors';

import {
  FetchUsersAction,
  FetchUserDetailsAction,
  fetchUsersFailure,
  fetchUsersSuccess,
  fetchUserDetailsSuccess,
  fetchUserDetailsFailure
} from '../actions/usersActions';
import { UsersActionType } from '../constants/usersConstants';

import app from 'firebase/app';

export function* fetchUserSummaries(action: FetchUsersAction) {
  try {
    const users = yield call(getAllFirebaseUsers);

    /*users.docs.forEach(function(doc: app.firestore.QueryDocumentSnapshot) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });*/

    const userList = users.docs.map((i: app.firestore.QueryDocumentSnapshot) => i.data());

    yield put(fetchUsersSuccess(userList));
  } catch (err) {
    yield put(fetchUsersFailure(err));
  }
}

export function* fetchUserDetails(action: FetchUserDetailsAction) {

  try {
    const user = yield call(getFirebaseUser, action.userID);

    yield put(fetchUserDetailsSuccess(user.data()));
  } catch (err) {
    yield put(fetchUserDetailsFailure(err));
  }
}

export function* fetchUsers(action: FetchUserDetailsAction | FetchUsersAction) {
  switch (action.type) {
    case UsersActionType.FETCH_USERS:
      yield fetchUserSummaries(action);
      break;
    case UsersActionType.FETCH_USER_DETAILS:
      yield fetchUserDetails(action);
      break;
  }
}

// Individual exports for testing
export default function* userListSaga() {
  yield takeLatest([UsersActionType.FETCH_USERS, UsersActionType.FETCH_USER_DETAILS], fetchUsers);
}
