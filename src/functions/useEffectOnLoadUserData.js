import { useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";


export function useEffectOnLoadUserData(fn, inputs=[]) {
    const isUserDataPending = useSelector(state=>state.user.is_pending);

    useEffect(()=>{
        if(!isUserDataPending) {
            fn();
        }
        // eslint-disable-next-line
    }, [...inputs, isUserDataPending]);
}

export function useLayoutEffectOnLoadUserData(fn, inputs=[]) {
    const isUserDataPending = useSelector(state=>state.user.is_pending);

    useLayoutEffect(()=>{
        if(!isUserDataPending) {
            fn();
        }
        // eslint-disable-next-line
    }, [...inputs, isUserDataPending]);
}