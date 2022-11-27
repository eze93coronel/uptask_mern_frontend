

import { Link } from "react-router-dom"
import {useState} from 'react'
import Alerta from '../components/Alerta'
import clienteAxios from "../config/clienteAxios"
const Registrar = () => {
    const [nombre,setNombre ] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [repetirPass,setRepetirPass] = useState('')
    const [alerta,setAlerta] = useState({})

    const handleSubmit = async (e) => {
    e.preventDefault()
    if([nombre,email,password,repetirPass,].includes('')){
       setAlerta({
        msg : "Please complete all the fields, they are mandatory",
        error : true
       })
       return
    }
      // si los password no son iguales 
      if(password !== repetirPass ){
        setAlerta({
            msg : "!! the passwords are not the same !!😢",
            error : true
        })
        return
      }

      // alerta de password menos de 6 caracteres
      if(password.length < 6  ){
        setAlerta({
            msg : "😕The password must have at least 6 characters",
            error : true
        })
        return
    }
    
      setAlerta({})

    //crear el useer en la api
          try {
          
              const {data} = await clienteAxios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users` ,{nombre,email,password})
                  
              setAlerta({
                msg : data.msg,
                error : false
              })

              setNombre('')
              setEmail('')
              setPassword('')
              setRepetirPass('')

          } catch (error) {
              setAlerta({
                msg : error.response.data.msg,
                error : true
              })
          }
    }

    const {msg} = alerta

  return (
    <> 
    <h1 className="text-sky-600 font-black text-6xl  capitalize">Crea Tu Cuenta y Administra Tus{''}
     <span className="text-slate-700">Proyectos</span> 
 </h1>

     {msg && <Alerta alerta={alerta}/>}
     <form 
     className='my-10 bg-white shadow rounded-lg  p-10'
      onSubmit={handleSubmit}
     >

     <div className="my-5">
             <label className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="nombre"
             >Nombre </label>
                   
             <input type="text" 
             placeholder="Tu Nombre"
             className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
             id="nombre"
             value={nombre}
             onChange={e=>setNombre(e.target.value)}
             />

         </div>


         <div className="my-5">
             <label className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="email"
             >Email   </label>
                   
             <input type="email" 
             placeholder="Email de Registro"
             className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
             id="email"
             value={email}
             onChange={e=> setEmail(e.target.value)}
             />

         </div>

         <div className="my-5">
             <label className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="password"
             >Password</label>
                   
             <input type="password" 
             placeholder="Password del Registro"
             className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
             id="password"
             value={password}
             onChange={ e => setPassword(e.target.value)}
             />

         </div>

         <div className="my-5">
             <label className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="password2"
             >Repite Tu Password</label>
                   
             <input type="password" 
             placeholder="Repetir Password"
             className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
             id="password2"
             value={repetirPass}
             onChange={e => setRepetirPass(e.target.value)}
             />

         </div>

         <input type="submit" value="Crear Cuenta" className="w-full mb-5 py-3 bg-sky-700 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"/>
         
    </form>
  <nav className="lg:flex lg:justify-between">
         <Link className="block text-center my-5 text-slate-500 uppercase text-sm"
             to="/"
         > 
          Ya Tienes una Cuenta ? Inicia Sesion
         </Link>

         <Link className="block text-center my-5 text-slate-500 uppercase text-sm"
             to="/olvide-password"
         > 
          Olvide Mi Password
         </Link>
  </nav>

</>
  )
}

export default Registrar