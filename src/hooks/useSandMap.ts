import {useEffect, useRef, useState} from "react";
import {CreateMaterialCell, type MaterialCell} from "../types/MaterialCell.ts";


export const useSandMap = (rows: number, columns: number) => {

    const sandMap = useRef<MaterialCell[][]>(Array.from({length: rows}, () =>
        Array.from({length: columns}, () => CreateMaterialCell()
        )));

    const [, setMapVersion] = useState(0);
    useEffect(() => {
        sandMap.current = Array.from({ length: rows }, (_, rowIndex) =>
            Array.from({ length: columns }, (_, colIndex) => {
                const existing = sandMap.current?.[rowIndex]?.[colIndex];
                return existing?.info.status === 1 ? existing : CreateMaterialCell();
            })
        );
        setMapVersion(prev => prev +1);
    }, [rows, columns]);

    return sandMap;
}