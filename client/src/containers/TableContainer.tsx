import * as React from 'react';
import { connect } from 'react-redux';

import { getPlayers } from '../actions/playerActions';
import PlayersTable from '../components/PlayersTable';
import IPlayer from '../IPlayer';
import { IState } from '../IState';

interface IStateProps {
    players: IPlayer[];
    loading: boolean;
}

interface IDispatchProps {
    getPlayers: () => void;
}

const mapStateToProps = (state: IState) : IStateProps => {
    return {
        loading: state.players.playersLoading,
        players: state.players.players,
    }
}

const mapDispatchToProps = (dispatch: any) : IDispatchProps => {
    return {
        getPlayers: () => {
            dispatch(getPlayers())
        },
    }
}

class TableContainer extends React.Component<IStateProps & IDispatchProps, {}> {
    public componentDidMount() {
       this.props.getPlayers();
    }
    
    public render() {
        return (
            this.props.loading ? <h1>Loading!</h1> : 
            <PlayersTable players={this.props.players}/>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);