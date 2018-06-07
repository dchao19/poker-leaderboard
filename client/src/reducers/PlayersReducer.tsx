import * as actionTypes from '../actions/actionTypes';

import IAction from '../IAction';
import IPlayer from '../IPlayer';

export interface IPlayersState {
    players: IPlayer[];
    deleteLoading: {
        loading: boolean;
        playerId: string;
    };
    fieldSaveLoading: {
        loading: boolean;
        fieldName: string;
        playerId: string;
    }
    playersLoading: boolean;
}

const initialState : IPlayersState = {
    deleteLoading: {
        loading: false,
        playerId: ""
    },
    fieldSaveLoading: {
        fieldName: "",
        loading: false,
        playerId: ""
    },
    players: [],
    playersLoading: true,
}

const playersReducer = (state = initialState, action: IAction) : IPlayersState => {
    switch(action.type) {
        case actionTypes.CLIENT_ADD_NEW_PLAYER: {
            return {
                ...state,
                players: [...state.players, action.payload.newPlayer].sort((a, b) => b.winnings - a.winnings)
            }
        }
        case actionTypes.ROW_LOADING: {
            return {
                ...state,
                deleteLoading: {
                    loading: true,
                    playerId: action.payload.playerId
                }
            }
        }
        case actionTypes.ROW_LOADING_DONE: {
            return {
                ...state,
                deleteLoading: {
                    loading: false,
                    playerId: ""
                }
            }
        }
        case actionTypes.CLIENT_DELETE_PLAYER: {
            return {
                ...state,
                players: state.players.filter((player) => {
                    return player._id !== action.payload.playerId
                })
            }
        }
        case actionTypes.PLAYERS_LOADING: {
            return {
                ...state,
                playersLoading: true
            }
        }
        case actionTypes.PLAYERS_DONE_LOADING: {
            return {
                ...state,
                playersLoading: false
            }
        }
        case actionTypes.UPDATE_PLAYER_LOADING: {
            return {
                ...state,
                fieldSaveLoading: {
                    fieldName: action.payload.fieldName,
                    loading: true,
                    playerId: action.payload.playerId
                }
            }
        }
        case actionTypes.UDPATE_PLAYER_DONE_LOADING: {
            return {
                ...state,
                fieldSaveLoading: {
                    fieldName: "",
                    loading: false,
                    playerId: ""
                }
            }
        }
        default: {
            return state;
        }
    }
}

export default playersReducer;