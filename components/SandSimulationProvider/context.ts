import {createContext} from "react";


export type GridSize = {
    rows: number;
    columns: number;
}


export interface ISandSimulationProvider {
    sandMapSize: GridSize;
    setSandMapSize: (gridSize: GridSize) => void;

}

export const SandSimulationContext = createContext<ISandSimulationProvider | null>(null);