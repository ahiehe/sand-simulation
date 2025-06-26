import {type FC} from "react";
import {useControlsContext} from "../../hooks/useControlsContext.ts";


export const FpsDisplay: FC = () => {
    const controlsContext = useControlsContext();

    return <div>
        FPS: {controlsContext.fpsCounter}
    </div>
}