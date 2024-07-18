import { useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store.ts";


export function useEffectOnLoadUserData(fn, inputs:any[]=[]) {
    const isUserDataPending = useSelector<RootState>(state=>state.user.is_pending);

    useEffect(()=>{
        if(!isUserDataPending) {
            fn();
        }
        // eslint-disable-next-line
    }, [...inputs, isUserDataPending]);
}

export function useLayoutEffectOnLoadUserData(fn, inputs:any[]=[]) {
    const isUserDataPending = useSelector<RootState>(state=>state.user.is_pending);

    useLayoutEffect(()=>{
        if(!isUserDataPending) {
            fn();
        }
        // eslint-disable-next-line
    }, [...inputs, isUserDataPending]);
}