import {type FC, type MouseEvent} from "react";
import {Cell} from "../Cell"
import {useDrawContext} from "../../hooks/useDrawContext.ts";

import {useSandMap} from "../../hooks/useSandMap.ts";
import {useSandEngine} from "../../hooks/useSandEngine.ts";

export const SandGrid: FC = () => {
    const drawContext = useDrawContext();

    const {rows, columns} = drawContext.sandMapSize;
    const sandMap = useSandMap(rows, columns);

    const engine = useSandEngine(sandMap);

    const handleMouseOver = (e: MouseEvent) => {
        if (!drawContext.isMouseDown || !(e.target instanceof HTMLDivElement)) return;
        if (!e.target.classList.contains("square")) return;
        const sandSquare = e.target;

        const mapCol = parseInt(sandSquare.dataset.column || "");
        const mapRow = parseInt(sandSquare.dataset.row || "");

        engine.current.drawOnSandGrid(mapRow, mapCol, drawContext);
    };

    const handleMouseClick = (e: MouseEvent) => {
        if (!(e.target instanceof HTMLDivElement)) return;
        if (!e.target.classList.contains("square")) return;
        const sandSquare = e.target;

        const mapCol = parseInt(sandSquare.dataset.column || "");
        const mapRow = parseInt(sandSquare.dataset.row || "");


        engine.current.drawOnSandGrid(mapRow, mapCol, drawContext);
    };

    return <div className="square-grid" onMouseOver={handleMouseOver} onClick={handleMouseClick}>
        {sandMap.current.map((row, i) =>
            row.map((cell, j) => (
                <Cell key={`${i}-${j}`} row={i} column={j} info={cell.info} />
            ))
        )}
    </div>
}