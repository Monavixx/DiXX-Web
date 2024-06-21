import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDidUpdateEffect } from "./useDidUpdateEffects";


export function useEffectOnLoadUserData(fn, inputs=[]) {
    const isUserDataPending = useSelector(state=>state.user.is_pending);

    useDidUpdateEffect(()=>{
        if(!isUserDataPending) {
            fn();
        }
    }, [...inputs, isUserDataPending]);
}