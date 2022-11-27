import {useEffect} from 'react'
import {useParams,Link} from 'react-router-dom'
import useProject from '../hooks/useProject'
import useAdmin from '../hooks/useAdmin'
import ModalFormularioTarea from '../components/ModalFormularioTarea'
import ModalEliminarTarea from '../components/ModalEliminarTarea'
import ModalEliminarColaborador from '../components/ModalEliminarColaborador'
import Alerta from '../components/Alerta'
import Tarea from '../components/Tarea'
import Colaborador from '../components/Colaborador'
import io from 'socket.io-client'

let socket;

const Project = () => {
    const params = useParams();
  
    const {wantProject,project, cargando,handleModalTarea,alerta,submitTareaProyecto, eliminarTarea, actualizarTareaProyecto, cambiarEstadoTarea} = useProject();
    
    const admin = useAdmin();


    useEffect(()=>{
        wantProject(params.id);
    },[])

    useEffect(()=>{
     socket = io(import.meta.env.VITE_BACKEND_URL)
     socket.emit('abrir proyecto', params.id)
    },[])

    useEffect(() =>{
         socket.on("tarea agregada", tareaNueva =>{
          if(tareaNueva.proyecto === project._id){
            submitTareaProyecto(tareaNueva)
          }
         })

         socket.on('tarea eliminada', tareaEliminada => {
             if(tareaEliminada.proyecto === project._id){
              eliminarTarea(tareaEliminada)
             }
         })

         socket.on('tarea actualizada', tareaActualizada =>{
            if(tareaActualizada.proyecto._id === project._id){
              actualizarTareaProyecto(tareaActualizada)
            }
         });

         socket.on('nuevo estado', nuevoEstadoTarea=>{
       if(nuevoEstadoTarea.proyecto._id === project._id){
        cambiarEstadoTarea(nuevoEstadoTarea)
       }
         })
    })

    const {nombre } = project

 

    if(cargando) return "cargando"


    const {msg} = alerta

  
            return (
                 <>
                    <div className="flex justify-between">
                        <h1 className="font-black text-4xl">{nombre}</h1>
                        {admin && (
                        <div className="flex items-center gap-2 text-gray-400 hover:text-black">
                               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                              </svg>
                                <Link to={`/projects/edit/${params.id}`}
                                className="uppercase font-bold">Edit
                                </Link>
                        </div>
                     )}
                   </div>
                    {admin && (
                   <button className="text-sm px-5 py-3  w-full md:w-auto rounded-lg uppercase font-bold
                         bg-sky-400 text-white text-center mt-5 flex gap-2 items-center justify-center"
                         type="button"
                         onClick={handleModalTarea}
                         >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                             </svg>
                            New Tarea</button>
                             )}
                               <p className="font-bold text-xl mt-10 ">Tareas del Proyecto</p>
                                
                              <div className="flex justify-center">
                                       <div className="w-full md:w-1/3 lg:w-1/4">
                                       {msg && <Alerta alerta={alerta}/>}
                                       </div>
                              </div>

                               < div className="bg-white shadow mt-10 rounded-lg">
                                   {project.tareas?.length ? project.tareas?.map(tarea =>(
                                     <Tarea 
                                       key={tarea._id}
                                       tarea={tarea}
                                     />
                                   )) 
                                   : <p className="text-center my-5 p-10">No ahy Tareas en este Preyecto</p>}
                               </div>
                                {admin && ( 
                               <>
                               <div className="flex items-center justify-between mt-10">
                                    <p className="font-bold text-xl mt-10 ">Colaboradores</p>

                                        <Link to={`/projects/nuevo-colaborador/${project._id}`}
                                          className="text-gray-400 uppercase font-bold hover:text-black"
                                        >
                                          Añadir
                                        </Link>

                               </div>

                               
                                        
                               < div className="bg-white shadow mt-10 rounded-lg">
                                   {project.colaboradores?.length ? project.colaboradores?.map(colaborador =>(
                                        <Colaborador 
                                           key={colaborador._id}
                                           colaborador={colaborador}
                                        />
                                    
                                   )) 
                                   : <p className="text-center my-5 p-10">No ahy Colaboradores</p>}
                               </div>
                               </>
                          )}
                            <ModalFormularioTarea/>
                            <ModalEliminarTarea/>
                            <ModalEliminarColaborador/>
                   </>
            )
            
     }

export default Project