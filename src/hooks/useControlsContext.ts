import {useContext} from "react";
import {ControlsContext} from "../components/ControlsProvider/context";


export const useControlsContext = () => {
    const controlsContext = useContext(ControlsContext);

    if (!controlsContext) {
        throw new Error('useControlsContext must be used within ControlsContext');
    }
    return controlsContext;
}