import {useContext} from "react";
import {MainSandGridContext} from "../components/MainSandGridProvider/context";


export const useMainSandGridContext = () => {
    const mainSandGridContext = useContext(MainSandGridContext);

    if (!mainSandGridContext) {
        throw new Error('useMainSandGridContext must be used within MainSandGridContext');
    }
    return mainSandGridContext;
}