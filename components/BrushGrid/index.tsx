import {type FC, useState, type MouseEvent} from "react";
import {Cell} from "../Cell";
import type {MaterialCell} from "../../types/MaterialCell.ts";
import {useControlsContext} from "../../hooks/useControlsContext.ts";
import {useBrushContext} from "../../hooks/useBrushContext.ts";


export const BrushGrid: FC = () => {
    const brushContext = useBrushContext();
    const controlsContext = useControlsContext();
    const [tick, setTick] = useState(0);


    const handleMouseOver = (e: MouseEvent) => {
        if (!controlsContext.isMouseDown ||  !(e.target instanceof HTMLDivElement)) return;

        if (!e.target.classList.contains("square")) return;

        const sandSquare = e.target;

        const mapCol = parseInt(sandSquare.dataset.column || "");
        const mapRow = parseInt(sandSquare.dataset.row || "");

        changeBrushMapCell(mapRow, mapCol, brushContext.selectedColorIndex);
        setTick(tick+1);
    };

    const handleMouseClick = (e: MouseEvent) => {
        if ( !(e.target instanceof HTMLDivElement)) return;
        if (!e.target.classList.contains("square")) return;

        const sandSquare = e.target;

        const mapCol = parseInt(sandSquare.dataset.column || "");
        const mapRow = parseInt(sandSquare.dataset.row || "");

        changeBrushMapCell(mapRow, mapCol, brushContext.selectedColorIndex);
        setTick(tick+1);
    };

    const changeBrushMapCell = (row: number, column: number, colorIndex: number) => {

        const currentCell: MaterialCell = brushContext.brushMap.current[row][column];
        currentCell.info = colorIndex === 0 ? {status: 0, colorIndex: 0} : {status: 1, colorIndex: colorIndex};

    }


    return <div className="brush-container"  onMouseOver={handleMouseOver} onClick={handleMouseClick}>
        {brushContext.brushMap.current.map((row, i) =>
            row.map((cell, j) => (
                <Cell key={`${i}-${j}`}  row={i} column={j} info={cell.info} />
            ))
        )}
    </div>
}