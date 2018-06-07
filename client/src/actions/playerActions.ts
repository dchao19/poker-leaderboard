import IAction from "../IAction";
import IPlayer from "../IPlayer";
import * as actionTypes from './actionTypes';

export function client_addPlayer(newPlayer: IPlayer) : IAction<{newPlayer: IPlayer}> {
    return {
        payload: {
            newPlayer
        },
        type: actionTypes.CLIENT_ADD_NEW_PLAYER,
    }
}

export function addPlayer(newPlayer: IPlayer): IAction<{newPlayer: IPlayer}> {
    return {
        payload: {
            newPlayer
        },
        type: actionTypes.ADD_NEW_PLAYER
    }
}

export function deletePlayer(playerId: string) : IAction<{playerId: string}> {
    return {
        payload: {
            playerId
        },
        type: actionTypes.DELETE_PLAYER
    }
}

export function setRowLoading(playerId: string): IAction<{playerId: string}> {
    return {
        payload: {
            playerId
        },
        type: actionTypes.ROW_LOADING
    }
}

export function setRowLoadingDone(): IAction<{}> {
    return {
        type: actionTypes.ROW_LOADING_DONE
    }
}

export function client_deletePlayer(playerId: string): IAction<{playerId: string}> {
    return {
        payload: {
            playerId
        },
        type: actionTypes.CLIENT_DELETE_PLAYER
    }
}

export function setPlayersLoading() : IAction<{}> {
    return {
        type: actionTypes.PLAYERS_LOADING
    }
}

export function setPlayersDoneLoading(): IAction<{}> {
    return {
        type: actionTypes.PLAYERS_DONE_LOADING
    }
}

export function getPlayers() {
    return {
        type: actionTypes.GET_PLAYERS
    }
}

export function setUpdatePlayerLoading(playerId: string, fieldName: string): IAction<{playerId: string, fieldName: string}> {
    return {
        payload: {
            fieldName,
            playerId
        },
        type: actionTypes.UPDATE_PLAYER_LOADING
    }
}

export function setUpdatePlayerDoneLoading(): IAction<{}> {
    return {
        type: actionTypes.UDPATE_PLAYER_DONE_LOADING
    }
}

export function updatePlayer(id: string, fieldName: string, value: string | number): IAction<{
    id: string
    updatedFields: {
        fieldName: string;
        value: string | number;
    }
}> {
    return {
        payload: {
            id,
            updatedFields: {
                fieldName, 
                value
            }
        },
        type: actionTypes.UPDATE_PLAYER
    }
}