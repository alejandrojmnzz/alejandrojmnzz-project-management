import { useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer"
import axios from "axios"

function LogIn() {
    const [user, setUser] = useState({})
    const { store, dispatch } = useGlobalReducer()

    function handleLogIn() {

        const response = new Promise((resolve, reject) => {
            let data = axios.post(`http://localhost:3001/api/log-in`,
                user,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            resolve(data)
        }).then((response) => {
            dispatch({
                type: "log_in",
                payload: { token: response.data.token }
            })
            return
        }).catch((error) => {
            return error
        })
        return response
    }

    function handleChange({ target }) {
        setUser({
            ...user,
            [target.name]: target.value

        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        handleLogIn()
    }
    return (
        <div className="login-container">
            <h1>Log In</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input onChange={handleChange} type="text" id="email" name="email" className="form-control" placeholder="Enter your email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input onChange={handleChange} type="password" id="password" name="password" className="form-control" placeholder="Enter your password" required />
                </div>
                <button type="submit" className="btn btn-primary">Log In</button>
            </form>
        </div>
    )
}

export default LogIn