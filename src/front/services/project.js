import axios from "axios";

async function createProject(project, token) {
    console.log(project)
    try {
        let response = await axios.post('http://127.0.0.1:3001/api/add-project',
            project, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response
    } catch (error) {
        return error
    }
}

export default { createProject }