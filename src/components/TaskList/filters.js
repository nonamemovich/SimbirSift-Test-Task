import {priorityJSON} from '../../data/clientData'
import {sortParams} from '../../data/constants'

// sort functions, must be return -1, 0, 1
let sortByDate = function (CurrentTask, NextTask) {
    if (CurrentTask.StartDate > NextTask.StartDate) {
        return 1
    }
    if (CurrentTask.StartDate == NextTask.StartDate) {
        return 0
    }
    if (CurrentTask.StartDate < NextTask.StartDate) {
        return -1
    }
}

let sortByAllottedTime = function (CurrentTask, NextTask) {
    if (CurrentTask.allottedTime > NextTask.allottedTime) {
        return 1
    }
    if (CurrentTask.allottedTime == NextTask.allottedTime) {
        return 0
    }
    if (CurrentTask.allottedTime < NextTask.allottedTime) {
        return -1
    }
}

let sortByPriotity = function (CurrentTask, NextTask) {
    if (CurrentTask.priority > NextTask.priority) {
        return 1
    }
    if (CurrentTask.priority == NextTask.priority) {
        return 0
    }
    if (CurrentTask.priority < NextTask.priority) {
        return -1
    }
}

export const filters = {
    ByPriotity: function (TaskList, Priotity) {
        var newTaskList = Object.assign([], TaskList)
        return newTaskList.filter((Task)=>{
            if (Priotity==Task.priority) return true
        })
    },
    Sort: function (TaskList, sortParam, reverse) {
        var newTaskList = Object.assign([], TaskList)
        newTaskList.sort((Current, Next)=>{
            if (sortParams.Date==sortParam) {
                return sortByDate(Current, Next, reverse)
            } else if (sortParams.AllottedTime==sortParam) {
                return sortByAllottedTime(Current, Next, reverse)
            } else if (sortParams.Priotity==sortParam) {
                return sortByPriotity(Current, Next, reverse)
            }
            return 0
        })
        if (reverse) newTaskList.reverse()
        return newTaskList
    }
}