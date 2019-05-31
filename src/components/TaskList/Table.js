import React, {Component} from "react"
import TaskRow from './TaskRow'

import {filters} from './filters'
import {sortParams} from '../../data/constants'

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

        const sortThStyle = { cursor: "pointer", borderLeft: "2px solid #dee2e6" }

        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th style={{borderLeft: "2px solid #dee2e6"}} scope="col">Описание задачи</th>
                        <th className="text-primary" style = {sortThStyle} scope="col" onClick={ ()=>{ this.sortFunction(sortParams.Date) } }>Дата</th>
                        <th className="text-primary" style = {sortThStyle} scope="col" onClick={ ()=>{ this.sortFunction(sortParams.Plane) } }>Планируемое время</th>
                        <th className="text-primary" style = {sortThStyle} scope="col" onClick={ ()=>{ this.sortFunction(sortParams.AllottedTime) } }>Затраченное время</th>
                        <th className="text-primary" style = {sortThStyle} scope="col" onClick={ ()=>{ this.sortFunction(sortParams.Priotity) } }>Приоритет</th>
                        <th className="text-primary" style = {sortThStyle} scope="col" onClick={ ()=>{ this.sortFunction(sortParams.Status) } }>Статус</th>
                    </tr>
                </thead>
                <tbody>
                    {TaskRows}
                </tbody>
            </table>
        )
    }

    sortFunction (sortParams) {
        const currentState = this.state;
        let reverse = false
        if (currentState.sortParam==sortParams) reverse = !currentState.reverse
        this.setState({
            filterPriotity: currentState.filterPriotity,
            sortParam: sortParams,
            reverse: reverse
        })
    }

}

export default TaskList