import { call, put, takeEvery } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";
import * as errorActions from "../actions/errorActions";
import * as modalActions from "../actions/modalActions";
import * as playerActions from "../actions/playerActions";
import * as apiActions from "../api/apiActions";
import IAction from "../IAction";
import IPlayer from "../IPlayer";

function* createPlayer(action: IAction<{ newPlayer: IPlayer }>) {
	if (!action.payload) {
		return;
	}

	yield put(modalActions.setModalLoading());

	try {
		const toAdd = yield call(apiActions.addPlayer, action.payload.newPlayer);
		yield put(playerActions.client_addPlayer(toAdd));
	} catch (e) {
		yield put(errorActions.showError(e));
	}

	yield put(modalActions.hideModal());
	yield put(modalActions.setModalDoneLoading());
}

function* getPlayers(action: IAction<{}>) {
	yield put(playerActions.setPlayersLoading());

	try {
		const newPlayers = yield call(apiActions.getPlayers);
		for (const player of newPlayers) {
			yield put(playerActions.client_addPlayer(player));
		}
	} catch (e) {
		// tslint:disable-next-line:no-console
		console.log(e);
		yield put(errorActions.showError(e.message));
	}

	yield put(playerActions.setPlayersDoneLoading());
}

function* deletePlayer(action: IAction<{ playerId: string }>) {
	if (action.payload) {
		yield put(playerActions.setRowLoading(action.payload.playerId));

		yield call(apiActions.deletePlayer, action.payload.playerId);
		yield put(playerActions.setRowLoadingDone());
		yield put(playerActions.client_deletePlayer(action.payload.playerId));
	}
}

function* updatePlayer(
	action: IAction<{
		id: string;
		updatedFields: {
			fieldName: string;
			value: string | number;
		};
	}>
) {
	if (action.payload) {
		yield put(
			playerActions.setUpdatePlayerLoading(
				action.payload.id,
				action.payload.updatedFields.fieldName
			)
		);
		const newPlayer = yield call(
			apiActions.updatePlayer,
			action.payload.id,
			action.payload.updatedFields
		);

		yield put(playerActions.client_deletePlayer(action.payload.id));
		yield put(playerActions.client_addPlayer(newPlayer));
		yield put(playerActions.setUpdatePlayerDoneLoading());
	}
}

export const playerSagas = [
	takeEvery(actionTypes.ADD_NEW_PLAYER, createPlayer),
	takeEvery(actionTypes.DELETE_PLAYER, deletePlayer),
	takeEvery(actionTypes.GET_PLAYERS, getPlayers),
	takeEvery(actionTypes.UPDATE_PLAYER, updatePlayer)
];
