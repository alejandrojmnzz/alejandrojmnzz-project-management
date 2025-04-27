import axios from "axios"

export async function handleSignUp(user) {
    try {
        let response = await axios.post(`http://127.0.0.1:3001/api/sign-up`, {
            user: user,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(response)
        return response
    } catch (error) {
        return error
    }
}