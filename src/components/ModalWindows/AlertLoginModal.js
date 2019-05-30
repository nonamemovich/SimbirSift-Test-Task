import React from "react"

export default function (props) {
    let message = 'Неверный логин или пароль'
    return (
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Ошибка авторизации</h5>
                </div>
                <div className="modal-body">
                    <p>{message}</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={ ()=>{props.closeModalWindow()} }>Close</button>
                </div>
            </div>
        </div>
    )
}