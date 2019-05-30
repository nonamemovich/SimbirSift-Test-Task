import React, {Component, PureComponent} from "react"
import  { connect } from 'react-redux';
import dispatchers from '../store/dispatchers'
import store from '../store/index';

import NavBar from './NavBar'
import TaskList from './TaskList'
import Task from './Task/'
import LoginForm from './LoginForm'

var ShowComponent = {
    TaskList: 0,
    Task: 1,
    LoginForm: 2
}

class App extends Component {
	constructor(props) {
		super(props);
    }
    render () {
        let state = store.getState()
        let contComponent = ''

        if (!state.Authorisation) {
            contComponent = <LoginForm Login={this.props.Login}/>
        } else {
            if (state.ShowComponent == ShowComponent.Task) {
                contComponent = <Task TastId={state.TaskId} ShowTaskList={ this.props.ShowTaskList }/>
            }
            if (state.ShowComponent == ShowComponent.TaskList) {
                contComponent = <TaskList SelectTask={this.props.SelectTask} RefreshTasks={this.props.RefreshTasks} UpdateTask={this.props.UpdateTask}/>
            }
        }
        
        return (
            <div className="container">
                <div className="row">
                    <NavBar ShowTaskList={ this.props.ShowTaskList } ShowLoginForm={this.props.ShowLoginForm} LogOff={this.props.LogOff}/>
                </div>
                <div className="row">
                    {contComponent}
                </div>
            </div>
        )
    }
}

export default connect (
    state=>(state),
    dispatchers
)(App);