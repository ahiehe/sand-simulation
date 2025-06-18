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

export interface ISandSimulationProvider {
    drawMap: RefObject<DrawCell[][]>;
    mode: Mode;
    setMode: (mode: Mode) => void;
    drawMapDimension: number;
    selectedColorIndex: number;
    setSelectedColorIndex: (index: number) => void;
    isMouseDown: boolean;
    setIsMouseDown: (isMouseDown: boolean) => void;

}

export const SandSimulationContext = createContext<ISandSimulationProvider | null>(null);