import React, {Component} from "react"
import store from '../../store/index'

import {getDateString} from '../../functions/date'

import {ModalWindows} from '../../data/constants'
import {ShowComponent, priorityJSON, priorityStyle, taskStatus} from '../../data/clientData'

class Task extends Component {
	constructor(props) {
		super(props);
    }
    render () {
        let state = store.getState();
        let Task = null

        for( let key in state.TasksList) {
            if (state.TasksList[key].id==state.TaskId) {
                Task = state.TasksList[key]
                break
            }
        }
        
        let EndDate = new Date()
        EndDate.setHours(Task.StartDate.getHours() + Task.allottedTime)

        if (!!Task) {
            return (
                <div className="card w-75" id={Task.id}>
                    <h5 className="card-header">{Task.description}</h5>
                    <div className="card-body">
                        <h5 className="card-title">{getDateString(Task.StartDate)}
                        </h5>
                        <hr/>
                        <p className="card-text">{Task.fullDescription}</p>
                        <hr/>
                        <h6 className="card-subtitle">Планируемое время: {Task.planeTime}</h6>
                        <hr/>
                        <h6 className="card-subtitle">Затраченное время: {Task.allottedTime}</h6>
                        <hr/>
                        <h6 className="card-subtitle">Статус задачи: {taskStatus[Task.status]}</h6>
                        <hr/>
                        <h6 className="card-subtitle">Приоритет: {priorityJSON[Task.priority]}</h6>
                        <hr/>
                        <button type="button" className="btn btn-outline-primary mb-1" onClick={ (e)=>{ this.props.ShowModalWindow(ModalWindows.TaskModal, Task) }}>Редактировать</button>
                        <a href="#" className="text-decoration-none float-right" onClick={ (e)=>{ this.props.ShowTaskList() }}>Перейти к списку задач</a>
                    </div>
                </div>
            )
        } else {
            return <div> Данной задачи нет </div>
        }
    }
}

export default Task