import {type FC, type ReactNode, useState} from "react";
import {ControlsContext, type IControlsProvider} from "./context";
import {type Mode} from "../../types/Mode";



interface ControlsProviderProps {
    children: ReactNode;
}

export const ControlsProvider: FC<ControlsProviderProps> = ({children}) => {

    const [isMouseDown, setIsMouseDown] = useState(false);
    const [mode, setMode] = useState<Mode>("draw");
    const [fpsCounter, setFpsCounter] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const value: IControlsProvider = {
        isPaused: isPaused,
        setIsPaused: setIsPaused,
        fpsCounter: fpsCounter,
        setFpsCounter: setFpsCounter,
        mode: mode,
        setMode: setMode,
        isMouseDown: isMouseDown,
        setIsMouseDown: setIsMouseDown,
    }

    return <ControlsContext.Provider value={value}>
        {children}
    </ControlsContext.Provider>
}