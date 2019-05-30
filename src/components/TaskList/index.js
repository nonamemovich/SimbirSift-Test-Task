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

            filterTag = <button type="button" className="close" aria-label="Close" onClick={ ()=>{ this.removeFilter() } }>
                <span className="badge badge-primary text-wrap">{priorityJSON[this.state.filterPriotity]}<span aria-hidden="true">&times;</span></span>
            </button>
        }
        
        let TaskContainer = ''
        if (this.state.viewTaskList== ViewTaskList.table) {
            TaskContainer = <Table 
                TasksList={TasksList} 
                SelectTask={this.props.SelectTask}
                ShowModalWindow={this.props.ShowModalWindow}
                />
        } else if (this.state.viewTaskList== ViewTaskList.userList) {
            TaskContainer = <UserList 
                TasksList={TasksList} 
                SelectTask={this.props.SelectTask}
                ShowModalWindow={this.props.ShowModalWindow}
                />
        } else if (this.state.viewTaskList== ViewTaskList.scrumTable) {
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
                </div>
                <div className="row">
                    {filterTag}
                </div>
                <div className="row">
                <img src="..." alt="..." className="img-thumbnail show_table" onClick={ (e)=>{ this.changeViewTaskList('table') }}/>
                <img src="..." alt="..." className="img-thumbnail show_user_list" onClick={ (e)=>{ this.changeViewTaskList('userList') }}/>
                <img src="..." alt="..." className="img-thumbnail show_scrum_table" onClick={ (e)=>{ this.changeViewTaskList('scrumTable') }}/>
                <img src="..." alt="..." className="img-thumbnail add_task" onClick={ (e)=>{ this.props.ShowModalWindow(ModalWindows.TaskModal) }}/>
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
        console.log(newView)
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