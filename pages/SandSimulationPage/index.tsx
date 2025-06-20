import {type FC, type MouseEvent} from "react";
import {SandGrid} from "../../components/SandGrid";
import {DrawCustomizationMenu} from "../../components/DrawCustomizationMenu";
import {FpsDisplay} from "../../components/FpsDisplay";
import {useDrawContext} from "../../hooks/useDrawContext.ts";



export const SandSimulationPage: FC = () => {

    const drawContext = useDrawContext();

    const handleMouseDown = (e: MouseEvent) => {
        if (e.button === 0) {
            drawContext.setIsMouseDown(true);
        }
    };

    const handleMouseUp = () => {
        drawContext.setIsMouseDown(false);
    };


    const handlePauseClick = () => {
        drawContext.setIsPaused(!drawContext.isPaused)
        console.log("pause!")
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