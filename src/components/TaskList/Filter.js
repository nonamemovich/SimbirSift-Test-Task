import React, {Component, PureComponent} from "react"
import {priorityJSON} from '../../data/clientData'

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSelect: false
        }
        
    }

    render () {
        let selectFilter = ''

        if (!!this.state.showSelect) {
            selectFilter = <div className="dropdown-menu visible" aria-labelledby="dropdownMenuButton" style={{display: 'block'}}>
                <a className="dropdown-item" href="#" onClick={ () => { this.setFilter('low') } }>{priorityJSON.low}</a>
                <a className="dropdown-item" href="#" onClick={ () => { this.setFilter('medium') } }>{priorityJSON.medium}</a>
                <a className="dropdown-item" href="#" onClick={ () => { this.setFilter('hight') } }>{priorityJSON.hight}</a>
            </div>
        }

        return (
            <div className="btn-group">
                <button onClick={ ()=>{ this.collapseFilter() } } className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    Отфильтровать по приоритету
                </button>
                {selectFilter}
            </div>
        )
    }
    
    collapseFilter () {
        this.setState({
            showSelect: !this.state.showSelect
        })
    }

    setFilter (priotity) {
        this.setState({
            showSelect: false
        })
        this.props.filterByPriotity(priotity)
    }
}

export default Filter