import {Link} from 'react-router-dom'
const PreviewProject = ({project}) => {

 const {nombre,_id,cliente} = project

  return (
    <div className="border-b p-5 flex flex-col md:flex-row">
             <p className="flex-1">
                  {nombre}
                <span className="text-sm text-gray-500 uppercase ">{''} {cliente}</span>
             </p>
          
             <Link to={`${_id}`} 
             className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold"
             >  See Project     </Link>
             
       

    </div>
  )
}

export default PreviewProject