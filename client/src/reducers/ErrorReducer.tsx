import * as actionTypes from "../actions/actionTypes";
import IAction from "../IAction";

export interface IErrorState {
	visible: boolean;
	message: {
		title: string;
		text: string;
	};
}

const initialState: IErrorState = {
	message: {
		text: "",
		title: ""
	},
	visible: false
};

const ErrorReducer = (state = initialState, action: IAction): IErrorState => {
	switch (action.type) {
		case actionTypes.SHOW_ERROR: {
			return {
				...state,
				message: {
					text: action.payload.message,
					title: "Oh no! An error occurred!"
				},
				visible: true
			};
		}
		case actionTypes.HIDE_ERROR: {
			return {
				...state,
				message: {
					text: "",
					title: ""
				},
				visible: false
			};
		}
		default:
			return state;
	}
};

export default ErrorReducer;
