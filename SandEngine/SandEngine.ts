import type {DrawCell} from "../types/DrawCell.ts";
import type {IBrushProvider} from "../components/BrushProvider/context.ts";
import type {IControlsProvider} from "../components/ControlsProvider/context.ts";


export class SandEngine{
    private sandMap: DrawCell[][];
    private rows: number;
    private columns: number;

    constructor(sandMap: DrawCell[][]) {
        this.sandMap = sandMap;
        this.rows = sandMap.length;
        this.columns = sandMap[0].length;
    }

    private getCellStatus (row: number, column: number) {
        if (row < 0 || column < 0 || row >= this.rows || column >= this.columns) return -1;
        return this.sandMap[row][column].info.status;
    }


    private cloneSandOnMap (currentGridCell: DrawCell, newGridCell: DrawCell) {
        newGridCell.info = {...currentGridCell.info};
    }

    private removeSandFromMap (currentGridCell: DrawCell) {
        currentGridCell.info = {status: 0, colorIndex: 0};
    }

    private updateSand = (row: number, column: number, rowNext: number, columnNext: number) => {
        const curSquare = this.sandMap[row][column];
        const nextSquare = this.sandMap[rowNext][columnNext];

        this.cloneSandOnMap(curSquare, nextSquare);
        this.removeSandFromMap(curSquare);

    }

    private iterativeColorDeleting (row: number, column: number, searchedColor: number) {
        const visited: Set<string> = new Set();
        const queue: [number, number][] = [[row, column]];

        while (queue.length) {
            const [cellRow, cellCol] = queue.shift()!;

            const key = `${cellRow}-${cellCol}`;

            if (visited.has(key)) continue;
            visited.add(key);

            if (this.getCellStatus(cellRow, cellCol) === -1 ) continue;
            if (this.sandMap[cellRow][cellCol].info.colorIndex !== searchedColor) continue;

            this.sandMap[cellRow][cellCol].info = {status: 0, colorIndex: 0};

            queue.push([cellRow+1, cellCol]);
            queue.push([cellRow-1, cellCol]);
            queue.push([cellRow, cellCol+1]);
            queue.push([cellRow, cellCol-1]);


        }

    }

    public drawOnSandGrid  (row: number, column: number, brushContext: IBrushProvider, controlsContext: IControlsProvider) {
        const halfDimension = Math.floor(brushContext.drawMapSize.rows / 2);

        switch (controlsContext.mode){
            case "draw":
                for (let i = -1 * halfDimension; i <= halfDimension; i++) {
                    for (let j = -1 * halfDimension; j <= halfDimension; j++) {
                        if (brushContext.drawMap.current[i + halfDimension][j + halfDimension].info.status === 1 &&
                            (this.getCellStatus(row + i, column + j) === 1 || this.getCellStatus(row + i, column + j) === -1)) {
                            return;
                        }

                    }
                }
                for (let i = -1 * halfDimension; i <= halfDimension; i++) {
                    for (let j = -1 * halfDimension; j <= halfDimension; j++) {
                        if (brushContext.drawMap.current[i + halfDimension][j + halfDimension].info.status === 1) {
                            this.cloneSandOnMap(brushContext.drawMap.current[i + halfDimension][j + halfDimension], this.sandMap[row + i][column + j]);
                        }

                    }
                }
                break;

            case "eraser":
                for (let i = -1 * halfDimension; i <= halfDimension; i++) {
                    for (let j = -1 * halfDimension; j <= halfDimension; j++) {
                        if (this.getCellStatus(row + i, column + j) === 1 && brushContext.drawMap.current[i + halfDimension][j + halfDimension].info.status === 1) {
                            this.removeSandFromMap(this.sandMap[row + i][column + j]);
                        }

                    }
                }
                break;
            case "deleteColor":
                this.iterativeColorDeleting(row, column, this.sandMap[row][column].info.colorIndex);
                break;
        }
    }

    public calculateFrame() {

        for (let row = this.rows - 2; row >= 0; row--) {
            for (let column = this.columns - 1; column >= 0; column--) {
                const status = this.getCellStatus(row, column);
                if (status === 1) {

                    const statusBelow = this.getCellStatus(row + 1, column);

                    if (statusBelow === 0) {
                        this.updateSand(row, column, row + 1, column);
                        continue;
                    }

                    if (statusBelow === 1) {
                        const statusLeft = this.getCellStatus(row + 1, column - 1);
                        const statusRight = this.getCellStatus(row + 1, column + 1);
                        if ((statusLeft === -1 || statusLeft === 1) && (statusRight === -1 || statusRight === 1)) {
                            continue;
                        }

                        if ((statusLeft === -1 || statusLeft === 1) && statusRight === 0) {
                            this.updateSand(row, column, row + 1, column + 1);
                            continue;
                        }
                        if (statusLeft === 0 && (statusRight === -1 || statusRight === 1)) {
                            this.updateSand(row, column, row + 1, column - 1);
                            continue;
                        }

                        const leftOrRight = Math.floor(Math.random() * 2);
                        if (leftOrRight === 0) {
                            this.updateSand(row, column, row + 1, column - 1);
                        } else {
                            this.updateSand(row, column, row + 1, column + 1);
                        }
                    }
                }
            }
        }

    };



}