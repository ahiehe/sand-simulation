import {createContext} from "react";
import type {RefObject} from "react";


export type DrawCellInfo = {
    status: number;
    colorIndex: number;
}
export type DrawCell = {
    info: DrawCellInfo;
}

export const CreateDrawCell = (): DrawCell => {
    return {
        info: {
            status: 0,
            colorIndex: 1,
        }
    }
}

export type Mode = "draw" | "eraser" | "deleteColor";

export type GridSize = {
    rows: number;
    columns: number;
}


export interface ISandSimulationProvider {
    isPaused: boolean;
    setIsPaused: (isPaused: boolean) => void;
    fpsCounter: number;
    setFpsCounter: (fpsCounter: number) => void;
    sandMapSize: GridSize;
    setSandMapSize: (gridSize: GridSize) => void;
    drawMapSize: GridSize;
    setDrawMapSize: (gridSize: GridSize) => void;
    drawMap: RefObject<DrawCell[][]>;
    mode: Mode;
    setMode: (mode: Mode) => void;
    selectedColorIndex: number;
    setSelectedColorIndex: (index: number) => void;
    isMouseDown: boolean;
    setIsMouseDown: (isMouseDown: boolean) => void;

}

export const SandSimulationContext = createContext<ISandSimulationProvider | null>(null);