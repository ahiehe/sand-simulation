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


    const [colors, setColors] = useState<string[]>([
        "#FFFFFF", "#FFFFFF", "#000000", "#FF0000", "#FFA500", "#FFFF00",
        "#008000", "#00FFFF", "#0000FF", "#EE82EE", "#8A2BE2", "#8B4513"
    ]);

    const value: IBrushProvider = {
        brushMapSize: brushMapSize,
        setBrushMapSize: setBrushMapSize,
        brushMap: brushMap,
        selectedColorIndex: selectedColorIndex,
        setSelectedColorIndex: setSelectedColorIndex,
        colors: colors,
        setColors: setColors
    }

    return <BrushContext.Provider value={value}>
        {children}
    </BrushContext.Provider>
}