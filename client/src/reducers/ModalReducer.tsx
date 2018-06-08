import * as actionTypes from "../actions/actionTypes";
import IAction from "../IAction";

export interface IModalState {
	visible: boolean;
	loading: boolean;
}

const initialState: IModalState = {
	loading: false,
	visible: false
};
const modalReducer = (state = initialState, action: IAction): IModalState => {
	switch (action.type) {
		case actionTypes.SHOW_MODAL: {
			return {
				...state,
				visible: true
			};
		}
		case actionTypes.HIDE_MODAL: {
			return {
				...state,
				visible: false
			};
		}
		case actionTypes.MODAL_LOADING: {
			return {
				...state,
				loading: true
			};
		}
		case actionTypes.MODAL_DONE_LOADING: {
			return {
				...state,
				loading: false
			};
		}
		default: {
			return state;
		}
	}
};

export default modalReducer;
