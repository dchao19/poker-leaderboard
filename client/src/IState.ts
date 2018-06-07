import { IErrorState } from "./reducers/ErrorReducer";
import { IModalState } from "./reducers/ModalReducer";
import { IPlayersState } from "./reducers/PlayersReducer";

export interface IState {
	modal: IModalState;
	players: IPlayersState;
	error: IErrorState;
}
