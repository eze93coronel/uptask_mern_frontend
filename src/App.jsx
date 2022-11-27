import {BrowserRouter,Routes,Route} from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import RouteProject from "./layouts/RouteProject";


import Login from "./paginas/Login";
import Registrar from "./paginas/Registrar";
import OlvidePassword from "./paginas/OlvidePassword";
import NuevoPassword from "./paginas/NuevoPassword";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta";
import Projects from "./paginas/Projects";
import NewProject from "./paginas/NewProject";
import Project from "./paginas/Project";
import EditProject from "./paginas/EditProject";
import NewCollaborator from "./paginas/NewCollaborator";
import  {AuthProvider} from './context/AuthProvider'
import {ProjectProvider} from "./context/ProjectProvider"

 //console.log(import.meta.env.VITE_BACKEND_URL)

function App() {

  return (
      <BrowserRouter > 
        <AuthProvider>
          <ProjectProvider>
         <Routes>
               <Route path="/" element={<AuthLayout/>}>
              <Route index element={<Login/>}/>
              <Route path="registrar" element={<Registrar/>}/>
              <Route path="olvide-password" element={<OlvidePassword/>}/>
              <Route path="olvide-password/:token" element={<NuevoPassword/>}/>
              <Route path="confirmar/:id" element={<ConfirmarCuenta/>}/>
              </Route>
        
        <Route path="/projects" element={<RouteProject/>}> 
            <Route index element={<Projects/>}/>
            <Route path="create-project" element={<NewProject/>}/>
            <Route path="nuevo-colaborador/:id" element={<NewCollaborator/>}/>
            <Route path=":id" element={<Project/>}/>
            <Route path="edit/:id" element={<EditProject/>}/>

        </Route>

         </Routes>
         </ProjectProvider>
         </AuthProvider>
      </BrowserRouter>
  )
}

export default App
