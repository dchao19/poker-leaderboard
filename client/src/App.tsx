import * as React from "react";
import "./App.css";

import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

import ErrorReducer from "./reducers/ErrorReducer";
import ModalReducer from "./reducers/ModalReducer";
import PlayersReducer from "./reducers/PlayersReducer";

import RootSaga from "./sagas/RootSaga";

import Layout from "./components/Layout";

/* Redux Configuration */
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers =
	(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	combineReducers({
		error: ErrorReducer,
		modal: ModalReducer,
		players: PlayersReducer
	}),
	composeEnhancers(applyMiddleware(sagaMiddleware, logger))
);

sagaMiddleware.run(RootSaga);

class App extends React.Component {
	public render() {
		return (
			<Provider store={store}>
				<Layout />
			</Provider>
		);
	}
}

export default App;
