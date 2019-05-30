import React, {Component, PureComponent} from "react"
import {getDateString} from '../../functions/date'

import {priorityStyle, priorityJSON} from '../../data/clientData'

class UserList extends Component {
	constructor(props) {
        super(props);
    }
    render (){
        let TasksList = this.props.TasksList
        console.log(this.props)
        let List = TasksList.map(((Task, index)=>{

            let TaskId = Task.id || ''
            let Description = Task.description || ''
            let fullDescription = Task.fullDescription || ''
            let date = getDateString(Task.StartDate) || ''
            let allottedTime = Task.allottedTime
            let priority = Task.priority
            let styleEl = priorityStyle[Task.priority]

            return (
                <a key={TaskId} href="#" className="list-group-item list-group-item-action" 
                    onClick = { () => {this.props.SelectTask(TaskId)} }
                >
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{Description}</h5>
                        <small className="text-muted">{date}</small>
                    </div>
                    <p className="mb-1">{fullDescription}</p>
                    <div className={styleEl}>Приоритет: {priorityJSON[priority]}</div>
                    <small>Отведённое время {allottedTime}</small>
                </a>
            )
        }))

        return (
            <div className="list-group">
                {List}
            </div>
        )
    }
}
export default UserList