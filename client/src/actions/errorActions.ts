import IAction from "../IAction";
import * as actionTypes from "./actionTypes";

export function showError(message: string): IAction<{ message: string }> {
	return {
		payload: {
			message
		},
		type: actionTypes.SHOW_ERROR
	};
}

export function hideError(): IAction<{}> {
	return {
		type: actionTypes.HIDE_ERROR
	};
}
