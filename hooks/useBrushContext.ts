import {useContext} from "react";
import {BrushContext} from "../components/BrushProvider/context";


export const useBrushContext = () => {
    const brushContext = useContext(BrushContext);

    if (!brushContext) {
        throw new Error('useBrushContext must be used within BrushContext');
    }
    return brushContext;
}