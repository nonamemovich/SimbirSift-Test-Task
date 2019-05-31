import React, {Component, PureComponent} from "react"
import Filter from './Filter'
import Table from './Table'
import UserList from './UserList'
import Srum from './Srum'

import store from '../../store/index';
import {priorityJSON,} from '../../data/clientData'                                  ///
import {ViewTaskList, sortParams, ModalWindows} from '../../data/constants'

import {filters} from './filters'

// table подробный список
// user list название статус
// scrum доска

let setIntervalId =''

class TaskList extends Component {
	constructor(props) {
        super(props);

        this.state = {
            filterPriotity: null,
            sortParam: sortParams.Date,
            reverse: false,
            viewTaskList: ViewTaskList.table
        }

        this.filterByPriotity = this.filterByPriotity.bind(this)
    }

    componentWillMount() {
        setIntervalId = setInterval(() => {
            console.debug('call RefreshTasks from interval')
            this.props.RefreshTasks()
        }, 5000);
    }

    componentWillUnmount () {
        clearInterval(setIntervalId)
        console.debug('unmount interval for updateTask')
    }

    render () {
        let state       = store.getState()
        let TasksList   = state.TasksList
        let filterTag   = ''

        // отфильтровать TaskList
        if (this.state.filterPriotity) {
            TasksList = filters.ByPriotity(TasksList, this.state.filterPriotity)

            filterTag = <button type="button" className="btn btn-primary" aria-label="Close" onClick={ ()=>{ this.removeFilter() } }>
                {priorityJSON[this.state.filterPriotity]}<span aria-hidden="true">&times;</span>
            </button>
        }
        
        let tableNavActive = "nav-link"
        let userListNavActive = "nav-link"
        let scrumTableNavActive = "nav-link"
        let TaskContainer = ''
        if (this.state.viewTaskList== ViewTaskList.table) {
            tableNavActive = tableNavActive + " active"
            TaskContainer = <Table 
                TasksList={TasksList} 
                SelectTask={this.props.SelectTask}
                ShowModalWindow={this.props.ShowModalWindow}
                />
        } else if (this.state.viewTaskList== ViewTaskList.userList) {
            userListNavActive = userListNavActive + " active"
            TaskContainer = <UserList 
                TasksList={TasksList} 
                SelectTask={this.props.SelectTask}
                ShowModalWindow={this.props.ShowModalWindow}
                />
        } else if (this.state.viewTaskList== ViewTaskList.scrumTable) {
            scrumTableNavActive = scrumTableNavActive +  " active"
            TaskContainer = <Srum 
                TasksList={TasksList} 
                SelectTask={this.props.SelectTask} 
                UpdateTask={this.props.UpdateTask}
                ShowModalWindow={this.props.ShowModalWindow}
                />
        }

        return (
            <div className="container">
                <div className="row">
                    <Filter filterByPriotity={this.filterByPriotity}/>
                    {filterTag}
                </div>
                <div className="row">
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <a className={tableNavActive} href="#" onClick={ (e)=>{ this.changeViewTaskList('table') }}>Таблица</a>
                        </li>
                        <li className="nav-item">
                            <a className={userListNavActive} href="#" onClick={ (e)=>{ this.changeViewTaskList('userList') }}>Список</a>
                        </li>
                        <li className="nav-item">
                            <a className={scrumTableNavActive} href="#" onClick={ (e)=>{ this.changeViewTaskList('scrumTable') }}>Scrum</a>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={ (e)=>{ this.props.ShowModalWindow(ModalWindows.TaskModal) }}>Добавить задачу</button>
                        </li>
                    </ul>
                </div>
                <div className="row">
                    {TaskContainer}
                </div>
                <div className="row">
                    
                </div>
            </div>
        )
    }

    changeViewTaskList (newView) {
        if(!!ViewTaskList[newView]) {
            this.setState(Object.assign({}, this.state, {
                viewTaskList: ViewTaskList[newView]
            }))
        }
    }

    filterByPriotity(priotity) {
        let currentState = this.state;
        let filterPriotity = null
        if (priotity!='') {
            filterPriotity = priotity
        }

        this.setState({
            filterPriotity: filterPriotity,
            sortParam: currentState.sortParam,
            reverse: currentState.reverse
        })
    }

    removeFilter() {
        this.setState(Object.assign({}, this.state, {
            filterPriotity: null
        }))
    }
}

export default TaskList