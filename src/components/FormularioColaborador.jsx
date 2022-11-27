import {useState} from 'react'
import useProject from '../hooks/useProject'
import Alerta from '../components/Alerta'

const FormularioColaborador = () => {
 const [email,setEmail] = useState('')

 const {showAlert,alerta,submitEmailColaborador} = useProject()

        const handleSubmit = (e) => {
            e.preventDefault()
            if(email === ''){
                showAlert({
                    msg: 'Please enter your email',
                    error: true
                })
                return
            }
            submitEmailColaborador(email)
        }

    const {msg} = alerta
 
  return (
        <form className="bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow  "
        onSubmit={handleSubmit}
        >
            {msg && <Alerta alerta={alerta}/>}
                        
            <div className="mb-5">
                             <label 
                                className="text-gray-700 uppercase font-bold text-sm"
                             htmlFor="email"
                              >Email colaborador</label>
                              <input 
                             id="email"
                             type="email"
                             placeholder="email del usuario"
                             className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                             value={email}
                         onChange={e=>setEmail(e.target.value)}
                        />
                
            </div>

            <input
             type="submit"
             className="bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded text-sm"
              value='Buscar Colaborador'
             />

        </form>
  )
}

export default FormularioColaborador