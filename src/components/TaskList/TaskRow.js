import React, {Component} from "react"
import {taskStatus, priorityJSON, priorityStyle} from '../../data/clientData'

import {getDateString} from '../../functions/date'

import style from './style.css'

class TaskRow extends Component {
	constructor(props) {
		super(props);
    }
    
    render () {
        let Task = this.props.Task
        let EndDate = new Date()
        let numb = this.props.numb

        EndDate.setHours(Task.StartDate.getHours() + Task.allottedTime)
        let priorityElementStyle = "alert " + priorityStyle[Task.priority]
        return (
            <tr className={style.tableRow} onClick={ (e)=>{ this.SelectTask(e, Task.id) }}>
                <td> {numb} </td>
                <td> {Task.description} </td>
                <td> {getDateString(Task.StartDate)} </td>
                <td> {Task.planeTime} </td>
                <td> {Task.allottedTime} </td>
                <td> <div className = {priorityElementStyle} > {priorityJSON[Task.priority]}</div></td>
                <td> {taskStatus[Task.status]} </td>
            </tr>
        )

    }
    
    SelectTask(e, TaskId) {
        this.props.SelectTask(TaskId)
    }
}

export default TaskRow