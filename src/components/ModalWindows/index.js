import React, {Component} from "react"
import TaskModal from './TaskModal'
import AlertLoginModal from './AlertLoginModal'
import store from '../../store/index'

import {ModalWindows} from '../../data/constants'

const Windows = {
    TaskModal: 1,
    AlertLoginModal: 2
}

class ModalWindow extends Component {
	constructor(props) {
        super(props);
    }
    render () {
        let storeState = store.getState()
        let ModalStore = storeState.ModalStore
        let display = 'none';
        !!ModalStore.show && (display='block')

        let modalBody = ''
        if (ModalStore.showWindow==ModalWindows.TaskModal && ModalStore.show) {
            modalBody = <TaskModal
                UpdateTask={this.props.UpdateTask} 
                CloseModalWindow={this.props.CloseModalWindow} 
                onAddTask={this.props.onAddTask}/>
        } else if(ModalStore.showWindow==ModalWindows.AlertLoginModal && ModalStore.show) {
            modalBody = <AlertLoginModal 
                closeModalWindow={this.props.closeModalWindow}/>
        }

        return (
            <div className="modal" style={{ display: display }}>
                {modalBody}
            </div>
        )
    }
}

export default ModalWindow