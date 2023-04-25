import { useState,useContext,useEffect,createContext } from "react";
import axios from "axios";

//to create global context using context api and useState to change and store  states
const AuthContext=createContext()


//creating state globally
const AuthProvider =({children})=>{
    const [auth,setAuth]=useState({
        user:null,
        token:""
    })

    //setting header default
    axios.defaults.headers.common['Authorization']=auth?.token
    //this will set auth header by default on every req..with/without token 

    useEffect(()=>{
        const data= localStorage.getItem('auth');
        if(data){
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                user:parseData.user,
                token:parseData.token
            })
        }
        //eslint-disable-next-line 
    },[])

    return (
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}


//custom hook
const useAuth =()=>useContext(AuthContext)
export {useAuth,AuthProvider};          //now use this global context anywhere


//we can get the global state anywhere but once page refreshes it vanishes so use localstorage to store it and useEffect hook
//useEffect is a fn. that stores multiple function to execute to fetch the stored state