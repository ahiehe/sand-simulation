import {type FC} from "react";
import type {DrawCellInfo} from "../SandSimulationProvider/context.ts";


interface CellProps {
    row: number;
    column: number;
    info: DrawCellInfo;
}

export const Cell: FC<CellProps> = ({row, column, info}) => {

    return <div
        className={`square ${info.status === 1 && "square-sand square-color-" + info.colorIndex.toString()}`}
        data-row={row.toString()}
        data-column={column.toString()}>
        </div>
}
