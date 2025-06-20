import {useEffect, useRef, useState, type RefObject} from "react";
import {SandEngine} from "../SandEngine/SandEngine";
import {type DrawCell} from "../components/SandSimulationProvider/context";
import {useDrawContext} from "./useDrawContext.ts";

export const useSandEngine = (sandMap: RefObject<DrawCell[][]>) => {
    const engine = useRef(new SandEngine(sandMap.current));
    const [, setTick] = useState(0);

    const lastTimeRef = useRef(performance.now());
    const frameCountRef = useRef(0);
    const drawContext = useDrawContext();
    

    useEffect(() => {
        let animationFrameId: number;
        engine.current = new SandEngine(sandMap.current);
        const frame = (time: number) => {
            engine.current.calculateFrame();
            setTick(t => t + 1);

            frameCountRef.current++;
            if (time - lastTimeRef.current >= 1000) {
                drawContext.setFpsCounter(frameCountRef.current);
                frameCountRef.current = 0;
                lastTimeRef.current = time;
            }

            animationFrameId = requestAnimationFrame(frame);
        };

        animationFrameId = requestAnimationFrame(frame);
        return () => cancelAnimationFrame(animationFrameId);
    }, [drawContext, sandMap]);

    return engine;
};
