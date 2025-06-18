import type {FC, ReactNode} from "react";
import { useRef, useState} from "react";
import {CreateDrawCell, type DrawCell, type Mode, SandSimulationContext} from "./context";
import type {ISandSimulationProvider} from "./context";

interface SandSimulationProviderProps {
    children: ReactNode;
}
export const SandSimulationProvider: FC<SandSimulationProviderProps> = ({children}) => {

    const drawMapDimension = 5;
    const drawMap = useRef<DrawCell[][]>(Array.from({length: drawMapDimension}, () =>
        Array.from({length: drawMapDimension}, () =>CreateDrawCell())
    ));



    const [isMouseDown, setIsMouseDown] = useState(false);
    const [selectedColorIndex, setSelectedColorIndex] = useState(1);
    const [mode, setMode] = useState<Mode>("draw");



    const value: ISandSimulationProvider = {
        drawMapDimension: drawMapDimension,
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