import {createContext} from "react";


export type GridSize = {
    rows: number;
    columns: number;
}


export interface IMainSandGridProvider {
    sandMapSize: GridSize;
    setSandMapSize: (gridSize: GridSize) => void;

}

export const MainSandGridContext = createContext<IMainSandGridProvider | null>(null);