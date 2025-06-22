import {type FC, type ReactNode, useState} from "react";
import {type IBrushProvider, BrushContext} from "./context";
import type {GridSize} from "../SandSimulationProvider/context";
import {useSandMap} from "../../hooks/useSandMap";




interface BrushProviderProps {
    children: ReactNode;
}

export const BrushProvider: FC<BrushProviderProps> = ({children}) => {

    const drawMapDimension = 5;
    const [drawMapSize, setDrawMapSize] = useState<GridSize>({rows: drawMapDimension, columns: drawMapDimension});
    const drawMap = useSandMap(drawMapSize.rows, drawMapSize.columns);
    const [selectedColorIndex, setSelectedColorIndex] = useState(1);

    const value: IBrushProvider = {
        drawMapSize: drawMapSize,
        setDrawMapSize: setDrawMapSize,
        drawMap: drawMap,
        selectedColorIndex: selectedColorIndex,
        setSelectedColorIndex: setSelectedColorIndex
    }

    return <BrushContext.Provider value={value}>
        {children}
    </BrushContext.Provider>
}