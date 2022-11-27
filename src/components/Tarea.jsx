import {formatearFecha} from '../helpers/formatearFecha'
import useProject from '../hooks/useProject'
import useAdmin from '../hooks/useAdmin';
const Tarea = ({tarea}) => {
    const {handleModalEditarTarea,handleModalEliminarTarea, completarTarea} = useProject();
    const admin = useAdmin();

    const {description,nombre,prioridad,fechaEntrega,estado, _id} = tarea

  return (
    <div className="boder-b  p-5 justify-between items-center">
             <div className="flex flex-col items-start">
                 <p className="text-xl mb-1">{nombre}</p>
                 <p className="text-sm text-gray-500 uppercase mb-1">{description}</p>
                 <p className="text-xl mb-1">{formatearFecha(fechaEntrega)}</p>
                 <p className="text-gray-600 mb-1">{prioridad}</p>
                  
                  {estado && <p className="text-xs bg-green-500 uppercase p-1 rounded-lg text-white">Completa por : {tarea.completado.nombre}</p>}

             </div>
             
             <div className="flex flex-col lg:flex-row gap-2">
                
                {admin && (
               
                    <button className="bg-indigo-500 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                       onClick={() =>handleModalEditarTarea(tarea)}
                    >
                        Edit
                    </button>
                 )}
                  

                    <button className= {`${estado ? 'bg-sky-500' :'bg-gray-600'} px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
                    onClick={() =>completarTarea(_id)}
                  >
                     {estado ? 'Completa' : 'Incomplete'}
                 </button>

              
                 {admin && ( 
                    <button className="bg-red-500 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                      onClick={()=> handleModalEliminarTarea(tarea)}
                    >
                        Delete
                    </button>
                    )}
             </div>
    </div>
  )
}

export default Tarea