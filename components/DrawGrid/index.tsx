import {type FC, useEffect, useRef, useState} from "react";
import {type DrawCell} from "../SandSimulationProvider/context.ts";
import {useDrawContext} from "../../hooks/useDrawContext.ts";
import {Cell} from "../Cell";


export const DrawGrid: FC = () => {

    const drawContext = useDrawContext();
    const containerRef = useRef<HTMLDivElement>(null)
    const [tick, setTick] = useState(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;


        const changeDrawMapCell = (row: number, column: number, colorIndex: number) => {

            const currentCell: DrawCell = drawContext.drawMap.current[row][column];
            currentCell.info = colorIndex === 0 ? {status: 0, colorIndex: 0} : {status: 1, colorIndex: colorIndex};

        }

        const handleMouseOver = (e: MouseEvent) => {
            if (!drawContext.isMouseDown ||  !(e.target instanceof HTMLDivElement)) return;

            if (!e.target.classList.contains("square")) return;

            const sandSquare = e.target;

            const mapCol = parseInt(sandSquare.dataset.column || "");
            const mapRow = parseInt(sandSquare.dataset.row || "");

            changeDrawMapCell(mapRow, mapCol, drawContext.selectedColorIndex);
            setTick(tick+1);
        };

        const handleMouseClick = (e: MouseEvent) => {
            if ( !(e.target instanceof HTMLDivElement)) return;
            if (!e.target.classList.contains("square")) return;

            const sandSquare = e.target;

            const mapCol = parseInt(sandSquare.dataset.column || "");
            const mapRow = parseInt(sandSquare.dataset.row || "");

            changeDrawMapCell(mapRow, mapCol, drawContext.selectedColorIndex);
            setTick(tick+1);
        };

        container.addEventListener("mouseover", handleMouseOver);
        container.addEventListener("click", handleMouseClick);

        return () =>{
            container.removeEventListener("mouseover", handleMouseOver)
            container.removeEventListener("click", handleMouseClick);
        }

    }, [drawContext, setTick, tick])

    return <div className="draw-container" ref={containerRef}>
        {drawContext.drawMap.current.map((row, i) =>
            row.map((cell, j) => (
                <Cell key={`${i}-${j}`}  row={i} column={j} info={cell.info} />
            ))
        )}
    </div>
}