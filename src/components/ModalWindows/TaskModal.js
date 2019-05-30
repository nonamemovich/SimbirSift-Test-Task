import React, {Component} from "react"
import {getDateString, getDateObject} from '../../functions/date'
import {priorityJSON, taskStatus} from '../../data/clientData'

class TaskWindow extends Component {
    constructor(props) {
        super(props);

        this.descriptionRef = React.createRef()
        this.fullDescriptionRef = React.createRef()
        this.startTimeRef = React.createRef()
        this.startDateRef = React.createRef()
        this.allottedTimeRef = React.createRef()
        this.priorityRef = React.createRef()
        this.statusRef = React.createRef()
        this.invalidFeedback = React.createRef()
    }

    render() {

        let Task = this.props.Task

        let buttonAction = ''
        let closeButton = <button type="button" className="btn btn-secondary" data-dismiss="modal" 
        onClick={ ()=>{this.props.closeModalWindow()} }>Закрыть</button>
        
        let id = ''
        let description = ''
        let fullDescription = ''
        let StartTime = ''
        let StartDate = ''
        let allottedTime = ''
        let priority = ''
        let status = ''
        
        if (!Task) {
            priority = 'low'
            status = 'plane'
            buttonAction = <button type="submit" className="btn btn-primary" data-dismiss="modal" 
            onClick={ ()=>{this.addTask() } }>Добавить</button>
        } else {
            id = Task.id
            description = Task.description
            fullDescription = Task.fullDescription
            StartDate = getDateString(Task.StartDate)
            priority = Task.priority
            status = Task.status

            buttonAction = <button type="button" className="btn btn-primary" data-dismiss="modal" 
            onClick={ ()=>{this.props.closeModalWindow()} }>Обновить</button>
        }

        return (
            <div className="modal-dialog" role="document">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">Обновить задачу</h5>
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
                                placeholder="обязательное поле" defaultValue={StartTime}/>
                            <input required type="date" ref = {this.startDateRef}
                                className="form-control" 
                                placeholder="обязательное поле" defaultValue={StartDate}/>
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Отведённое время</span>
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

        let StartTime = this.startTimeRef.current.value || ''
        let StartDate = this.startDateRef.current.value || ''

        let allottedTime = this.allottedTimeRef.current.value || ''
        let priority = this.priorityRef.current.value || ''
        
        let status = this.statusRef.current.value || ''

        if (!description || !fullDescription || !allottedTime) {
            this.invalidFeedback.current.style.display = 'block'
        } else {
            this.props.onAddTask({
                description: description,
                fullDescription: fullDescription,
                StartDate: getDateObject(StartTime, StartDate),
                allottedTime: allottedTime,
                priority: priority,
                status: status
            })
            this.props.CloseModalWindow()
        }
    }
}

export default TaskWindow