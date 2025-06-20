import {useEffect, useRef} from "react";
import {CreateDrawCell, type DrawCell} from "../components/SandSimulationProvider/context";



export const useSandMap = (rows: number, columns: number) => {

    const sandMap = useRef<DrawCell[][]>(Array.from({length: rows}, () =>
        Array.from({length: columns}, () => CreateDrawCell()
        )));

    useEffect(() => {
        sandMap.current = Array.from({ length: rows }, () =>
            Array.from({ length: columns }, () => CreateDrawCell())
        );

    }, [rows, columns]);

    return sandMap;
}