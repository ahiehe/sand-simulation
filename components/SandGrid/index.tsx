import {type FC, useEffect, useRef, useState} from "react";
import {CreateDrawCell, type DrawCell} from "../SandSimulationProvider/context.ts";
import {Cell} from "../Cell"
import {useDrawContext} from "../../hooks/useDrawContext.ts";

export const SandGrid: FC = () => {

    const drawContext = useDrawContext();
    const sandContainerRef = useRef<HTMLDivElement>(null);
    const [tick, setTick] = useState(0);

    const rows = useRef(30);
    const columns = useRef(20);

    const sandMap = useRef<DrawCell[][]>(Array.from({length: rows.current}, () =>
        Array.from({length: columns.current}, () => CreateDrawCell()
        )));


    const getCellStatus = (row: number, column: number) => {
        if (row < 0 || column < 0 || row >= rows.current || column >= columns.current) return -1;
        return sandMap.current[row][column].info.status;
    }

    useEffect(() => {
        const sandContainer = sandContainerRef.current;

        if (!drawContext) return;
        if (!sandContainer) return;


        const setNewSandOnMap = (currentGridCell: DrawCell, drawGridCell: DrawCell) => {
            currentGridCell.info = {status: 1, colorIndex: drawGridCell.info.colorIndex};
        }

        const removeSandFromMap = (currentGridCell: DrawCell) => {
            currentGridCell.info = {status: 0, colorIndex: 0};
        }

        const iterativeColorDeleting = (row: number, column: number, searchedColor: number) => {
            const visited: Set<string> = new Set();
            const queue: [number, number][] = [[row, column]];

            while (queue.length) {
                const [cellRow, cellCol] = queue.shift()!;

                const key = `${cellRow}-${cellCol}`;

                if (visited.has(key)) continue;
                visited.add(key);

                if (getCellStatus(cellRow, cellCol) === -1 ) continue;
                if (sandMap.current[cellRow][cellCol].info.colorIndex !== searchedColor) continue;

                sandMap.current[cellRow][cellCol].info = {status: 0, colorIndex: 0};

                queue.push([cellRow+1, cellCol]);
                queue.push([cellRow-1, cellCol]);
                queue.push([cellRow, cellCol+1]);
                queue.push([cellRow, cellCol-1]);


            }

        }



        const drawOnSandGrid = (row: number, column: number) => {
            const halfDimension = Math.floor(drawContext.drawMapDimension / 2);

            switch (drawContext.mode){
                case "draw":
                    for (let i = -1 * halfDimension; i <= halfDimension; i++) {
                        for (let j = -1 * halfDimension; j <= halfDimension; j++) {
                            if (drawContext.drawMap.current[i + halfDimension][j + halfDimension].info.status === 1 &&
                                (getCellStatus(row + i, column + j) === 1 || getCellStatus(row + i, column + j) === -1)) {
                                return;
                            }

                        }
                    }
                    for (let i = -1 * halfDimension; i <= halfDimension; i++) {
                        for (let j = -1 * halfDimension; j <= halfDimension; j++) {
                            if (drawContext.drawMap.current[i + halfDimension][j + halfDimension].info.status === 1) {
                                setNewSandOnMap(sandMap.current[row + i][column + j], drawContext.drawMap.current[i + halfDimension][j + halfDimension]);
                            }

                        }
                    }
                    break;

                case "eraser":
                    for (let i = -1 * halfDimension; i <= halfDimension; i++) {
                        for (let j = -1 * halfDimension; j <= halfDimension; j++) {
                            if (getCellStatus(row + i, column + j) === 1 && drawContext.drawMap.current[i + halfDimension][j + halfDimension].info.status === 1) {
                                removeSandFromMap(sandMap.current[row + i][column + j]);
                            }

                        }
                    }
                    break;
                case "deleteColor":
                    iterativeColorDeleting(row, column, sandMap.current[row][column].info.colorIndex);
                    break;
            }

        }

        const handleMouseOver = (e: MouseEvent) => {
            if (!drawContext.isMouseDown || !(e.target instanceof HTMLDivElement)) return;
            if (!e.target.classList.contains("square")) return;
            const sandSquare = e.target;

            const mapCol = parseInt(sandSquare.dataset.column || "");
            const mapRow = parseInt(sandSquare.dataset.row || "");

            drawOnSandGrid(mapRow, mapCol);
        };

        const handleMouseClick = (e: MouseEvent) => {
            if (!(e.target instanceof HTMLDivElement)) return;
            if (!e.target.classList.contains("square")) return;
            const sandSquare = e.target;

            const mapCol = parseInt(sandSquare.dataset.column || "");
            const mapRow = parseInt(sandSquare.dataset.row || "");

            drawOnSandGrid(mapRow, mapCol);
        };

        sandContainer.addEventListener("mouseover", handleMouseOver);
        sandContainer.addEventListener("click", handleMouseClick);

        return () => {
            sandContainer.removeEventListener("mouseover", handleMouseOver);
            sandContainer.removeEventListener("click", handleMouseClick);
        }


    }, [drawContext]);

    useEffect(() => {
        if (!drawContext) return;


        const updateSand = (row: number, column: number, rowNext: number, columnNext: number) => {
            const curSquare = sandMap.current[row][column];
            const nextSquare = sandMap.current[rowNext][columnNext];


            nextSquare.info = {status: curSquare.info.status, colorIndex: curSquare.info.colorIndex};
            curSquare.info = {status: 0, colorIndex: 0};

        }


        const intervalId = setInterval(() => {

            for (let row = rows.current - 2; row >= 0; row--) {
                for (let column = columns.current - 1; column >= 0; column--) {
                    const status = getCellStatus(row, column);
                    if (status === 1) {

                        const statusNext = getCellStatus(row + 1, column);

                        if (statusNext === 0) {
                            updateSand(row, column, row + 1, column);
                            continue;
                        }

                        if (statusNext === 1) {
                            const statusLeft = getCellStatus(row + 1, column - 1);
                            const statusRight = getCellStatus(row + 1, column + 1);
                            if ((statusLeft === -1 || statusLeft === 1) && (statusRight === -1 || statusRight === 1)) {
                                continue;
                            }

                            if ((statusLeft === -1 || statusLeft === 1) && statusRight === 0) {
                                updateSand(row, column, row + 1, column + 1);
                                continue;
                            }
                            if (statusLeft === 0 && (statusRight === -1 || statusRight === 1)) {
                                updateSand(row, column, row + 1, column - 1);
                                continue;
                            }

                            const leftOrRight = Math.floor(Math.random() * 2);
                            if (leftOrRight === 0) {
                                updateSand(row, column, row + 1, column - 1);
                            } else {
                                updateSand(row, column, row + 1, column + 1);
                            }
                        }
                    }
                }
            }
            setTick(tick+1);
        }, 60);

        return () => clearInterval(intervalId);
    }, [drawContext, setTick, tick]);

    return <div className="square-grid" ref={sandContainerRef}>
        {sandMap.current.map((row, i) =>
            row.map((cell, j) => (
                <Cell key={`${i}-${j}`} row={i} column={j} info={cell.info} />
            ))
        )}
    </div>
}