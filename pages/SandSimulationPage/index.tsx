import {type FC, type MouseEvent} from "react";
import {SandGrid} from "../../components/SandGrid";
import {DrawCustomizationMenu} from "../../components/DrawCustomizationMenu";
import {FpsDisplay} from "../../components/FpsDisplay";
import {useControlsContext} from "../../hooks/useControlsContext.ts";



export const SandSimulationPage: FC = () => {

    const controlsContext = useControlsContext();

    const handleMouseDown = (e: MouseEvent) => {
        if (e.button === 0) {
            controlsContext.setIsMouseDown(true);
        }
    };

    const handleMouseUp = () => {
        controlsContext.setIsMouseDown(false);
    };


    const handlePauseClick = () => {
        controlsContext.setIsPaused(!controlsContext.isPaused)

    }

    return <div className="background" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
        <div className="container" >
            <SandGrid />
        </div>
        <FpsDisplay/>
        <button style={{width: 50, height: 50}} onClick={() => handlePauseClick()}></button>
        <DrawCustomizationMenu/>
    </div>
}