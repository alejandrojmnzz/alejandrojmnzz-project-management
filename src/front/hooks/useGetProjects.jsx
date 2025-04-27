import axios from "axios";
import useGlobalReducer from "./useGlobalReducer";

export async function useGetProjects() {
    const { store, dispatch } = useGlobalReducer()
    console.log("getProjects")
    try {
        let response = await axios.get(`http://127.0.0.1:3001/api/get-projects`,
            {
                headers: {
                    'Authorization': `Bearer ${store.token}`
                }
            }
        )
        console.log(response.data)
        return response.data

    } catch (error) {
        return
    }
}