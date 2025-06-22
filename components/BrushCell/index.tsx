import {type FC} from "react";
import type {DrawCellInfo} from "../../types/MaterialCell.ts";



interface BrushCellProps {
    row: number;
    column: number;
    info: DrawCellInfo;
    color: string
}

export const BrushCell: FC<BrushCellProps> = ({row, column, info, color}) => {

    return <div
        className={`square ${info.status !== 0 && "square-sand"}`}
        style={{backgroundColor: color}}
        data-row={row.toString()}
        data-column={column.toString()}>
        </div>
}
