import {type FC, type FormEvent, useState} from "react";
import {useDrawContext} from "../../hooks/useDrawContext.ts";

interface GridSizeSelectorProps {
    gridType: "sand" | "draw";
}

export const GridSizeSelector: FC<GridSizeSelectorProps> = ({gridType}) => {
    const [rowsAmount, setRowsAmount] = useState(gridType === "draw" ? 5 : 30);
    const [columnsAmount, setColumnsAmount] = useState(20);

    const drawContext = useDrawContext();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const root = document.documentElement;


        switch (gridType){
            case "draw":
                root.style.setProperty('--draw-container-dimension', rowsAmount.toString());
                drawContext.setDrawMapSize({rows: rowsAmount, columns: rowsAmount});
                break;
            case "sand":
                root.style.setProperty('--square-grid-rows', rowsAmount.toString());
                root.style.setProperty('--square-grid-cols', columnsAmount.toString());
                drawContext.setSandMapSize({rows: rowsAmount, columns: columnsAmount});
                break;
        }
    }

    return <form onSubmit={(e) => handleSubmit(e)}>
        <input type="number" value={rowsAmount} onChange={(e) => setRowsAmount(Number(e.target.value))}></input>
        {gridType === "sand" && <input type="number" value={columnsAmount} onChange={(e) => setColumnsAmount(Number(e.target.value))}></input>}
        <button type="submit" > change</button>
    </form>
}