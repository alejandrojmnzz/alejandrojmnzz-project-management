import { useState, useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer"

export function Project() {
    const { store, dispatch } = useGlobalReducer()


    useEffect(() => {
        dispatch({
            type: "get_projects"
        })
    }, [])

    useEffect(() => {
        console.log(store.projects)
    }, [store.projects])


    const [projects, setProjects] = useState({})
    return (
        <div>
            <h1>h</h1>
        </div>
    )
}