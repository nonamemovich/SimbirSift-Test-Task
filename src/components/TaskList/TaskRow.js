import React, {Component, PureComponent} from "react"
import {ShowComponent, priorityJSON, priorityStyle} from '../../data/clientData'

import style from './style.css'

function getDateString(DateJsObj = new Date() ) {
    let day = DateJsObj.getDate()
    let month = DateJsObj.getMonth()
    let year = DateJsObj.getFullYear()
    let hour = DateJsObj.getHours()
    let minut = DateJsObj.getMinutes()

    return day+'.'+month+'.'+year+' '+hour+':'+minut
}

class TaskRow extends Component {
	constructor(props) {
		super(props);
    }
    
    render () {
        let Task = this.props.Task
        let EndDate = new Date()
        let numb = this.props.numb

        EndDate.setHours(Task.StartDate.getHours() + Task.allottedTime)

        return (
            <tr className={style.tableRow} onClick={ (e)=>{ this.SelectTask(e, Task.id) }}>
                <td> {numb} </td>
                <td> {Task.description} </td>
                <td> {getDateString(Task.StartDate)} </td>
                <td> {Task.allottedTime} </td>
                <td> {getDateString(EndDate)} </td>
                <td> <div className = {priorityStyle[Task.priority]} > {priorityJSON[Task.priority]}</div></td>
            </tr>
        )

    }
    
    SelectTask(e, TaskId) {
        this.props.SelectTask(TaskId)
    }
}

export default TaskRow