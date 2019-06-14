import React, {Component} from "react"
import {taskStatus, priorityJSON, priorityStyle} from '../../data/clientData'

import {getDateString} from '../../functions/date'

import style from './Style.css'

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
                <td className={style.tableCol+" align-middle"}> {numb} </td>
                <td className={style.tableCol+" align-middle"}> {Task.description} </td>
                <td className={style.tableCol+" align-middle"}> {getDateString(Task.StartDate)} </td>
                <td className={style.tableCol+" align-middle"}> {Task.planeTime} </td>
                <td className={style.tableCol+" align-middle"}> {Task.allottedTime} </td>
                <td className={style.tableCol+" align-middle"}> 
                    <div className = {priorityElementStyle+" "+style.margin0px} > {priorityJSON[Task.priority]}</div>
                </td>
                <td className="align-middle"> {taskStatus[Task.status]} </td>
            </tr>
        )
    }
    
    SelectTask(e, TaskId) {
        this.props.SelectTask(TaskId)
    }
}

export default TaskRow