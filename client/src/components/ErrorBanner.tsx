import * as React from "react";
import { Alert, Glyphicon } from "react-bootstrap";
import { connect } from "react-redux";
import * as errorActions from "../actions/errorActions";
import { IState } from "../IState";

interface IStateProps {
	visible: boolean;
	title: string;
	message: string;
}

interface IDispatchProps {
	hideAlert: () => void;
}

const mapStateToProps = (state: IState): IStateProps => {
	return {
		message: state.error.message.text,
		title: state.error.message.title,
		visible: state.error.visible
	};
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
	return {
		hideAlert: () => {
			dispatch(errorActions.hideError());
		}
	};
};

class ErrorBanner extends React.Component<IStateProps & IDispatchProps, {}> {
	constructor(props: IStateProps & IDispatchProps) {
		super(props);

		this.handleCloseClick = this.handleCloseClick.bind(this);
	}

	public render() {
		return this.props.visible ? (
			<Alert
				bsStyle="danger"
				style={{ alignItems: "center", display: "flex", width: "100%" }}
			>
				<div style={{ width: "100%" }}>
					<strong>{this.props.title} </strong>
					{this.props.message}
				</div>
				<Glyphicon
					className="dismissAlertButton"
					onClick={this.handleCloseClick}
					glyph="remove"
				/>
			</Alert>
		) : (
			<div />
		);
	}

	private handleCloseClick() {
		this.props.hideAlert();
	}
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ErrorBanner);
