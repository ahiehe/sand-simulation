import {type ChangeEvent, type FC} from "react";
import {DrawGrid} from "../DrawGrid";

import {useDrawContext} from "../../hooks/useDrawContext.ts";
import type {Mode} from "../SandSimulationProvider/context.ts";


export const DrawCustomizationMenu: FC = () => {

    const drawContext = useDrawContext();
    const handleClick = (index: number) => {
        drawContext?.setSelectedColorIndex(index);
    }

    const changeMode = (e: ChangeEvent<HTMLSelectElement>) => {
        const newMode = e.target.value as Mode;
        drawContext?.setMode(newMode);
        console.log(drawContext.mode)
    }

    const colorIndices = Array.from({length: 12}, (_, index) => index);

    return <div className="customization-container">
        <DrawGrid/>
        <div id="color-selector" className="color-selector">
            {colorIndices.map((index) => (
                <div className={`color-box square-color-${index} 
                                ${index === 0 ? "eraser" : ""} 
                                ${drawContext?.selectedColorIndex === index ? "selected" : ""}`}
                     onClick={() => handleClick(index)}
                     key={index}
                >

                </div>
            ))}
        </div>

        <select onChange={(e) => changeMode(e)}>
            <option value={"draw"}>draw</option>
            <option value={"eraser"}>eraser</option>
            <option value={"deleteColor"}>delete color</option>
        </select>


    </div>
}