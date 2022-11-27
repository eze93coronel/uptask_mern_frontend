import useProject from '../hooks/useProject'
import useAuth from '../hooks/useAuth'

const useAdmin = () => {
    const {project} = useProject()
    const {auth} = useAuth()

    return project.creador === auth._id
}

export default useAdmin