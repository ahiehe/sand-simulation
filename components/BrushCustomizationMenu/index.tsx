import {type ChangeEvent, type FC} from "react";
import {BrushGrid} from "../BrushGrid";

import {GridSizeSelector} from "../GridSizeSelector";
import type {Mode} from "../../types/Mode.ts";
import {useControlsContext} from "../../hooks/useControlsContext.ts";
import {useBrushContext} from "../../hooks/useBrushContext.ts";


export const DrawCustomizationMenu: FC = () => {

    const brushContext = useBrushContext();
    const controlsContext = useControlsContext();
    const handleClick = (index: number) => {
        brushContext?.setSelectedColorIndex(index);
    }

    const changeMode = (e: ChangeEvent<HTMLSelectElement>) => {
        const newMode: Mode = e.target.value as Mode;
        controlsContext?.setMode(newMode);
    }

    const colorIndices = Array.from({length: 12}, (_, index) => index);

    return <div className="customization-container">
        <BrushGrid/>
        <div id="color-selector" className="color-selector">
            {colorIndices.map((index) => (
                <div className={`color-box square-color-${index} 
                                ${index === 0 ? "eraser" : ""} 
                                ${brushContext?.selectedColorIndex === index ? "selected" : ""}`}
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

        <GridSizeSelector gridType={"sand"} />
        <GridSizeSelector gridType={"brush"} />

    </div>
}