import { createStore } from 'redux'

let ShowComponent = {
    TaskList: 0,
    Task: 1,
    LoginForm: 2
}

let initialState = {
    TasksList: [],
    ShowComponent: ShowComponent.TaskList,
    TaskId: null,
    Authorisation: {
        login: localStorage.getItem("login") || "",
        password: localStorage.getItem("password") || ""
    },
    ModalStore: {
        show: false,
        showWindow: null,
        Task: null
    }
}

var store = createStore((state = initialState, action)=>{
    let newState = Object.assign({}, state);

    switch (action.type) {
        case 'ADD_TASK':
            newState.TasksList = action.payload
            return newState
        case 'REMOVE_TASK':
            newState.TasksList = action.payload
            newState.ShowComponent = ShowComponent.TaskList
            return newState
        case 'UPDATE_TASK': 
            newState.TasksList = action.payload
            return newState
        case 'FETCH_TASKS':
            newState.TasksList = action.payload
            return newState
        case 'LOAD_TASKS':
            newState.TasksList = action.payload
            return newState
        case 'SHOW_COMPONENT':
            newState.ShowComponent = action.payload
            return newState
        case 'SHOW_TASK':
            newState.ShowComponent = ShowComponent.Task
            newState.TaskId = action.payload
            return newState
        case 'SHOW_DEFAULT_COMPONENT': 
            newState.ShowComponent = ShowComponent.LoginForm
            return newState
        case 'LOGIN':
            newState.Authorisation = true
            newState.ShowComponent = ShowComponent.TaskList
            newState.TasksList = action.payload.TasksList
            newState.Authorisation = {
                login: action.payload.login,
                password: action.payload.password
            }
            return newState
        case 'LOGOFF':
            newState.Authorisation = {
                login: '',
                password: ''
            }
            return newState
        case 'SHOW_MODAL':
            newState.ModalStore = {
                show: true,
                showWindow: action.payload.showWindow,
                Task: action.payload.Task
            }
            return newState
        case 'CLOSE_MODAL':
            newState.ModalStore = {
                show: false,
                showWindow: null,
                Task: null
            }
            return newState
        default:
            return state
    }
});

export default store