import {priorityWidth, taskStatusWidth} from '../../data/clientData'
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
    if (priorityWidth[CurrentTask.priority] > priorityWidth[NextTask.priority]) {
        return 1
    }
    if (priorityWidth[CurrentTask.priority] == priorityWidth[NextTask.priority]) {
        return 0
    }
    if (priorityWidth[CurrentTask.priority] < priorityWidth[NextTask.priority]) {
        return -1
    }
}

let sortByPlane = function (CurrentTask, NextTask) {
    if (CurrentTask.planeTime > NextTask.planeTime) {
        return 1
    }
    if (CurrentTask.planeTime== NextTask.planeTime) {
        return 0
    }
    if (CurrentTask.planeTime < NextTask.planeTime) {
        return -1
    }
}

let sortByStatus = function (CurrentTask, NextTask) {
    if (taskStatusWidth[CurrentTask.status] > taskStatusWidth[NextTask.status]) {
        return 1
    }
    if (taskStatusWidth[CurrentTask.status]== taskStatusWidth[NextTask.status]) {
        return 0
    }
    if (taskStatusWidth[CurrentTask.status] < taskStatusWidth[NextTask.status]) {
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
        console.log('Plane')
        newTaskList.sort((Current, Next)=>{
            if (sortParams.Date==sortParam) {
                return sortByDate(Current, Next)
            } else if (sortParams.AllottedTime==sortParam) {
                return sortByAllottedTime(Current, Next)
            } else if (sortParams.Priotity==sortParam) {
                return sortByPriotity(Current, Next)
            } else if (sortParams.Plane==sortParam) {
                return sortByPlane(Current, Next)
            } else if (sortParams.Status==sortParam) {
                return sortByStatus(Current, Next)
            }
            return 0
        })
        if (reverse) newTaskList.reverse()
        return newTaskList
    }
}