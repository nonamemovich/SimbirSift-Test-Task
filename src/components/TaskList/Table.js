import React, {Component, PureComponent} from "react"
import TaskRow from './TaskRow'

import {filters} from './filters'
import {ViewTaskList, sortParams} from '../../data/constants'

import style from './style.css'

class TaskList extends Component {
	constructor(props) {
        super(props);

        this.state = {
            sortParam: sortParams.Date,
            reverse: false
        }
    }
    render (){
        let TasksList = this.props.TasksList
        let numb = 1
        
        if (this.state.sortParam) {
            TasksList = filters.Sort(TasksList, this.state.sortParam, this.state.reverse)
        }
        
        const TaskRows = TasksList.map(((Task, index)=>{
            return <TaskRow Task={Task} SelectTask={this.props.SelectTask} key={Task.id} numb={numb++}/>
        }))

        return (
            <table className="table table-hover">
                <thead>
                    <tr className={style.tableFilter}>
                        <th scope="col">#</th>
                        <th scope="col">Описание задачи</th>
                        <th scope="col" onClick={ ()=>{ this.sortByDate() } }>Дата</th>
                        <th scope="col" onClick={ ()=>{ this.sortByAllottedTime() } }>Время затраченное на выполнение</th>
                        <th scope="col">Статус</th>
                        <th scope="col" onClick={ ()=>{ this.sortByPriotity() } }>Приоритет </th>
                    </tr>
                </thead>
                <tbody>
                    {TaskRows}
                </tbody>
            </table>
        )
    }
    sortByDate () {
        const currentState = this.state;
        let reverse = false 
        if (currentState.sortParam==sortParams.Date) reverse = !currentState.reverse
        this.setState({
            filterPriotity: currentState.filterPriotity,
            sortParam: sortParams.Date,
            reverse: reverse
        })
    }

    sortByAllottedTime () {
        const currentState = this.state;
        let reverse = false 
        if (currentState.sortParam==sortParams.AllottedTime) reverse = !currentState.reverse
        this.setState({
            filterPriotity: currentState.filterPriotity,
            sortParam: sortParams.AllottedTime,
            reverse: reverse
        })
    }

    sortByPriotity () {
        const currentState = this.state;
        let reverse = false 
        if (currentState.sortParam==sortParams.Priotity) reverse = !currentState.reverse
        this.setState({
            filterPriotity: currentState.filterPriotity,
            sortParam: sortParams.Priotity,
            reverse: reverse
        })
    }
}

export default TaskList