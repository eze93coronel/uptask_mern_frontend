 import { Link } from "react-router-dom"
import useProject from '../hooks/useProject'
import useAuth from '../hooks/useAuth'
import Busqueda from "./Busqueda"
const Header = () => {
  const {handleBuscador,buscador, closeSectionProjects} = useProject()
  const {closeSectionAuth} = useAuth()
 
  const handleCloseSetion = () => {
     closeSectionAuth()
     closeSectionProjects()
     localStorage.removeItem('token')
  }

  return (
    <header className="px-4 py-5 bg-white border-b">
          <div className="md:flex md:justify-between">
            <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">
                UpTask
           </h2>
                 <div className="flex flex-col md:flex-row items-center gap-4">
                   <button className="font-bold uppercase"
                    type="button"
                    onClick={handleBuscador}
                   >
                       Buscar Proyectos
                   </button>
                     <Link to="/projects"
                     className="font-bold uppercase">Projects</Link>
                    
                    <button 
                    type="button "
                     className="text-white font-bold text-sm bg-red-700 p-3 rounded-md uppercase"
                     onClick={handleCloseSetion}
                     >
                         Sign off
                    </button>
                     <Busqueda/>
                 </div>

          </div>
     </header>
  )
}

export default Header