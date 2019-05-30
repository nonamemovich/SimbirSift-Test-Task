import React, {Component} from "react"
import {ShowComponent, priorityJSON, priorityStyle, ExampleTask} from '../../data/clientData'
import {getDateString} from '../../functions/date'
import store from '../../store/index';

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
                        <h5 className="card-title">{getDateString(Task.StartDate)}</h5>
                        <hr/>
                        <p className="card-text">{Task.fullDescription}</p>
                        <hr/>
                        <h6 className="card-subtitle">Статус задачи {Task.state}</h6>
                        <hr/>
                        <a href="#" className="text-decoration-none" onClick={ (e)=>{ this.props.ShowTaskList() }}>Перейти к списку задач</a>
                    </div>
                </div>
            )
        } else {
            return <div> Данной задачи нет </div>
        }
    }
}

export default Task