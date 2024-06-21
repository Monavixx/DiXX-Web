import { useEffect, useRef } from "react";

export function useDidUpdateEffect(fn, inputs) {
    const isMountingRef = useRef(false);
  
    useEffect(() => {
      isMountingRef.current = true;
      console.log('mount');
    }, []);
  
    useEffect(() => {
      if (!isMountingRef.current) {
        fn();
      } else {
        isMountingRef.current = false;
      }
    }, inputs);
  }
  