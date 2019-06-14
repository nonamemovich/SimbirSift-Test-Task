import React, {Component} from "react"
import store from '../../store/index'

import {getDateObject, getTime, getDate} from '../../functions/date'
import {priorityJSON, taskStatus} from '../../data/clientData'

class TaskWindow extends Component {
    constructor(props) {
        super(props);

        this.descriptionRef = React.createRef()
        this.fullDescriptionRef = React.createRef()
        this.startTimeRef = React.createRef()
        this.startDateRef = React.createRef()
        this.planeTimeRef = React.createRef()
        this.allottedTimeRef = React.createRef()
        this.priorityRef = React.createRef()
        this.statusRef = React.createRef()
        this.invalidFeedback = React.createRef()
    }

    render() {
        let storeState = store.getState()
        let Task = storeState.ModalStore.Task || null

        let buttonAction = ''
        let closeButton = <button type="button" className="btn btn-secondary" data-dismiss="modal" 
            onClick={ ()=>{this.props.CloseModalWindow()} }>Закрыть</button>
        
        let id = ''
        let description = ''
        let fullDescription = ''
        let startTime = ''
        let startDate = ''
        let planeTime = ''
        let allottedTime = ''
        let priority = ''
        let status = ''

        let ModalAction = ''

        if (!Task) {
            priority = 'low'
            status = 'plane'
            buttonAction = <button type="submit" className="btn btn-primary" data-dismiss="modal" 
            onClick={ ()=>{this.addTask() } }>Добавить</button>
            ModalAction = 'Добавить задачу'

        } else {
            id = Task.id
            description = Task.description
            fullDescription = Task.fullDescription
            planeTime = Task.planeTime
            allottedTime = Task.allottedTime

            startDate = getDate(Task.StartDate)
            startTime = getTime(Task.StartDate)

            priority = Task.priority
            status = Task.status

            buttonAction = <button type="button" className="btn btn-primary" data-dismiss="modal" 
            onClick={ ()=>{this.updataTask(Task.id)} }>Обновить</button>
            ModalAction = 'Обновить задачу'
        }

        return (
            <div className="modal-dialog" role="document">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">{ModalAction}</h5>
                    </div>
                    <div className="modal-body">

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Название задачи</span>
                            </div>
                            <input type="text" ref = {this.descriptionRef}
                                className="form-control" required
                                placeholder="обязательное поле" defaultValue={description}/>
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Описание задачи</span>
                            </div>
                            <textarea required ref = {this.fullDescriptionRef} 
                                className="form-control" 
                                placeholder="обязательное поле"
                                defaultValue={fullDescription}></textarea>
                        </div>
                        
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Дата начала</span>
                            </div>
                            <input required type="time" ref = {this.startTimeRef}
                                className="form-control" 
                                placeholder="обязательное поле" defaultValue={startTime}/>
                            <input required type="date" ref = {this.startDateRef}
                                className="form-control" 
                                placeholder="обязательное поле" defaultValue={startDate}/>
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Планируемое время</span>
                            </div>
                            <input required type="text" className="form-control" 
                                ref = {this.planeTimeRef}
                                placeholder="обязательное поле" defaultValue={planeTime}/>
                        </div>

                        
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Затраченное время</span>
                            </div>
                            <input required type="text" className="form-control" 
                                ref = {this.allottedTimeRef}
                                placeholder="обязательное поле" defaultValue={allottedTime}/>
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Приоритет</span>
                            </div>
                            <select className="custom-select"
                            ref = {this.priorityRef}
                            defaultValue={priority} >
                                <option value="low">{priorityJSON.low}</option>
                                <option value="medium">{priorityJSON.medium}</option>
                                <option value="hight">{priorityJSON.hight}</option>
                            </select>
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Статус</span>
                            </div>
                            <select className="custom-select"
                            ref = {this.statusRef}
                            defaultValue={status} >
                                <option value="plane">{taskStatus.plane}</option>
                                <option value="done">{taskStatus.done}</option>
                                <option value="doing">{taskStatus.doing}</option>
                            </select>
                        </div>
                        <div ref = {this.invalidFeedback} className="invalid-feedback">Необходимо заполнить все обязательные поля</div>
                    </div>
                    
                    <div className="modal-footer">
                        {buttonAction}
                        {closeButton}
                    </div>

                </div>
            </div>
        )
    }

    addTask() {

        let description = this.descriptionRef.current.value || ''
        let fullDescription = this.fullDescriptionRef.current.value || ''

        let startTime = this.startTimeRef.current.value || ''
        let startDate = this.startDateRef.current.value || ''

        let planeTime = this.planeTimeRef.current.value || ''
        let allottedTime = this.allottedTimeRef.current.value || ''
        let priority = this.priorityRef.current.value || ''
        
        let status = this.statusRef.current.value || ''

        if (!description || !fullDescription || !allottedTime) {
            this.invalidFeedback.current.style.display = 'block'
        } else {
            this.props.onAddTask({
                description: description,
                fullDescription: fullDescription,
                StartDate: startDate+" "+startTime,
                planeTime: planeTime,
                allottedTime: allottedTime,
                priority: priority,
                status: status
            }).then(
                res => {
                    this.props.CloseModalWindow()
                }
            )
        }
    }

    updataTask(TaskId) {
        let description = this.descriptionRef.current.value || ''
        let fullDescription = this.fullDescriptionRef.current.value || ''

        let startTime = this.startTimeRef.current.value || ''
        let startDate = this.startDateRef.current.value || ''

        let planeTime = this.planeTimeRef.current.value || ''
        let allottedTime = this.allottedTimeRef.current.value || ''
        let priority = this.priorityRef.current.value || ''
        
        let status = this.statusRef.current.value || ''

        if (!description || !fullDescription || !allottedTime) {
            this.invalidFeedback.current.style.display = 'block'
        } else {
            this.props.UpdateTask({
                id: TaskId,
                description: description,
                fullDescription: fullDescription,
                StartDate: startDate+" "+startTime,
                planeTime: planeTime,
                allottedTime: allottedTime,
                priority: priority,
                status: status
            }).then(
                res =>{ 
                    this.props.CloseModalWindow()
                }
            )
        }
    }
}

export default TaskWindow