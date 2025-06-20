import {type FC, type ReactNode, useEffect} from "react";
import { useRef, useState} from "react";
import {CreateDrawCell, type DrawCell, type GridSize, type Mode, SandSimulationContext} from "./context";
import type {ISandSimulationProvider} from "./context";

interface SandSimulationProviderProps {
    children: ReactNode;
}
export const SandSimulationProvider: FC<SandSimulationProviderProps> = ({children}) => {

    const drawMapDimension = 5;

    const [sandMapSize, setSandMapSize] = useState<GridSize>({rows: 30, columns: 20});
    const [drawMapSize, setDrawMapSize] = useState<GridSize>({rows: drawMapDimension, columns: drawMapDimension});

    const drawMap = useRef<DrawCell[][]>(Array.from({length: drawMapSize.rows}, () =>
        Array.from({length: drawMapSize.columns}, () => CreateDrawCell())
    ));

    const [mapVersion, setMapVersion] = useState(0);

    useEffect(() => {
        drawMap.current = Array.from({ length: drawMapSize.rows }, () =>
            Array.from({ length: drawMapSize.columns }, () => CreateDrawCell())
        );
        setMapVersion(prev => prev +1);
    }, [drawMapSize]);


    const [isMouseDown, setIsMouseDown] = useState(false);
    const [selectedColorIndex, setSelectedColorIndex] = useState(1);
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
        mapVersion: mapVersion,
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