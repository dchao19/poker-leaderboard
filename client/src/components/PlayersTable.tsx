import * as React from 'react';
import {Table} from 'react-bootstrap';
import RowContainer from '../containers/RowContainer';
import IPlayer from '../IPlayer';

export interface IProps {
    players: IPlayer[];
}

const PlayersTable = ({players}: IProps) => {
    return (
        <Table striped={true} bordered={true}>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Of Origin</th>
                    <th>Winnings</th>
                    <th style={{width: "30px"}}/>
                </tr>
            </thead>
            <tbody>
                {players.map((player, i) => {
                    if (typeof player._id !== 'undefined') {
                        return (
                            <RowContainer rank={i + 1} key={player._id} player={player} _id={player._id}/>
                        )
                    } else {
                        return (<div/>);
                    }
                })}
            </tbody>
        </Table>
    )
}

export default PlayersTable;