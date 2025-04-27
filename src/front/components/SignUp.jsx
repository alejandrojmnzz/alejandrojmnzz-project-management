import { useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { handleSignUp } from "../reusable functions/handleSignUp"

function SignUp() {
    const [user, setUser] = useState({})
    const { store, dispatch } = useGlobalReducer()

    function handleChange({ target }) {
        setUser({
            ...user,
            [target.name]: target.value
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const response = await handleSignUp(user)
        console.log(response)
        if (response.status === 201) {
            alert("User created successfully")
        } else {
            alert("Error creating user")
        }

    }

    return (
        <div className="sign-up-container">
            <h1>Sign Up</h1>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" className="form-control" placeholder="Enter your username" required onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" className="form-control" placeholder="Enter your email" required onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" className="form-control" placeholder="Enter your password" required onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp