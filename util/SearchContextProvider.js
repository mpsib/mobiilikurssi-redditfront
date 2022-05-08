import { createContext, useState } from "react";

export const SearchContext = createContext("");

//hakutulokset jäävät muistiin kun selataan subredditejä
export function SearchContextProvider( {children} ){
    const [searchResults, setSearchResults] = useState([]);
    return (
        <SearchContext.Provider value={{ searchResults, setSearchResults }}>
            {children}
        </SearchContext.Provider>
    );
}