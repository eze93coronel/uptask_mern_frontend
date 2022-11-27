import {useState,useEffect,createContext} from 'react';
import clienteAxios from '../config/clienteAxios';
import {useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import io from 'socket.io-client';

let socket;
const ProjectContext = createContext();

const ProjectProvider = ({children})=>{

   const [projects,setProjects] = useState([])
   const [alerta,setAlerta] = useState({})
   const [project,setProject] = useState({})
   const [cargando,setCargando] = useState(false)
   const [modalFormularioTarea,setModalFormularioTarea] = useState(false)
   const [modalEliminarTarea,setModalEliminarTarea] = useState(false)
   const [tarea,setTarea ] = useState({})
   const [colaborador,setColaborador] = useState({})
   const [modalEliminarColaborador ,setModalEliminarColaborador] = useState(false)
   const [buscador ,setBuscador] = useState(false)
  
   const navigate = useNavigate()

   const {auth} = useAuth()

        useEffect(() =>{
                const getProjects = async ()=>{
                          try {
                            const token = localStorage.getItem('token');
                            if(!token) return;

                            const config = {
                                headers: {
                                    "Content-Type" : "application/json",
                                    Authorization:  `Bearer ${token}` 
                                }
                            }

                            const {data} = await clienteAxios.get(`${import.meta.env.VITE_BACKEND_URL}/api/projects`,config);
                          setProjects(data);

                          } catch (error) {
                            console.log(error)
                          }
                }
                getProjects()
        },[auth])

        useEffect(() =>{
           socket = io(import.meta.env.VITE_BACKEND_URL)
        },[])

   const showAlert  = ( alerta )=>{
    setAlerta(alerta)
     
            setTimeout(()=>{
                 showAlert({})
            },3000)
   }
  
   const submitProject = async( project )=>{
         if(project.id){
           await   editProject(project)
         }else{
           await   newProject(project)
         } 
   }
       
     const editProject = async (project) => {
               try {
                const token = localStorage.getItem('token');
                if(!token) return
            
                const config = {
                    headers: {
                        "Content-Type" : "application/json",
                        Authorization:  `Bearer ${token}` 
                    }
                }
                  const { data } = await clienteAxios.put(`${import.meta.env.VITE_BACKEND_URL}/api/projects/${project.id}`,project,config)
              
                    //sincronizar el state 
                       const projectUpdates = projects.map(projectState => projectState._id === data._id ? data : projectState)
                       setProjects(projectUpdates)
                    //mostrar la alerta 
                         
                    setAlerta({
                        msg: "project update successfully!!",
                        error: false
                    })
                    setTimeout(()=>{
                      setAlerta({})
                      navigate('/projects')
                    },3000)

                    //redireccionar
               } catch (error) {
                  console.log(error)
               }
     }
        
     const newProject = async ( project ) => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return
        
            const config = {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization:  `Bearer ${token}` 
                }
            }

            const {data} = await clienteAxios.post(`${import.meta.env.VITE_BACKEND_URL}/api/projects`,project,config)
             setProjects([...projects,data])
         
           
            setAlerta({
                msg: "project created successfully!!",
                error: false
            })
            setTimeout(()=>{
              setAlerta({})
              navigate('/projects')
            },3000)

         } catch (error) {
            console.error(error)
         }
     }

            const wantProject = async (id) => {
                setCargando(true)
                try {
                    const token = localStorage.getItem('token');
                    if(!token) return
                
                    const config = {
                        headers: {
                            "Content-Type" : "application/json",
                            Authorization:  `Bearer ${token}` 
                        }
                    }
                const {data} = await clienteAxios.get(`${import.meta.env.VITE_BACKEND_URL}/api/projects/${id}`,config)

                        setProject(data)
                } catch (error) {
                  navigate('/projects')
                   setAlerta({
                     msg: error.response.data.message,
                     error : true
                   })
                   setTimeout(()=>{
                      setAlerta({})
                   },2000)
                }finally {
                    setCargando(false)
                }
            }
   const deleteProject = async (id)=>{
          try {
            const token = localStorage.getItem('token');
            if(!token) return
        
            const config = {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization:  `Bearer ${token}` 
                }
            }

            const {data} = await clienteAxios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/projects/${id}`,config)
          //sincronizar el state
             const projectUpdate = projects.filter(projectState => projectState._id !== id)
             setProjects(projectUpdate)
                 setAlerta({
                   msg : data.message,
                   error : false
                 })

                 setTimeout(()=>{
                  setAlerta({})
                  navigate('/projects')
                },3000)

          } catch (error) {
            console.log(error)
          }
   }
   const handleModalTarea = () => {
      setModalFormularioTarea(!modalFormularioTarea)
      setTarea({})
   }

        const submitTarea = async (tarea) => {
        if(tarea?.id){
         await   editarTarea(tarea)
        }else{
         await crearTarea(tarea)
        }
        }

   const crearTarea = async (tarea) => {
    try {
      const token = localStorage.getItem('token');
      if(!token) return
  
      const config = {
          headers: {
              "Content-Type" : "application/json",
              Authorization:  `Bearer ${token}` 
          }
      }
      const {data} = await clienteAxios.post(`${import.meta.env.VITE_BACKEND_URL}/api/tareas`, tarea, config);


     
      setAlerta({})
      setModalFormularioTarea(false)

   // SOKERT IO 
   socket.emit('nueva tarea',data)

    } catch (error) {
      console.log(error);
    }
   }
   

   const editarTarea = async (tarea) => {
         try {
          const token = localStorage.getItem('token');
          if(!token) return
      
          const config = {
              headers: {
                  "Content-Type" : "application/json",
                  Authorization:  `Bearer ${token}` 
              }
          }
           const {data} = await clienteAxios.put(`${import.meta.env.VITE_BACKEND_URL}/api/tareas/${tarea.id}`,tarea,config)
      
      
          setAlerta({})
          setModalFormularioTarea(false)

          //socket
          socket.emit('actualizar tarea', data)

         } catch (error) {
           console.log(error);

         }
   }

   const handleModalEditarTarea =  tarea => {
       setTarea(tarea)
       setModalFormularioTarea(true)
   }

   const handleModalEliminarTarea = tarea => {
    setTarea(tarea) 
    setModalEliminarTarea(!modalEliminarTarea)
   }

   const deleteTarea = async () => {
             try {
              const token = localStorage.getItem('token');
              if(!token) return
          
              const config = {
                  headers: {
                      "Content-Type" : "application/json",
                      Authorization:  `Bearer ${token}` 
                  }
              }
               const {data} = await clienteAxios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/tareas/${tarea._id}`,config)
                 
               setAlerta({
                  msg : data.message,
                  error : false
               })
            
               
              setModalEliminarTarea(false)
            //  setTarea({})
             
              // socket
              socket.emit('eliminar tarea',tarea)
              setTarea({})
              setTimeout(()=>{
                setAlerta({})
         },3000)

             } catch (error) {
               console.log(error)
             }
   }

  const submitEmailColaborador = async (email) => {
    setCargando(true)
      try {
        const token = localStorage.getItem('token');
        if(!token) return
    
        const config = {
            headers: {
                "Content-Type" : "application/json",
                Authorization:  `Bearer ${token}` 
            }
        }
        const {data} = await clienteAxios.post(`${import.meta.env.VITE_BACKEND_URL}/api/projects/colaboradores`,{email},config)
       
      setColaborador(data)
      setAlerta({})

      } catch (error) {
         setAlerta({
           msg: error.response.data.msg,
           error: true
         })
      }finally{
        setCargando(false)
      }
  }


  const agregarCollabator = async (email)=> {

  
       try {
        const token = localStorage.getItem('token');
        if(!token) return
    
        const config = {
            headers: {
                "Content-Type" : "application/json",
                Authorization:  `Bearer ${token}` 
            }
        }
        const {data} = await clienteAxios.post(`${import.meta.env.VITE_BACKEND_URL}/api/projects/colaboradores/${project._id}`,email,config)
            setAlerta({
              msg : data.message,
              error : false
            })
            setColaborador({})

            setTimeout(()=>{
                  setAlerta({})
            },2000)
       
       } catch (error) {
          setAlerta({
            msg : error.response.data.message,
            error : true
          })
       }
  }

  const handleModalElminarColaborador = (colaborador) => {
      setModalEliminarColaborador(!modalEliminarColaborador)
  setColaborador(colaborador)
  }

  const truncateColaborator = async () => {
        try {
          const token = localStorage.getItem('token');
        if(!token) return
    
        const config = {
            headers: {
                "Content-Type" : "application/json",
                Authorization:  `Bearer ${token}` 
            }
        }
        const {data} = await clienteAxios.post(`${import.meta.env.VITE_BACKEND_URL}/api/projects/eliminar-colaborador/${project._id}`,{id : colaborador._id},config)
        
        const projectUpdate = {...project}
        projectUpdate.colaboradores = projectUpdate.colaboradores.filter(colaboradorState => colaboradorState._id !== colaborador._id )
       
        setProject(projectUpdate)

        setAlerta({
           msg : data.message,
           error : false
        })

        setColaborador({})

        setModalEliminarColaborador(false)

        setTimeout(() => {
           setAlerta({})
        },3000);

        } catch (error) {
          console.log(error.response)
        }
  }

  const completarTarea = async (id) => {
       try {
        const token = localStorage.getItem('token');
        if(!token) return
    
        const config = {
            headers: {
                "Content-Type" : "application/json",
                Authorization:  `Bearer ${token}` 
            }
        }
        const {data } = await clienteAxios.post(`${import.meta.env.VITE_BACKEND_URL}/api/tareas/estado/${id}`,{},config)
    
        setTarea({})
        setAlerta({})

        // socket
        
        socket.emit('cambiar estado',data)
       } catch (error) {
          console.log(error.response)
       }
  }

  const handleBuscador = () => {
       setBuscador(!buscador)
  }

  // fn de socket io STATE
const submitTareaProyecto = (tarea) => {
       //AGREGA LA TAREA AL STATE 
       const projectUpdate = {...project}
       projectUpdate.tareas =[...projectUpdate.tareas, tarea];
       setProject(projectUpdate);
}

const eliminarTarea = tarea => {
  const projectUpdate = {...project}
                projectUpdate.tareas = projectUpdate.tareas.filter(tareaState => tareaState._id !== tarea._id)
               setProject(projectUpdate)
           
}

const actualizarTareaProyecto = tarea => {
     
  const projectUpdate = {...project}
  projectUpdate.tareas = projectUpdate.tareas.map(tareaState => tareaState._id === tarea._id ? tarea : tareaState)
  setProject(projectUpdate)
}

const cambiarEstadoTarea = tarea=>{
  const projectUpdate = {...project}
  projectUpdate.tareas = projectUpdate.tareas.map(tareaState =>
 tareaState._id === tarea._id ? tarea : tareaState )
  
 setProject(projectUpdate)
}

const closeSectionProjects = ()=> {
   setProjects([]),
   setProject({}),
   setAlerta({})
}
    return (
        <ProjectContext.Provider
          value= {{
             projects,
           showAlert,
           alerta,
           submitProject,
           wantProject,
           project,
           cargando,
           deleteProject,
           modalFormularioTarea,
           handleModalTarea,
           submitTarea,
           handleModalEditarTarea,
           tarea,
           modalEliminarTarea,
           handleModalEliminarTarea,
           deleteTarea,
           submitEmailColaborador,
           colaborador,
           agregarCollabator,
           handleModalElminarColaborador,
           modalEliminarColaborador,
           truncateColaborator,
           completarTarea,
           buscador,
           handleBuscador,
           submitTareaProyecto,
           eliminarTarea,
           actualizarTareaProyecto,
           cambiarEstadoTarea,
           closeSectionProjects
          }}
        >
           {children}
        </ProjectContext.Provider>
    )
}

export {
    ProjectProvider
}

export default ProjectContext