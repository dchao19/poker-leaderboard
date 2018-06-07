import * as React from 'react';
import { Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';
import EditableCell from './EditableCell';

export interface IProps {
    rank: number;
    name: string;
    nativeOf: string;
    winnings: number;
    deleteLoading: boolean;
    fieldLoading: boolean;
    fieldLoadingName: string;
    deleteClick: () => void;
    onFieldSave: (fieldName: string, newData: string) => void;
}

const TableItem = ({
    rank,
    name,
    nativeOf,
    winnings,
    deleteClick,
    deleteLoading,
    fieldLoading,
    fieldLoadingName,
    onFieldSave
}: IProps) => {
    const modifyTooltip = (
        <Tooltip id="tooltip">Delete {name}</Tooltip>
    );

    return (
        <tr>
            <td>{rank}</td>
            <EditableCell disabledText="Saving..." disabled={fieldLoading && fieldLoadingName === "name"} value={name} name="name" type="text" onSave={onFieldSave}/>
            <EditableCell disabledText="Saving..." disabled={fieldLoading && fieldLoadingName === "nativeOf"} value={nativeOf} name="nativeOf" type="text" onSave={onFieldSave}/>
            <EditableCell disabledText="Saving..." disabled={fieldLoading && fieldLoadingName === "winnings"} value={winnings} name="winnings" type="number" onSave={onFieldSave}/>
            <td>
                <OverlayTrigger placement="bottom" overlay={modifyTooltip}>
                    <Glyphicon style={{opacity: deleteLoading ? 0.5 : 1.0}} onClick={deleteClick} glyph="trash"/>
                </OverlayTrigger>
            </td>
        </tr>
    );
}

export default TableItem;