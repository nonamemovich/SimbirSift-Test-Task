import {ShowComponent} from '../data/clientData'
import { TaskList as LoadTaskList } from '../data/clientData'

import store from '../store/index'

export default (dispatch) => {
    return {
        Login:(userName, passwword)=>{
            
            dispatch({
                type: 'LOGIN'
            })
        },

        LogOff:()=>{

            dispatch({
                type: 'LOGOFF'
            })
        },

        UpdateTask: (newTask) => {
            return new Promise((resolve, reject)=>{
                setTimeout(() => {
                    // здесь будет отправка данных на сервер.
                    resolve()
                }, 100);
            }).then(
                reuslt =>
                {
                    let state = store.getState()
                    const TasksList = state.TasksList

                    let newTaskList= []
                    newTaskList = TasksList.map((Task)=>{
                        if(newTask.id==Task.id) {
                            return newTask
                        }
                        return Task
                    })

                    dispatch({
                        type: 'UPDATE_TASK',
                        payload: newTaskList
                    })
                },
                error => {
                    console.warn(error)
                }
            )
        },

        RefreshTasks:()=>{
            return new Promise((resolve, reject)=>{
                setTimeout(() => {
                    // сюда встраивать загрузку данных с сервера
                    resolve()
                }, 5000);
            }).then(
                reuslt => 
                {
                    let TaskList = []
                    TaskList = Object.assign({}, LoadTaskList)
                    dispatch({
                        type: 'FETCH_TASKS',
                        payload: TaskList
                    })
                },
                error => {
                    console.warn(error)
                }
            )
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
            let state = store.getState()
            const TasksList = state.TasksList

            newTask.id = TasksList.length+1

            let NewTasksList = TasksList.slice();
            NewTasksList.push(newTask)
            dispatch({
                type: 'ADD_TASK',
                payload: NewTasksList
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

        onRemoveTask: (TaskIndex) => {
            let NewTaskList = TaskList.slice().splice(TaskIndex,1)

            dispatch({
                type: 'REMOVE_TASK',
                payload: NewTaskList
            })
        }
    }
}