import {type FC, type FormEvent, useState} from "react";
import {useMainSandGridContext} from "../../hooks/useMainSandGridContext.ts";
import {useBrushContext} from "../../hooks/useBrushContext.ts";

interface GridSizeSelectorProps {
    gridType: "sand" | "brush";
}

export const GridSizeSelector: FC<GridSizeSelectorProps> = ({gridType}) => {
    const brushContext = useBrushContext();
    const sandGridContext = useMainSandGridContext();

    const [rowsAmount, setRowsAmount] = useState(gridType === "brush" ? brushContext.brushMapSize.rows : sandGridContext.sandMapSize.rows);
    const [columnsAmount, setColumnsAmount] = useState(sandGridContext.sandMapSize.columns);



    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const root = document.documentElement;


        switch (gridType){
            case "brush":
                root.style.setProperty('--brush-container-dimension', rowsAmount.toString());
                brushContext.setBrushMapSize({rows: rowsAmount, columns: rowsAmount});
                break;
            case "sand":
                root.style.setProperty('--square-grid-rows', rowsAmount.toString());
                root.style.setProperty('--square-grid-cols', columnsAmount.toString());
                sandGridContext.setSandMapSize({rows: rowsAmount, columns: columnsAmount});
                break;
        }
    }

    return <form onSubmit={(e) => handleSubmit(e)}>
        <input type="number" value={rowsAmount} onChange={(e) => setRowsAmount(Number(e.target.value))}></input>
        {gridType === "sand" && <input type="number" value={columnsAmount} onChange={(e) => setColumnsAmount(Number(e.target.value))}></input>}
        <button type="submit" > change</button>
    </form>
}