import * as React from "react";
import { Button, FormControl } from "react-bootstrap";

interface IProps {
	value: string | number;
	disabled?: boolean;
	disabledText?: string;
	onSave?: (
		fieldName: "name" | "nativeOf" | "winnings",
		value: string | number
	) => void;
	type: "text" | "number";
	name: "name" | "nativeOf" | "winnings";
}

interface IState {
	edit: boolean;
	inputValue: string | number;
}

class EditableCell extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			edit: false,
			inputValue: this.props.value
		};

		this.cellDoubleClick = this.cellDoubleClick.bind(this);
		this.saveButtonClick = this.saveButtonClick.bind(this);
		this.onFieldChange = this.onFieldChange.bind(this);
	}

	private cellDoubleClick(e: any) {
		this.setState(prevState => {
			return {
				edit: !prevState.edit
			};
		});
	}

	private saveButtonClick(e: any) {
		if (typeof this.props.onSave !== "undefined") {
			this.props.onSave(this.props.name, this.state.inputValue);
		}
	}

	private onFieldChange(e: any) {
		const text = e.target.value;
		this.setState({
			inputValue: text
		});
	}

	// tslint:disable-next-line:member-ordering
	public render() {
		const disabled =
			typeof this.props.disabled === "undefined" ? false : this.props.disabled;
		const disabledText =
			typeof this.props.disabled === "undefined"
				? this.props.value
				: this.props.disabledText;

		return (
			<td>
				{this.state.edit ? (
					<div style={{ display: "flex" }}>
						<FormControl
							key={this.props.name}
							style={{ marginRight: "10px" }}
							type={this.props.type}
							defaultValue={this.state.inputValue.toString()}
							onChange={this.onFieldChange}
						/>
						<Button
							disabled={disabled}
							bsStyle="success"
							onClick={this.saveButtonClick}
						>
							{disabled ? disabledText : "Save"}
						</Button>
					</div>
				) : (
					<span onDoubleClick={this.cellDoubleClick}> {this.props.value} </span>
				)}
			</td>
		);
	}
}

export default EditableCell;
