import React, {Component} from "react"

class LoginForm extends Component {
	constructor(props) {
		super(props);
    }
    render () {
        return (
            <form >
                <div className="form-group">
                    <label>Введите имя пользователя</label>
                    <input ref={(input) => { this.userName = input; }} type="text" className="form-control" placeholder="имя пользователя"/>
                </div>
                <div className="form-group">
                    <label>Введите пароль</label>
                    <input ref={(input) => { this.password = input; }} type="password" className="form-control" placeholder="пароль"/>
                </div>
                <button type="submit" className="btn btn-primary mb-2" onClick={ (e)=>{this.Login(e)} }> Авторизоваться</button>
            </form>
        )
    }
    Login(e) {
        this.props.Login(this.userName.value, this.password.value)
    }
}

export default LoginForm