import { all, put, takeLatest, takeEvery } from 'redux-saga/effects';
import api from '../../apis';
import actions from '../actions';
import { setCookie } from '../../utils/cookie';
import { responseCodes } from '../../enums';

function* loginSaga({ phoneNumber, password }) {
  try {
    const A_WEEK = 7 * 24 * 60 * 60 * 1000;
    const { data } = yield api.auth.login(phoneNumber, password);
    if (!data || !data.status) {
      if (
        data.code === responseCodes.USER_NOT_FOUND ||
        data.code === responseCodes.WRONG_PASSWORD
      ) {
        yield put(actions.auth.loginFailure(data.code));
      } else {
        yield put(actions.auth.loginFailure(responseCodes.SERVER_ERROR));
      }
      return;
    }

    const { accessToken, user } = data.result;
    if (user) {
      yield setCookie('accessToken', accessToken, A_WEEK);
      yield put(actions.auth.loginSuccess(accessToken, user));
    } else {
      yield put(actions.auth.loginFailure('Lỗi access token'));
    }
  } catch (error) {
    yield put(actions.auth.loginFailure('Lỗi không xác định'));
  }
}

function* verifyTokenSaga({ accessToken }) {
  try {
    const { data } = yield api.auth.verify(accessToken);
    if (!data && !data.status) throw new Error();
    const { user } = data.result;
    if (user) {
      yield put(actions.auth.verifyTokenSuccess(accessToken, user));
    } else {
      yield put(actions.auth.verifyTokenFailure());
    }
  } catch (error) {
    yield put(actions.auth.verifyTokenFailure());
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(actions.auth.actionTypes.LOGIN, loginSaga),
    takeEvery(actions.auth.actionTypes.VERIFY_TOKEN, verifyTokenSaga),
  ]);
}
