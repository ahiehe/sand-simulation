import {type FC, type ReactNode, useState} from "react";
import type {ISandSimulationProvider} from "./context";
import {type GridSize, type Mode, SandSimulationContext} from "./context";
import {useSandMap} from "../../hooks/useSandMap.ts";


interface SandSimulationProviderProps {
    children: ReactNode;
}

export const SandSimulationProvider: FC<SandSimulationProviderProps> = ({children}) => {
    const [sandMapSize, setSandMapSize] = useState<GridSize>({rows: 30, columns: 20});

    const drawMapDimension = 5;
    const [drawMapSize, setDrawMapSize] = useState<GridSize>({rows: drawMapDimension, columns: drawMapDimension});
    const drawMap = useSandMap(drawMapSize.rows, drawMapSize.columns);
    const [selectedColorIndex, setSelectedColorIndex] = useState(1);

    const [isMouseDown, setIsMouseDown] = useState(false);
    const [mode, setMode] = useState<Mode>("draw");
    const [fpsCounter, setFpsCounter] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const value: ISandSimulationProvider = {
        isPaused: isPaused,
        setIsPaused: setIsPaused,
        fpsCounter: fpsCounter,
        setFpsCounter: setFpsCounter,
        sandMapSize: sandMapSize,
        setSandMapSize: setSandMapSize,
        drawMapSize: drawMapSize,
        setDrawMapSize: setDrawMapSize,
        drawMap: drawMap,
        mode: mode,
        setMode: setMode,
        isMouseDown: isMouseDown,
        setIsMouseDown: setIsMouseDown,
        selectedColorIndex: selectedColorIndex,
        setSelectedColorIndex: setSelectedColorIndex
    }

    return <SandSimulationContext.Provider value={value}>
        {children}
    </SandSimulationContext.Provider>
}