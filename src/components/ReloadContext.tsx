import React, { createContext, useContext, useEffect, useState } from "react";

const ReloadContext = createContext<(()=>void) | null>(null);

export function useReload() {
    return useContext(ReloadContext);
}

export default function ReloadProvider({children}) {
    const [key, setKey] = useState(false);
    const reloadPage = () => {setKey(v=>!v)};
    return (
        <ReloadContext.Provider value={reloadPage}>
            {children(key)}
        </ReloadContext.Provider>
    );
}

export function GlobalFunctionComponent() {
    const reloadPage = useReload();
    useEffect(()=>{
        window['reloadPage'] = reloadPage;
    }, [reloadPage]);
    return null;
}