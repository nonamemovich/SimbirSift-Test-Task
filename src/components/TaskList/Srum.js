import React, {Component, PureComponent} from "react"
import {getDateString} from '../../functions/date'
import {taskStatus} from '../../data/clientData'
import store from '../../store/index'
import style from './style.css'

class TaskEl extends Component {
	constructor(props) {
        super(props);
    }
    render () {
        let Task = this.props.Task
        let eventOptions = this.props.eventOptions

        return (
            <a key={Task.id} href="#" className="list-group-item list-group-item-action"
                draggable
                onDragStart = { (e) => { this.props.onDragStart(e, Task, eventOptions) } }
                onDragEnd = { (e) => { this.props.onDragEnd(e, eventOptions) } }
                onClick = { () => {this.props.SelectTask(Task.id)} }
                >
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{Task.description}</h5>
                    <small className="text-muted">{ getDateString(Task.StartDate)}</small>
                </div>
            </a>
        )
    }
}

class Srum extends Component {
	constructor(props) {
        super(props);
        this.onDragStart=this.onDragStart.bind(this)
        this.onDragEnter=this.onDragEnter.bind(this)
        this.onDragEnd=this.onDragEnd.bind(this)
    }

    render () {
        let eventOptions = {
            Task: null,
            taskStatus: null
        }
        let state = store.getState()
        let doneList = []
        let planeList = []
        let doingList = []

        state.TasksList.map((Task)=>{
            if (Task.status=='done') {
                doneList.push(Task)
            } else if (Task.status=='plane') {
                planeList.push(Task)
            } else if (Task.status=='doing') {
                doingList.push(Task)
            } 
        })

        return (

            <div>
                <table className="table">
                    <thead>
                        <tr >
                            <th className={style.w250px}  scope="col"><h4>План</h4></th>
                            <th className='w250px'  scope="col"><h4>В процессе</h4></th>
                            <th className='w250px'  scope="col"><h4>Готово</h4></th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr>
                            <td className='w250px' onDragEnter={ (e) => this.onDragEnter(e, 'plane', eventOptions)}>
                            {planeList.map((Task)=>{
                                return (
                                    <TaskEl key={Task.id} Task={Task} onDragStart={this.onDragStart} onDragEnd={this.onDragEnd} onClick={this.onClick} eventOptions={eventOptions}/>
                                )
                            })}
                            </td>

                            <td className='w250px' onDragEnter={ (e) => this.onDragEnter(e, 'doing', eventOptions)}>
                            {doingList.map((Task)=>{
                                return (
                                    <TaskEl key={Task.id}
                                    Task={Task} 
                                    onDragStart={this.onDragStart} 
                                    onDragEnd={this.onDragEnd} 
                                    onClick={this.onClick}
                                    eventOptions={eventOptions}/>
                                )
                            })}
                            </td>

                            <td className='w250px' onDragEnter={ (e) => this.onDragEnter(e, 'done', eventOptions)}>
                            {doneList.map((Task)=>{
                                return (
                                    <TaskEl key={Task.id} Task={Task} onDragStart={this.onDragStart} onDragEnd={this.onDragEnd} onClick={this.onClick} eventOptions={eventOptions}/>
                                )
                            })}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

    onDragStart (e, Task, eventOptions) {
        eventOptions.Task = Task
    };
    
    onDragEnter (e, taskStatus, eventOptions) {
        eventOptions.taskStatus = taskStatus
    };
    
    onDragEnd (e, eventOptions) {
        if (!eventOptions.taskStatus) return
        let state = store.getState()

        let NewTask = Object.assign( {}, eventOptions.Task, {status: eventOptions.taskStatus})
        this.props.UpdateTask(state.TasksList, NewTask)

        eventOptions ={
            Task: null,
            taskStatus: null
        }
    };
}

export default Srum