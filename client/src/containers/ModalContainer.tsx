import * as React from 'react';
import { Button, ControlLabel, FormControl, FormGroup, Modal, } from 'react-bootstrap';
import { connect } from 'react-redux';
import { hideModal } from '../actions/modalActions';
import { addPlayer } from '../actions/playerActions';
import IPlayer from '../IPlayer';
import { IState } from '../IState';

interface IStateProps {
    visible: boolean;
    loading: boolean;
}

interface IDispatchProps {
    addOrModifyPlayer: (playerData: IPlayer) => void;
    hideModal: () => void;
}

const mapStateToProps = (state: IState) : IStateProps => {
    return {
        loading: state.modal.loading,
        visible: state.modal.visible,
    }
}

const mapDispatchToProps = (dispatch: any) : IDispatchProps => {
    return {
        addOrModifyPlayer: (playerData: IPlayer) => {
            dispatch(addPlayer(playerData));
        },
        hideModal: () => {
            dispatch(hideModal())
        },
    }
}

class ModalContainer extends React.Component<IStateProps & IDispatchProps, {newPlayer: IPlayer}> {
    constructor(props: (IStateProps & IDispatchProps)) {
        super(props);

        this.state = {
            newPlayer: {
                name: "",
                nativeOf: "",
                winnings: 0,
            }
        }

        this.handleHide = this.handleHide.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleNativeOfChange = this.handleNativeOfChange.bind(this);
        this.handleWinningsChange = this.handleWinningsChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    public render() {
        return (
            <Modal show={this.props.visible} onHide={this.handleHide}>
                <Modal.Header>
                    <Modal.Title>Player Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form >
                        <FormGroup controlId="name">
                            <ControlLabel>Name</ControlLabel>
                            <FormControl onChange={this.handleNameChange}  name="name" type="text" label="Name" placeholder="Name"/>
                        </FormGroup> 
                        <FormGroup controlId="nativeOf">
                            <ControlLabel>Native Of</ControlLabel>
                            <FormControl onChange={this.handleNativeOfChange} name="nativeOf" type="text" label="Native Of" placeholder="Native Of"/>
                        </FormGroup> 
                        <FormGroup controlId="winnings">
                            <ControlLabel>Winnings</ControlLabel>
                            <FormControl onChange={this.handleWinningsChange} name="winnings" type="number" label="Winnings" placeholder="Winnings"/>
                        </FormGroup> 
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button disabled={this.props.loading} bsStyle="primary" onClick={this.handleSave}>
                        { this.props.loading ? "Saving..." : "Save" } 
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    private handleHide() {
        this.props.hideModal();
    }

    private handleSave(){
        this.props.addOrModifyPlayer(this.state.newPlayer);
    }

    private handleNameChange(e: any){
        const name = e.target.value
        this.setState((prevState) => {
            return {
                newPlayer: {
                    ...prevState.newPlayer,
                    name
                }
            }
        });
    }

    private handleNativeOfChange(e: any){
        const nativeOf = e.target.value
        this.setState((prevState) => {
            return {
                newPlayer: {
                    ...prevState.newPlayer,
                    nativeOf
                }
            }
        });
    }
    private handleWinningsChange(e: any){
        const winnings = e.target.value;
        this.setState((prevState) => {
            return {
                newPlayer: {
                    ...prevState.newPlayer,
                    winnings
                }
            }
        });
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);