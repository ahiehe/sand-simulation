import {useContext} from "react";
import {SandSimulationContext} from "../components/SandSimulationProvider/context";


export const useDrawContext = () => {
    const drawContext = useContext(SandSimulationContext);
    if (!drawContext) {
        throw new Error('useDrawContext must be used within SandSimulationContext');
    }
    return drawContext;
}