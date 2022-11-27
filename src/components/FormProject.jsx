
import {useState,useEffect} from 'react' 
import {useParams} from 'react-router-dom'
import useProject from '../hooks/useProject'
import Alerta from '../components/Alerta'
const FormProject = () => {
  const [id,setId] = useState(null)
   const [nombre,setNombre] = useState('')
   const [description ,setDescription] = useState('')
   const [fechaEntrega,setFechaEntrega] = useState('')
   const [cliente,setCliente] = useState('')
   
   const params = useParams()

   const {showAlert ,alerta,submitProject,project} = useProject();

   useEffect(()=>{
         if(params.id ){
            setId(project._id);
            setNombre(project.nombre)
            setFechaEntrega(project.fechaEntrega?.split('T')[0])
            setCliente(project.cliente)
            setDescription(project.description)
            
         }
   },[params])

   const handleSubmit = async e => {
       e.preventDefault();

       if([nombre,description,fechaEntrega,cliente].includes('')){
              showAlert({
                msg : "All fields are required",
                error : true
              })
              return
       }
       // passar los datos al provider
       await  submitProject({ id,nombre,cliente,description,fechaEntrega})
       setId(null)
       setNombre('')
       setDescription('')
       setFechaEntrega('')
       setCliente('')
   }


   const {msg} = alerta
  return (
            <form
             onSubmit = {handleSubmit}
            className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">

                 {msg && <Alerta alerta={alerta}/>}

                    <div className="mb-5">
                         <label className="text-gray-700 uppercase font-bold text-sm "
                          htmlFor="nombre">Name Project</label>
                          <input 
                            id="nombre"
                          type="text"
                           className="border  w-full p-2 mt-2 placeholder-gray-400 rounded-md "
                           placeholder=" Project's Name"
                           value={nombre}
                           onChange={e=>{setNombre(e.target.value)}}
                          />
                    </div>


              <div className="mb-5">
                         <label className="text-gray-700 uppercase font-bold text-sm "
                          htmlFor="description">Description</label>

                          <textarea
                            id="description"
                           className="border  w-full p-2 mt-2 placeholder-gray-400 rounded-md "
                           placeholder="Project description"
                           value={description}
                           onChange={e=>{setDescription(e.target.value)}}
                          />
                    </div>

                    
              <div className="mb-5">
                         <label className="text-gray-700 uppercase font-bold text-sm "
                          htmlFor="fecha-entrega">Date of Delivery</label>

                          <input
                            id="fecha-entrega"
                            type="date"
                           className="border  w-full p-2 mt-2 placeholder-gray-400 rounded-md "
                           value={fechaEntrega}
                           onChange={e=>{setFechaEntrega(e.target.value)}}
                          />
                    </div>

                    <div className="mb-5">
                         <label className="text-gray-700 uppercase font-bold text-sm "
                          htmlFor="cliente">Customer Name</label>
                          <input 
                            id="cliente"
                          type="text"
                           className="border  w-full p-2 mt-2 placeholder-gray-400 rounded-md "
                           placeholder="Customer Name"
                           value={cliente}
                           onChange={e=>{setCliente(e.target.value)}}
                          />
                    </div>

                    <input
                       type="submit"
                       value={id ? "update project" : "create project"}
                       className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
                    />
            </form>
  )
}

export default FormProject