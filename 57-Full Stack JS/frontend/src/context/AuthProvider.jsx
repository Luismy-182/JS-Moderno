import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    //cuando el componente se ejecuta el codigo
    useEffect(()=>{
        const autentificarUsuario= async ()=>{
            const token=localStorage.getItem('token');
            if(!token)return;
            const url ='/veterinarios/perfil'

            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Autorization:`Bearer ${token}`
                }
            }
            try {
                const {data}=await clienteAxios(url, config)
                
                setAuth(data);
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({});
            }

            console.log(token);
            
        }
        autentificarUsuario();
    }, [])

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
export {
    AuthProvider
}
export default AuthContext;