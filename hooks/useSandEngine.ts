import {useEffect, useRef, useState} from "react";
import {SandEngine} from "../SandEngine/SandEngine";
import {type DrawCell} from "../components/SandSimulationProvider/context";
import {useDrawContext} from "./useDrawContext.ts";

export const useSandEngine = (sandMap: DrawCell[][]) => {
    const engine = useRef(new SandEngine(sandMap));
    const [, setTick] = useState(0);

    const lastTimeRef = useRef(performance.now());
    const frameCountRef = useRef(0);
    const {setFpsCounter} = useDrawContext();

    useEffect(() => {
        engine.current = new SandEngine(sandMap);
    }, [sandMap])

    useEffect(() => {
        let animationFrameId: number;

        const frame = (time: number) => {
            engine.current.calculateFrame();
            setTick(t => t + 1);

            frameCountRef.current++;
            if (time - lastTimeRef.current >= 1000) {
                setFpsCounter(frameCountRef.current);
                frameCountRef.current = 0;
                lastTimeRef.current = time;
            }

            animationFrameId = requestAnimationFrame(frame);
        };

        animationFrameId = requestAnimationFrame(frame);
        return () => cancelAnimationFrame(animationFrameId);
    }, [setFpsCounter, sandMap]);

    return engine;
};
