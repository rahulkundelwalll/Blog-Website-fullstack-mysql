import {createContext, useEffect, useState} from "react"
import axios from "axios";
export const AuthContext = createContext();
axios.defaults.withCredentials = true;


export const AuthContextProvider = ({children})=>{
    const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem("user"))|| null)
    const login = async(inputs)=>{
        const res = await axios.post("http://172.28.19.9:3000/api/auth/login", inputs)
        setCurrentUser(res.data);
    };



    const logout = async(inputs)=>{
        await axios.post("http://172.28.19.9:3000/api/auth/logout")
        setCurrentUser(null);
    };


    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(currentUser));
    },[currentUser])
    return(
        <AuthContext.Provider value={{currentUser,logout,login}}>
            {children}
        </AuthContext.Provider>
    )
};