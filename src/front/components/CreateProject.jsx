import { useState } from "react"

export function CreateProject() {
    const [project, setProject] = useState({})

    function handleChange({ target }) {
        setProject({
            ...project,
            [target.name]: target.value
        })
    }
    return (
        <>
            <form>
                <label>Name</label>
                <input type="text" name="name" className="form-control" placeholder="Project name" onChange={handleChange} />
                <label>Description</label>
                <input type="text" name="description" className="form-control" placeholder="Project description" onChange={handleChange} />
            </form>
        </>
    )
}