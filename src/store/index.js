import { createStore } from 'redux'
import { TaskList } from '../data/clientData'

let ShowComponent = {
    TaskList: 0,
    Task: 1,
    LoginForm: 2
}

let StartDate = new Date()

let initialState = {
    TasksList: TaskList,
    ShowComponent: ShowComponent.TaskList,
    TaskId: null,
    Authorisation: true,
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
            return newState
        case 'UPDATE_TASK': 
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
            return newState
        case 'LOGOFF':
            newState.Authorisation = false
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