import { useState, useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { useGetProjects } from "../hooks/useGetProjects"

export function Project() {
    const { store, dispatch } = useGlobalReducer()
    // const [project, setProject] = useState({})
    const project = useGetProjects()


    useEffect(() => {
        async function fetchProject() {
            return
        }
        console.log(fetchProject())
    }, [])



    const [projects, setProjects] = useState({})
    return (
        <div>
            <h1>h</h1>
        </div>
    )
}
