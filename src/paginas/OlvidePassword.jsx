import { Link } from 'react-router-dom'
import { useState } from 'react'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'

const OlvidePassword = () => {

  const [email,setEmail] = useState('')
  const [alerta,setAlerta] = useState({})

        const handleSubmit = async e =>{
          e.preventDefault();
          
          if(email === '' || email.length < 6){
              setAlerta({
                  msg : 'email is required',
                  error : true
              })
              return
          }

          try {
      
              
            const {data} = await clienteAxios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/olvide-password`,{email})
               setAlerta({
                   msg : data.msg, 
                   error : false
               })
          } catch (error) {
             setAlerta({
                msg : error.response.data.message,
                error : true
             })
          }
        }

   const {msg} = alerta


  return (
    <> 
    <h1 className="text-sky-600 font-black text-6xl  capitalize">Recupera tu Acceso y No Pierdas Tus {''}
     <span className="text-slate-700">Proyectos</span> 
 </h1>

     {msg && <Alerta alerta={alerta}/>}

     <form
      onSubmit={handleSubmit}
      className='my-10 bg-white shadow rounded-lg  p-10'>

 


         <div className="my-5">
             <label className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="email"
             >Email   </label>
                   
             <input type="email" 
             placeholder="Email de Registro"
             className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
             id="email"
             value={email}
             onChange={e=>{setEmail(e.target.value)}}
             />

         </div>

         

    
         <input type="submit" value="Enviar Instrucciones" className="w-full mb-5 py-3 bg-sky-700 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"/>
         
    </form>
  <nav className="lg:flex lg:justify-between">
         <Link className="block text-center my-5 text-slate-500 uppercase text-sm"
             to="/"
         > 
          Ya Tienes una Cuenta ? Inicia Sesion
         </Link>
    
         <Link className="block text-center my-5 text-slate-500 uppercase text-sm"
                to="/registrar"
            > 
             ¡No Tienes una Cuenta ? Registrate 
            </Link>
  </nav>

</>

  )
}

export default OlvidePassword