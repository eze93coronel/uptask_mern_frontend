import {useState,useEffect} from 'react' 
import {Link,useParams} from 'react-router-dom'
import clienteAxios from '../config/clienteAxios'
import Alerta from '../components/Alerta'

const NuevoPassword = () => {
   
  const [password,setPassword] = useState('')
  const [tokenValido,setTokenValido] = useState(false)
  const [alerta ,setAlerta] = useState({})
  const [modifiedPassword,setModifiedPassword] = useState(false)

  const params = useParams();
  const {token} = params;

  useEffect(()=>{
      const  checkToken = async ()=>{
            
        try {
        
         await clienteAxios(`http://localhost:4000/api/users/olvide-password/${token}`)
           setTokenValido(true)
        } catch (error) {
            setAlerta({
               msg: error.response.data.message,
               error : true
            })
        }

      }
      checkToken()
  },[])
  
        const handleSubmit = async (e) =>{
          e.preventDefault();
          if(password.length < 6){
            setAlerta({
                msg: "The password must be at least 6 characters",
                error: true
            })
            return
          }
            try {
                const url = `http://localhost:4000/api/users/olvide-password/${token}`
              
                const {data} = await clienteAxios.post(url,{password})
                 
                setAlerta({
                   msg : data.message,
                   error : false
                })
                setModifiedPassword(true)
            } catch (error) {
              setAlerta({
                msg: error.response.data.msg,
                error : true
              })
            }

        }

  const {msg } = alerta

  return (
    <> 
    <h1 className="text-sky-600 font-black text-6xl  capitalize">Reestablece Tu Password Y No Pierdas Acceso A Tus {''}
     <span className="text-slate-700">Proyectos</span> 
 </h1>
   {msg && <Alerta alerta={alerta}/>}

   {tokenValido && (
        <form 
         onSubmit={handleSubmit}
        className='my-10 bg-white shadow rounded-lg  p-10'>

        <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold"
             htmlFor="password"
            >Nuevo Password</label>
                  
            <input type="password" 
            placeholder="Escribe Tu Nuevo Password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            id="password"
            value={password}
            onChange={e=>{setPassword(e.target.value)}}
            />

        </div>

        <input type="submit" value="Guardar Nuevo Password" className="w-full mb-5 py-3 bg-sky-700 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"/>
        
   </form>
   )}

        {modifiedPassword && (
                          <Link className="block text-center my-5 text-slate-500 uppercase text-sm"
                          to="/"
                      > 
                      Inicia Sesion
                      </Link>
            
                    )}

</>

  )
}

export default NuevoPassword