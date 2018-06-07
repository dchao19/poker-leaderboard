import IAction from '../IAction';
import * as actionTypes from './actionTypes';

export function showModal(): IAction<{}> {
    return {
        type: actionTypes.SHOW_MODAL
    }
}

export function hideModal(): IAction<{}> {
    return {
        type: actionTypes.HIDE_MODAL
    }
}

export function setModalLoading(): IAction<{}> {
    return {
        type: actionTypes.MODAL_LOADING
    }
}

export function setModalDoneLoading(): IAction<{}> {
    return {
        type: actionTypes.MODAL_DONE_LOADING
    }
}