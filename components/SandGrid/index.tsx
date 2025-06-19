import {type FC,  useEffect, useRef, useState, type MouseEvent} from "react";
import {CreateDrawCell, type DrawCell} from "../SandSimulationProvider/context.ts";
import {Cell} from "../Cell"
import {useDrawContext} from "../../hooks/useDrawContext.ts";
import {SandEngine} from "../../SandEngine/SandEngine.ts";

export const SandGrid: FC = () => {

    const drawContext = useDrawContext();
    const [tick, setTick] = useState(0);

    const lastTimeRef = useRef(performance.now());
    const frameCountRef = useRef(0);

    const {rows, columns} = drawContext.sandMapSize;

    const sandMap = useRef<DrawCell[][]>(Array.from({length: rows}, () =>
        Array.from({length: columns}, () => CreateDrawCell()
    )));

    const engine = useRef(new SandEngine(sandMap.current));



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

    useEffect(() => {
        sandMap.current = Array.from({ length: rows }, () =>
            Array.from({ length: columns }, () => CreateDrawCell())
        );
        setTick(t => t + 1);
    }, [rows, columns]);

    useEffect(() => {

        if (!drawContext) return;

        engine.current = new SandEngine(sandMap.current);

        let animationFrameId: number;

        const frame = (time: number) => {
            engine.current.calculateFrame();

            setTick(tick + 1);

            frameCountRef.current++;
            if (time - lastTimeRef.current >= 1000) {
                drawContext.setFpsCounter(frameCountRef.current);
                frameCountRef.current = 0;
                lastTimeRef.current = time;
            }

            animationFrameId = requestAnimationFrame(frame);
        };

        animationFrameId = requestAnimationFrame(frame);

        return () => {
            cancelAnimationFrame(animationFrameId)
        }
    }, [drawContext, tick, rows, columns]);



    return <div className="square-grid" onMouseOver={handleMouseOver} onClick={handleMouseClick}>
        {sandMap.current.map((row, i) =>
            row.map((cell, j) => (
                <Cell key={`${i}-${j}`} row={i} column={j} info={cell.info} />
            ))
        )}
    </div>
}