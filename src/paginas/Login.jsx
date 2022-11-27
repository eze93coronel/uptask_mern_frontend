import {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';
import useAuth from '../hooks/useAuth'


  const Login = () => {
        const [email,setEmail] = useState('')
        const [password,setPassword] = useState('')
        const [alerta,setAlerta] = useState({})
        
        const { setAuth } = useAuth();
        const navigate = useNavigate()
        
     const handleSubmit = async e =>{
        e.preventDefault();

        if([email,password].includes('')){
            setAlerta({
                msg : 'All fields are required',
                error : true
            })
            return
        }
                    try {
                        const {data} = await clienteAxios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`,{email,password})

                        setAlerta({})
                        localStorage.setItem('token',data.token)
                        setAuth(data)
                        navigate('/Projects')
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
            <h1 className="text-sky-600 font-black text-6xl  capitalize">Inicia Sesion y Administra tus {''}
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

            <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold"
                 htmlFor="password"
                >Password</label>
                      
                <input type="password" 
                placeholder="Password del Registro"
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                id="password"
                value={password}
                onChange={e=>{setPassword(e.target.value)}}
                />

            </div>

            <input type="submit" value="Iniciar Sesion" className="w-full mb-5 py-3 bg-sky-700 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"/>
            
       </form>
     <nav className="lg:flex lg:justify-between">
            <Link className="block text-center my-5 text-slate-500 uppercase text-sm"
                to="registrar"
            > 
             ¡No Tienes una Cuenta ? Registrate 
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

export default Login