import { useState,useContext,createContext } from "react";


//to create global context using context api and useState to change and store  states
const SearchContext=createContext()


//creating state globally
const SearchProvider =({children})=>{
    const [search,setSearch]=useState({
        keyword:"",
        results:[]
    });

    return (
        <SearchContext.Provider value={[search,setSearch]}>
            {children}
        </SearchContext.Provider>
    )
}


//custom hook
const useSearch =()=>useContext(SearchContext)
export {useSearch,SearchProvider};          //now use this global context anywhere


//we can get the global state anywhere but once page refreshes it vanishes so use localstorage to store it and useEffect hook
//useEffect is a fn. that stores multiple function to execute to fetch the stored state