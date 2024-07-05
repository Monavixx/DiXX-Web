import { useEffect, useLayoutEffect, useRef } from "react";

export function useDidUpdateEffect(fn, inputs) {
    const isMountingRef = useRef(false);
  
    useEffect(() => {
      isMountingRef.current = true;
    }, []);
  
    useEffect(() => {
      if (!isMountingRef.current) {
        fn();
      } else {
        isMountingRef.current = false;
      } // eslint-disable-next-line
    }, inputs);
}
export function useDidUpdateLayoutEffect(fn, inputs) {
  const isMountingRef = useRef(false);

  useLayoutEffect(() => {
    isMountingRef.current = true;
  }, []);

  useLayoutEffect(() => {
    if (!isMountingRef.current) {
      fn();
    } else {
      isMountingRef.current = false;
    } // eslint-disable-next-line
  }, inputs);
} 