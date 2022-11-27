import {useState,useEffect,createContext} from 'react';
import {useNavigate } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios';
const AuthContext = createContext();

const AuthProvider = ({children})=> {
      const [auth,setAuth] = useState({})
      const [cargando,setCargando ] = useState(true)

  const navigate = useNavigate()
  
  useEffect(()=>{
         
             const authenticateUser = async()=>{
                const token = localStorage.getItem('token')
                if(!token) {
                    setCargando(false)
                    return
                }

            const config = {
                   headers :{
                      "Content-Type" : "application/json",
                      Authorization : `Bearer ${token}`
                   }
            }
            

                 try {
                    const {data} = await clienteAxios(`${import.meta.env.VITE_BACKEND_URL}/api/users/perfil`,config)
                    setAuth(data)
                  if(data._id && location.pathname === '/'){
                          navigate('/projects')
                  }
                 } catch (error) { 
                    setAuth({})
                 } finally {
                        
                 setCargando(false)
                 }

             }
 authenticateUser()
      },[])
const closeSectionAuth = () =>{
     setAuth({})
}
       return (
            <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
              closeSectionAuth
            }}
            
            >
                 {children}
            </AuthContext.Provider>
       )
}
export {
    AuthProvider
}

export default AuthContext;