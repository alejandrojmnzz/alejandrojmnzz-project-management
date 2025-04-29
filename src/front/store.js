
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
    token: null || localStorage.getItem('token'),
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

    case 'log_in':
      localStorage.setItem('token', action.payload.token)
      return {
        ...store,
        token: action.payload.token
      }



    case 'get_projects':

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
