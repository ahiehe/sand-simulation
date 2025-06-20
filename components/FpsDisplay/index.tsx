import {type FC} from "react";
import {useDrawContext} from "../../hooks/useDrawContext";


export const FpsDisplay: FC = () => {
    const drawContext = useDrawContext();

    return <div>
        FPS: {drawContext.fpsCounter}
    </div>
}