import {type FC, type ReactNode, useState} from "react";
import {type IBrushProvider, BrushContext} from "./context";
import type {GridSize} from "../MainSandGridProvider/context";
import {useSandMap} from "../../hooks/useSandMap";




interface BrushProviderProps {
    children: ReactNode;
}

export const BrushProvider: FC<BrushProviderProps> = ({children}) => {

    const brushMapDimension = 5;
    const [brushMapSize, setBrushMapSize] = useState<GridSize>({rows: brushMapDimension, columns: brushMapDimension});
    const brushMap = useSandMap(brushMapSize.rows, brushMapSize.columns);
    const [selectedColorIndex, setSelectedColorIndex] = useState(1);

    const value: IBrushProvider = {
        brushMapSize: brushMapSize,
        setBrushMapSize: setBrushMapSize,
        brushMap: brushMap,
        selectedColorIndex: selectedColorIndex,
        setSelectedColorIndex: setSelectedColorIndex
    }

    return <BrushContext.Provider value={value}>
        {children}
    </BrushContext.Provider>
}