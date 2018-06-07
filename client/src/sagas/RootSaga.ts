import { all } from 'redux-saga/effects';
import { playerSagas } from './PlayerSagas';

export default function* RootSaga() {
    yield all([
        ...playerSagas
    ]);
}