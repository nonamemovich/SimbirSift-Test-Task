import React, {Component, PureComponent} from "react"
import store from '../../store/index';

class NavBar extends Component {
	constructor(props) {
		super(props);
    }
    render () {
        let active = ''
        let LoginNav = ''
        let state = store.getState();
        
        
        if (!state.Authorisation.login) {
            LoginNav = <li className="nav-item" onClick={ (e)=>{ this.props.ShowLoginForm(e) }}>
                <a className="nav-link" href="#">Авторизоваться</a>
            </li>
        } else {
            LoginNav = <li className="nav-item" onClick={ (e)=>{ this.props.LogOff(e) }}>
                <a className="nav-link" href="#">Выйти</a>
            </li>
        }
        return (
            <ul className="nav nav-tabs">
                <li className="nav-item" onClick={ (e)=>{ this.ShowTaskList(e) }}>
                    <a className="nav-link active" href="#">Задачи</a>
                </li>
                {LoginNav}
            </ul>
        )
    }
    
    ShowTaskList(e) {
        this.props.ShowTaskList();
    }
    ShowLoginForm() {
        this.props.ShowLoginForm();
    }
}

export default NavBar