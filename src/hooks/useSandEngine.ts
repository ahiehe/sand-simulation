import {useEffect, useRef, useState} from "react";
import {SandEngine} from "../SandEngine/SandEngine";
import {useControlsContext} from "./useControlsContext.ts";
import type {MaterialCell} from "../types/MaterialCell.ts";

export const useSandEngine = (sandMap: MaterialCell[][]) => {
    const engine = useRef(new SandEngine(sandMap));
    const [, setTick] = useState(0);

    const lastTimeRef = useRef(performance.now());
    const frameCountRef = useRef(0);
    const {setFpsCounter, isPaused} = useControlsContext();

    useEffect(() => {
        engine.current = new SandEngine(sandMap);
    }, [sandMap])

    useEffect(() => {

        let animationFrameId: number;
        const frame = (time: number) => {

            if (!isPaused) engine.current.calculateFrame();

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
        return () => {
            cancelAnimationFrame(animationFrameId);
        }
    }, [setFpsCounter, sandMap, isPaused]);

    return engine;
};
