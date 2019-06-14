import { ShowComponent } from '../data/clientData'
import { TaskList as LoadTaskList } from '../data/clientData'

import { getDateObjectFromStr } from '../functions/date'

import store from '../store/index'

const serverUrl = "http://"+window.location.hostname+":3000"

export default (dispatch) => {
    return {
        Login:(userName, password)=>{
            fetch(serverUrl+"/login?"+"login="+userName+"&password="+password,
            {
                method: "get"
            })
            .then(
                response => {
                    return response.json()
                }
            ).then(responseAsJson=>{
                if(responseAsJson.TasksList) {
                    responseAsJson.TasksList.map((Task)=>{
                        Task.StartDate = getDateObjectFromStr(Task.StartDate)
                        return Task
                    })

                    localStorage.setItem("login",userName)
                    localStorage.setItem("password",password)

                    dispatch({
                        type: 'LOGIN',
                        payload: {
                            TasksList: responseAsJson.TasksList,
                            login: userName,
                            password: password
                        }
                    })
                }
            })
        },

        LogOff:()=>{


            dispatch({
                type: 'LOGOFF'
            })
        },

        UpdateTask: (newTask) => {
            let storeState = store.getState()
            let userName = storeState.Authorisation.login
            let password = storeState.Authorisation.password
            let urlParams = ""
            urlParams = urlParams+"&id="+encodeURI(newTask.id)
            urlParams = urlParams+"&description="+encodeURI(newTask.description)
            urlParams = urlParams+"&fullDescription="+encodeURI(newTask.fullDescription)
            urlParams = urlParams+"&StartDate="+encodeURI(newTask.StartDate)
            urlParams = urlParams+"&planeTime="+encodeURI(newTask.planeTime)
            urlParams = urlParams+"&allottedTime="+encodeURI(newTask.allottedTime)
            urlParams = urlParams+"&priority="+encodeURI(newTask.priority)
            urlParams = urlParams+"&status="+encodeURI(newTask.status)

            return new Promise((resolve)=>{
                fetch(serverUrl+"/updateTask?"+"login="+userName+"&password="+password+urlParams,
                {
                    method: "post"
                })
                .then(
                    response => {
                        return response.json()
                    }
                ).then(responseAsJson=>{

                    if(responseAsJson.TaskUpdated) {
                        let TaskList= responseAsJson.TasksList.map((Task)=>{
                            Task.StartDate = getDateObjectFromStr(Task.StartDate)
                            return Task
                        })
                        dispatch({
                            type: 'UPDATE_TASK',
                            payload:  TaskList,
                        })
                    }
                    resolve()
                })
            })
        },

        RefreshTasks:()=>{
            let storeState = store.getState()
            let userName = storeState.Authorisation.login
            let password = storeState.Authorisation.password

            fetch("http://"+window.location.hostname+':3000/login?'+'login='+userName+'&password='+password,
            {
                method: "get"
            })
            .then(
                response => {
                    return response.json()
                }
            ).then(responseAsJson=>{
                if(responseAsJson.TasksList) {
                    let TasksList= responseAsJson.TasksList.map((Task)=>{
                        Task.StartDate = getDateObjectFromStr(Task.StartDate)
                        return Task
                    })
                    dispatch({
                        type: 'FETCH_TASKS',
                        payload: TasksList
                    })
                } else {

                }
            }, error=>{
                console.warn(error)
            })
        },

        ShowTaskList:()=>{

            dispatch({
                type: 'SHOW_COMPONENT',
                payload: ShowComponent.TaskList
            })
        },

        ShowLoginForm:()=>{

            dispatch({
                type: 'SHOW_COMPONENT',
                payload: ShowComponent.LoginForm
            })
        },

        SelectTask:(TaskId) =>{

            dispatch({
                type: 'SHOW_TASK',
                payload: TaskId
            })
        },

        onAddTask: (newTask) => {
            let storeState = store.getState()
            let userName = storeState.Authorisation.login
            let password = storeState.Authorisation.password
            let urlParams = ""

            urlParams = urlParams+"&description="+encodeURI(newTask.description)
            urlParams = urlParams+"&fullDescription="+encodeURI(newTask.fullDescription)
            urlParams = urlParams+"&StartDate="+encodeURI(newTask.StartDate)
            urlParams = urlParams+"&planeTime="+encodeURI(newTask.planeTime)
            urlParams = urlParams+"&allottedTime="+encodeURI(newTask.allottedTime)
            urlParams = urlParams+"&priority="+encodeURI(newTask.priority)
            urlParams = urlParams+"&status="+encodeURI(newTask.status)

            return new Promise((resolve)=>{
                fetch(serverUrl+"/addTask?"+"login="+userName+"&password="+password+urlParams,
                {
                    method: "post"
                })
                .then(
                    response => {
                        return response.json()
                    }
                ).then(responseAsJson=>{

                    if(responseAsJson.TasksList) {
                        let TaskList= responseAsJson.TasksList.map((Task)=>{
                            Task.StartDate = getDateObjectFromStr(Task.StartDate)
                            return Task
                        })
                        dispatch({
                            type: 'ADD_TASK',
                            payload:  TaskList,
                        })
                    }
                    resolve()
                })
            })
        },

        ShowModalWindow: (showWindow, Task=null)=> {
            dispatch({
                type: 'SHOW_MODAL',
                payload: {
                    showWindow: showWindow, 
                    Task: Task
                }
            })
        },

        CloseModalWindow: ()=> {
            dispatch({
                type: 'CLOSE_MODAL'
            })
        },

        onRemoveTask: (TaskId) => {
            let storeState = store.getState()
            let userName = storeState.Authorisation.login
            let password = storeState.Authorisation.password
            let urlParams = ""

            urlParams = urlParams+"&TaskId="+TaskId

            return new Promise((resolve)=>{
                fetch(serverUrl+"/removeTask?"+"login="+userName+"&password="+password+urlParams,
                {
                    method: "post"
                })
                .then(
                    response => {
                        return response.json()
                    }
                ).then(responseAsJson=>{
                    if(responseAsJson.TasksList) {
                        let TasksList= responseAsJson.TasksList.map((Task)=>{
                            Task.StartDate = getDateObjectFromStr(Task.StartDate)
                            return Task
                        })
                        dispatch({
                            type: 'REMOVE_TASK',
                            payload: TasksList
                        })
                    }
                    resolve()
                })
            })
        }
    }
}