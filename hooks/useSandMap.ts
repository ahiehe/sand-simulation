import {useEffect, useRef, useState} from "react";
import {CreateDrawCell, type DrawCell} from "../components/SandSimulationProvider/context";



export const useSandMap = (rows: number, columns: number) => {

    const sandMap = useRef<DrawCell[][]>(Array.from({length: rows}, () =>
        Array.from({length: columns}, () => CreateDrawCell()
        )));

    const [, setMapVersion] = useState(0);
    useEffect(() => {
        sandMap.current = Array.from({ length: rows }, (_, rowIndex) =>
            Array.from({ length: columns }, (_, colIndex) => {
                const existing = sandMap.current?.[rowIndex]?.[colIndex];
                return existing?.info.status === 1 ? existing : CreateDrawCell();
            })
        );
        setMapVersion(prev => prev +1);
    }, [rows, columns]);

    return sandMap;
}