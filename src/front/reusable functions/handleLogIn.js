import axios from 'axios';

export function handleLogIn(user) {
    const response = new Promise((resolve, reject) => {
        let data = axios.post(`http://localhost:3001/api/log-in`, {
            user: user,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        resolve(data)
    }).then((response) => {
        return response
    }).catch((error) => {
        return error.response.status
    })
    return response
}