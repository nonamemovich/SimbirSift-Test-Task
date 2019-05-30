import React, {Component, PureComponent} from "react"
import Filter from './Filter'
import Table from './Table'
import UserList from './UserList'
import Srum from './Srum'


import store from '../../store/index';
import {priorityJSON} from '../../data/clientData'                                  ///
import {ViewTaskList,sortParams} from '../../data/constants'

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
            reverse: false
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
        if (0) {
            TaskContainer = <Table TasksList={TasksList} SelectTask={this.props.SelectTask}/>
        } else if (0) {
            TaskContainer = <UserList TasksList={TasksList} SelectTask={this.props.SelectTask}/>
        } else if (1) {
            TaskContainer = <Srum TasksList={TasksList} SelectTask={this.props.SelectTask} UpdateTask={this.props.UpdateTask}/>
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
                    {TaskContainer}
                </div>
            </div>
        )
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