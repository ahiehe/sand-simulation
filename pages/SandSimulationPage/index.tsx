import {type FC, useContext, useEffect} from "react";
import {SandGrid} from "../../components/SandGrid";
import {DrawCustomizationMenu} from "../../components/DrawCustomizationMenu";
import {SandSimulationContext} from "../../components/SandSimulationProvider/context.ts";
import {FpsDisplay} from "../../components/FpsDisplay";



export const SandSimulationPage: FC = () => {

    const drawContext = useContext(SandSimulationContext);


    useEffect(() => {
        if (!drawContext) return;

        const handleMouseDown = (e: MouseEvent) => {
            if (e.button === 0) {
                drawContext.setIsMouseDown(true);
            }
        };

        const handleMouseUp = () => {
            drawContext.setIsMouseDown(false);
        };

        document.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("mouseup", handleMouseUp);
        };

    }, [drawContext])


    return <div className="background">
        <div className="container" >
            <SandGrid />
        </div>
        <FpsDisplay/>
        <DrawCustomizationMenu/>
    </div>
}