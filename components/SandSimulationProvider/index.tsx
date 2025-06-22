import {type FC, type ReactNode, useState} from "react";
import type {ISandSimulationProvider} from "./context";
import {type GridSize, SandSimulationContext} from "./context";


interface SandSimulationProviderProps {
    children: ReactNode;
}

export const SandSimulationProvider: FC<SandSimulationProviderProps> = ({children}) => {
    const [sandMapSize, setSandMapSize] = useState<GridSize>({rows: 30, columns: 20});




    const value: ISandSimulationProvider = {
        sandMapSize: sandMapSize,
        setSandMapSize: setSandMapSize,
    }

    return <SandSimulationContext.Provider value={value}>
        {children}
    </SandSimulationContext.Provider>
}