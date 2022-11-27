import useProject from '../hooks/useProject'

const Colaborador = ({colaborador}) => {
    const {nombre,email} = colaborador
    const {handleModalElminarColaborador} = useProject()
  return (
    <div  className="border-b p-5 flex justify-between items-center" >
           <div>
               <p>{nombre}</p>
               <p className="text-sm text-gray-700">{email}</p>
           </div>
        
        <div>
            <button className="bg-red-700 uppercase font-bold text-sm rounded-lg px-4 py-3 text-white"
              onClick={() => handleModalElminarColaborador(colaborador)}
            >
                  Delete</button>
        </div>

    </div>
  )
}

export default Colaborador