import { useState } from "react"
import projectServices from "../services/project"
import useGlobalReducer from "../hooks/useGlobalReducer"


export function CreateProject() {
    const { store, dispatch } = useGlobalReducer()
    const [project, setProject] = useState({})

    function handleChange({ target }) {
        setProject({
            ...project,
            [target.name]: target.value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        const formData = new FormData()

        // for (let key in project) {
        //     formData.append(key, project[key])
        // }\
        console.log(project.image)
        formData.append('name', project.name)
        formData.append('description', project.description)
        formData.append('image', project.image)
        projectServices.createProject(formData, store.token)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input type="text" name="name" className="form-control" placeholder="Project name" onChange={handleChange} />
                <label>Description</label>
                <input type="text" name="description" className="form-control" placeholder="Project description" onChange={handleChange} />
                <lalbel>Image (optional)</lalbel>
                <input type="file" name="image" onChange={({ target }) => setProject({ ...project, image: target.files[0] })} />

                <button type="submit">Submit</button>
            </form>
        </>
    )
}