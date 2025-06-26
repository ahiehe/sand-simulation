import {type FC, type ReactNode, useState} from "react";
import type {IMainSandGridProvider} from "./context";
import {type GridSize, MainSandGridContext} from "./context";


interface MainSandGridProviderProps {
    children: ReactNode;
}

export const MainSandGridProvider: FC<MainSandGridProviderProps> = ({children}) => {
    const [sandMapSize, setSandMapSize] = useState<GridSize>({rows: 100, columns: 100});




    const value: IMainSandGridProvider = {
        sandMapSize: sandMapSize,
        setSandMapSize: setSandMapSize,
    }

    return <MainSandGridContext.Provider value={value}>
        {children}
    </MainSandGridContext.Provider>
}