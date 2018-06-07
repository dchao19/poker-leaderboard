import {handleActions} from 'redux-actions';
import * as actionTypes from '../actions/actionTypes'
import IAction from '../IAction';

export interface IModalState {
    visible: boolean;
    loading: boolean;
}

const modalReducer = handleActions<IModalState>({
    [actionTypes.SHOW_MODAL]: (state: IModalState, action: IAction<{}>) => {
        return Object.assign({}, state, {
            visible: true
        })
    },
    [actionTypes.HIDE_MODAL]: (state: IModalState, action: IAction<{}>) => {
        return Object.assign({}, state, {
            visible: false
        })
    },
    [actionTypes.MODAL_LOADING]: (state: IModalState, action: IAction<{}>) => {
        return {
            ...state,
            loading: true
        }
    },
    [actionTypes.MODAL_DONE_LOADING]: (state: IModalState, action: IAction<{}>) => {
        return {
            ...state,
            loading: false
        }
    }
}, {
    loading: false,
    visible: false,
})

export default modalReducer;