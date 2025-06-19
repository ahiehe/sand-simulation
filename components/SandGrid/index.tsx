import {type FC,  useEffect, useRef, useState} from "react";
import {CreateDrawCell, type DrawCell} from "../SandSimulationProvider/context.ts";
import {Cell} from "../Cell"
import {useDrawContext} from "../../hooks/useDrawContext.ts";
import {SandEngine} from "../../SandEngine/SandEngine.ts";

export const SandGrid: FC = () => {

    const drawContext = useDrawContext();
    const sandContainerRef = useRef<HTMLDivElement>(null);
    const [tick, setTick] = useState(0);

    const lastTimeRef = useRef(performance.now());
    const frameCountRef = useRef(0);

    const {rows, columns} = drawContext.sandMapSize;

    const sandMap = useRef<DrawCell[][]>(Array.from({length: rows}, () =>
        Array.from({length: columns}, () => CreateDrawCell()
    )));


    useEffect(() => {
        sandMap.current = Array.from({ length: rows }, () =>
            Array.from({ length: columns }, () => CreateDrawCell())
        );
        setTick(t => t + 1);
    }, [rows, columns]);

    useEffect(() => {
        const sandContainer = sandContainerRef.current;

        if (!drawContext) return;
        if (!sandContainer) return;



        const engine = new SandEngine(sandMap.current);

        const handleMouseOver = (e: MouseEvent) => {
            if (!drawContext.isMouseDown || !(e.target instanceof HTMLDivElement)) return;
            if (!e.target.classList.contains("square")) return;
            const sandSquare = e.target;

            const mapCol = parseInt(sandSquare.dataset.column || "");
            const mapRow = parseInt(sandSquare.dataset.row || "");

            engine.drawOnSandGrid(mapRow, mapCol, drawContext);
        };

        const handleMouseClick = (e: MouseEvent) => {
            if (!(e.target instanceof HTMLDivElement)) return;
            if (!e.target.classList.contains("square")) return;
            const sandSquare = e.target;

            const mapCol = parseInt(sandSquare.dataset.column || "");
            const mapRow = parseInt(sandSquare.dataset.row || "");


            engine.drawOnSandGrid(mapRow, mapCol, drawContext);
        };

        sandContainer.addEventListener("mouseover", handleMouseOver);
        sandContainer.addEventListener("click", handleMouseClick);


        let animationFrameId: number;

        const frame = (time: number) => {
            engine.calculateFrame();

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
            sandContainer.removeEventListener("mouseover", handleMouseOver);
            sandContainer.removeEventListener("click", handleMouseClick);
            cancelAnimationFrame(animationFrameId)
        }
    }, [drawContext, tick, rows, columns]);



    return <div className="square-grid" ref={sandContainerRef}>
        {sandMap.current.map((row, i) =>
            row.map((cell, j) => (
                <Cell key={`${i}-${j}`} row={i} column={j} info={cell.info} />
            ))
        )}
    </div>
}