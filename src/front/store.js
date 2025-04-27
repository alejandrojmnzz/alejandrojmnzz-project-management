
export const initialStore = () => {
  return {
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    token: null,
    projects: []
  }
}

export default function storeReducer(store, action = {}) {


  switch (action.type) {
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };

    case 'add_task':

      const { id, color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
    case 'sign_up':
      async function signUp() {
        try {
          let response = await axios.post(`http://127.0.0.1:3001/api/sign-up`, {
            user: action.payload.user,
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          return 'done'

        } catch (error) {
          return error
        }

      }
      signUp()
      return
    case 'log_in':

      return {
        ...store,
        token: action.payload.token
      }



    case 'get_projects':
    // async function getProjects() {
    //   try {
    //     let response = await axios.get(`http://127.0.0.1:3001/api/get-projects`,
    //       {
    //         headers: {
    //           'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0NDU4Mjg0MSwianRpIjoiM2I3MGU1YTQtYjcxYS00NzEwLWI2YjctOGY1MjFhZWI2ODVmIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjEiLCJuYmYiOjE3NDQ1ODI4NDEsImNzcmYiOiJjYzE1NzU4MS1mNWM3LTQ5NWEtOTVhMy1hNjRjYzcxYTllNWIiLCJleHAiOjE3NDQ1OTAwNDF9.WL9OHmjIY6oSIoEPekKxN8uckRsmGC7Wp6kLfWPbD8k'
    //         }
    //       }
    //     )
    //     return {
    //       ...store,
    //       projects: response.data
    //     };

    //   } catch (error) {
    //     return
    //   }
    // }
    // getProjects()
    // case 'add_project':
    //   async function addProject() {
    //     try {
    //       let response = await axios.post(`http://127.0.0.1:3001/api/add-project`,
    //         {
    //           headers: {
    //             'Authorization': 
    //           }
    //         }
    //       } 
    default:
      throw Error('Unknown action.');
  }
}
