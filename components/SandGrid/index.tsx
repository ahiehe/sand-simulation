import {type FC, useEffect, useRef, type MouseEvent} from "react";
import {useSandMap} from "../../hooks/useSandMap.ts";
import {useSandEngine} from "../../hooks/useSandEngine.ts";
import {useControlsContext} from "../../hooks/useControlsContext.ts";
import {useMainSandGridContext} from "../../hooks/useMainSandGridContext.ts";
import {useBrushContext} from "../../hooks/useBrushContext.ts";

export const SandGrid: FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const controlsContext = useControlsContext();
    const sandGridContext = useMainSandGridContext();
    const brushContext = useBrushContext();

    const { rows, columns } = sandGridContext.sandMapSize;
    const sandMap = useSandMap(rows, columns);
    const engine = useSandEngine(sandMap.current);

    const CELL_SIZE = 6;
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < columns; x++) {
                const cell = sandMap.current[y][x];
                if (cell.info.status === 1) {
                    ctx.fillStyle = brushContext.colors[cell.info.colorIndex];
                    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                }
            }
        }
    });


    const getMouseCoords = (e: MouseEvent) => {
        const canvas = canvasRef.current!;
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / CELL_SIZE);
        const y = Math.floor((e.clientY - rect.top) / CELL_SIZE);
        return { x, y };
    };

    const handleMouse = (e: MouseEvent) => {
        const { x, y } = getMouseCoords(e);
        engine.current.drawOnSandGrid(y, x, brushContext, controlsContext);
    };

    return (
        <canvas
            ref={canvasRef}
            width={columns * CELL_SIZE}
            height={rows * CELL_SIZE}
            onMouseDown={handleMouse}
            onMouseMove={e => controlsContext.isMouseDown && handleMouse(e)}
            style={{
                cursor: "crosshair",
                border: "1px solid #333",
                background: "#1e1e2f"
            }}
        />
    );
};
