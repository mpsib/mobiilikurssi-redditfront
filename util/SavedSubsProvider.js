import { createContext, useState } from "react";

export const SavedSubsContext = createContext("");

export function SavedSubsProvider( {children} ){
    const [savedSubs, setSavedSubs] = useState([]);
    return (
        <SavedSubsContext.Provider value={{ savedSubs, setSavedSubs }}>
            {children}
        </SavedSubsContext.Provider>
    );
}