import { all, put, takeLatest, takeEvery } from 'redux-saga/effects';
import api from '../../apis';
import actions from '../actions';
import { setCookie } from '../../utils/cookie';
import { responseCodes } from '../../enums';

function* loginSaga({ phoneNumber, password }) {
  let accessToken;
  try {
    const { data } = yield api.auth.login(phoneNumber, password);

    if (!data.status) {
      if (
        data.code === responseCodes.USER_NOT_EXISTS ||
        data.code === responseCodes.PASSWORD_NOT_MATCH
      ) {
        yield put(actions.auth.loginFailure(data.code));
      } else {
        yield put(actions.auth.loginFailure(responseCodes.SERVER_ERROR));
      }
      return;
    }
    ({ accessToken, user } = data.result);
    yield setCookie('accessToken', accessToken, 1 * 24 * 60 * 60 * 1000);
    yield put(
      actions.auth.loginSuccess(accessToken, responseCodes.SUCCESS, user),
    );
  } catch (error) {
    yield put(actions.auth.loginFailure('Lỗi không xác định'));
  }
}

function* verifyTokenSaga({ accessToken }) {
  try {
    const { data } = yield api.auth.verify(accessToken);
    if (!data && !data.status) throw new Error();
    const { user } = data.result;
    const role = null;
    if (user) {
      yield put(actions.auth.verifyTokenSuccess(accessToken, role, user));
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
