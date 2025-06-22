import {createContext, type RefObject} from "react";
import type {DrawCell} from "../../types/DrawCell";
import type {GridSize} from "../SandSimulationProvider/context";


export interface IBrushProvider {
    drawMapSize: GridSize;
    setDrawMapSize: (gridSize: GridSize) => void;
    drawMap: RefObject<DrawCell[][]>;
    selectedColorIndex: number;
    setSelectedColorIndex: (index: number) => void;

}

export const BrushContext = createContext<IBrushProvider | null>(null);