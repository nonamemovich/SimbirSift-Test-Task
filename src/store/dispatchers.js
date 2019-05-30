import {ShowComponent} from '../data/clientData'
import { TaskList as LoadTaskList } from '../data/clientData'


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

        UpdateTask: (TaskList, newTask) => {
            return new Promise((resolve, reject)=>{
                setTimeout(() => {
                    // здесь будет отправка данных на сервер.
                    resolve()
                }, 100);
            }).then(
                reuslt =>
                {
                    let newTaskList= []
                    newTaskList = TaskList.map((Task)=>{
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

        onAddTask: (TaskList=[], newTask) => {
            let NewTaskList = TaskList.slice().push(newPoint);

            dispatch({
                type: 'ADD_TASK',
                payload: NewTaskList
            })
        },

        onRemoveTask: (TaskList=[], TaskIndex) => {
            let NewTaskList = TaskList.slice().splice(TaskIndex,1)

            dispatch({
                type: 'REMOVE_TASK',
                payload: NewTaskList
            })
        }
    }
}