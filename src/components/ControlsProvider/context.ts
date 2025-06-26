import {createContext} from "react";
import {type Mode} from "../../types/Mode";


export interface IControlsProvider {
    isPaused: boolean;
    setIsPaused: (isPaused: boolean) => void;
    fpsCounter: number;
    setFpsCounter: (fpsCounter: number) => void;
    mode: Mode;
    setMode: (mode: Mode) => void;
    isMouseDown: boolean;
    setIsMouseDown: (isMouseDown: boolean) => void;

}

export const ControlsContext = createContext<IControlsProvider | null>(null);