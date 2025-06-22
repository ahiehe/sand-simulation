import {createContext, type RefObject} from "react";
import type {MaterialCell} from "../../types/MaterialCell.ts";
import type {GridSize} from "../MainSandGridProvider/context";


export interface IBrushProvider {
    brushMapSize: GridSize;
    setBrushMapSize: (gridSize: GridSize) => void;
    brushMap: RefObject<MaterialCell[][]>;
    selectedColorIndex: number;
    setSelectedColorIndex: (index: number) => void;

}

export const BrushContext = createContext<IBrushProvider | null>(null);