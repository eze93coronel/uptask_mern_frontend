import {useEffect} from 'react'
import useProject from '../hooks/useProject'
import {useParams} from 'react-router-dom'
import Alerta from '../components/Alerta'
import FormularioColaborador from '../components/FormularioColaborador'


const NewCollaborator = () => {
    const {wantProject,project ,colaborador,agregarCollabator,alerta} = useProject()
    const params = useParams();

    useEffect(()=>{
        wantProject(params.id);
    })

    if(!project?._id) return <Alerta alerta={alerta}/>

  return (
       <>
           <h1 className="text-4xl font-black">Añadir Colaborador(a) al proyecto : {project.nombre}</h1>

           <div className="mt-10 flex justify-center"> 
                    <FormularioColaborador/>
           </div>
       {'' ? 'cargando..': colaborador?._id && (

<div className="flex justify-center mt-10" >
<div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow w-full">
     <h2 className="text-center mb-10 text-2xl font-bold">Resultado:</h2>

     <div className="flex justify-between items-center">
         <p>{colaborador.nombre}</p>
               < button 
               type="button"
               className="bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm"
                onClick={()=> agregarCollabator({email : colaborador.email})}
               >Agregar al Proyecto</button>
     </div>

</div>
</div>
       ) }
     
      
        </>
  )
}

export default NewCollaborator