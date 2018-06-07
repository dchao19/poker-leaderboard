import * as React from "react";
import { Button, Glyphicon } from "react-bootstrap";
import { connect } from "react-redux";
import { showModal } from "../actions/modalActions";
import ModalContainer from "../containers/ModalContainer";
import TableContainer from "../containers/TableContainer";
import { IState } from "../IState";
import ErrorBanner from "./ErrorBanner";
import NavBar from "./NavBar";

interface IDispatchProps {
	show: () => void;
}

const mapStateToProps = (state: IState) => {
	return {};
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
	return {
		show: () => {
			dispatch(showModal());
		}
	};
};

const Layout = ({ show }: IDispatchProps) => {
	return (
		<div>
			<ModalContainer />
			<div className="nav-container">
				<NavBar />
			</div>
			<div className="main-container">
				<ErrorBanner />
				<Button onClick={show} className="add-button" bsStyle="primary">
					<Glyphicon glyph="plus" /> Add new player
				</Button>
				<TableContainer />
			</div>
		</div>
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Layout);
