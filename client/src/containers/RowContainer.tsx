import * as React from 'react';
import { connect } from 'react-redux';

import { deletePlayer, updatePlayer } from '../actions/playerActions';
import TableItem from '../components/TableItem';
import IPlayer from '../IPlayer';
import { IState } from '../IState';

interface IOtherProps {
    _id: string;
    rank: number;
    player: IPlayer;
}

interface IStateProps {
    deleteLoading: {
        loading: boolean;
        playerId: string;
    };
    fieldLoading: {
        loading: boolean;
        playerId: string;
        fieldName: string;
    }
}

interface IDispatchProps {
    deleteRow: (id: string) => void;
    updateField: (id: string, fieldName: string, value: string | number) => void;
}

const mapStateToProps = (state: IState) : IStateProps => {
    return {
        deleteLoading: state.players.deleteLoading   ,
        fieldLoading: state.players.fieldSaveLoading
    }
}

type Props = IOtherProps & IStateProps & IDispatchProps

const mapDispatchToProps = (dispatch: any)  : IDispatchProps => {
    return {
        deleteRow: (id: string) => {
            dispatch(deletePlayer(id));
        },
        updateField: (id: string, fieldName: string, value: string | number) => {
            dispatch(updatePlayer(id, fieldName, value));
        }
    }
}

class RowContainer extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);

        this.deleteClick = this.deleteClick.bind(this);
        this.onFieldSave = this.onFieldSave.bind(this);
    }

    public render() {
        return (
            <TableItem 
                rank={this.props.rank}
                deleteClick={this.deleteClick}
                fieldLoading={this.props.fieldLoading.loading}
                fieldLoadingName={this.props.fieldLoading.fieldName}
                deleteLoading={this.props.deleteLoading.loading && this.props.deleteLoading.playerId === this.props._id}
                onFieldSave={this.onFieldSave}
                {...this.props.player}/>            
        )
    }

    private deleteClick() {
        this.props.deleteRow(this.props._id);
    }

    // tslint:disable-next-line:no-empty
    private onFieldSave(fieldName: "name" | "nativeOf" | "winnings", value: string | number) {
        this.props.updateField(this.props._id, fieldName, value);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RowContainer)