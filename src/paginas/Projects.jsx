import {useEffect} from 'react'
import useProject from '../hooks/useProject'
import PreviewProject from '../components/PreviewProject'
import Alerta from '../components/Alerta'



const Projects = () => {
    const { projects,alerta} = useProject()

    
    
    const {msg} = alerta
  return (
      <> 
        <h1 className="text-4xl font-black">Projects</h1>
        {msg && <Alerta alerta={alerta}/>}
        <div className="bg-white shadow mt-10 rounded-lg "> 
         {projects.length ?
            projects.map(project =>(
                   <PreviewProject 
                     key={project._id}
                     project={project}
                   />
            ))
         :<p className="text-center text-gray-600 uppercase p-5">no ahi projects aun</p>}
             
        </div>
    </>      
  )
}

export default Projects