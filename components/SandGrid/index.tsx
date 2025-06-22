import {type FC, type MouseEvent} from "react";
import {Cell} from "../Cell"
import {useSandMap} from "../../hooks/useSandMap.ts";
import {useSandEngine} from "../../hooks/useSandEngine.ts";
import {useControlsContext} from "../../hooks/useControlsContext.ts";
import {useDrawContext} from "../../hooks/useDrawContext.ts";
import {useBrushContext} from "../../hooks/useBrushContext.ts";

export const SandGrid: FC = () => {
    const controlsContext = useControlsContext();
    const sandGridContext = useDrawContext();
    const brushContext = useBrushContext();

    const {rows, columns} = sandGridContext.sandMapSize;
    const sandMap = useSandMap(rows, columns);

    const engine = useSandEngine(sandMap.current);

    const handleMouseOver = (e: MouseEvent) => {
        if (!controlsContext.isMouseDown || !(e.target instanceof HTMLDivElement)) return;
        if (!e.target.classList.contains("square")) return;
        const sandSquare = e.target;

        const mapCol = parseInt(sandSquare.dataset.column || "");
        const mapRow = parseInt(sandSquare.dataset.row || "");

        engine.current.drawOnSandGrid(mapRow, mapCol, brushContext, controlsContext);
    };

    const handleMouseClick = (e: MouseEvent) => {
        if (!(e.target instanceof HTMLDivElement)) return;
        if (!e.target.classList.contains("square")) return;
        const sandSquare = e.target;

        const mapCol = parseInt(sandSquare.dataset.column || "");
        const mapRow = parseInt(sandSquare.dataset.row || "");


        engine.current.drawOnSandGrid(mapRow, mapCol, brushContext, controlsContext);
    };

    return <div className="square-grid" onMouseOver={handleMouseOver} onClick={handleMouseClick}>
        {sandMap.current.map((row, i) =>
            row.map((cell, j) => (
                <Cell key={`${i}-${j}`} row={i} column={j} info={cell.info} />
            ))
        )}
    </div>
}