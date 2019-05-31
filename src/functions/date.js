export function getDateString (DateJsObj = new Date() ) {
    return getDate(DateJsObj)+' '+getTime(DateJsObj)
}

// DateTime format == "2019-05-02 02:14"
export function getDateObjectFromStr (DateTimeStr='') {
    let DateStr = DateTimeStr.split(" ")[0]
    let TimeStr = DateTimeStr.split(" ")[1]

    return getDateObject(TimeStr, DateStr)
}

export function getDateObject (TimeStr='', DateStr='') {
    //TimeStr="02:14"
    //DateStr="2019-05-02"
    //new Date(year, month[, day[, hour[, minute[, second[, millisecond]]]]]);

    let hour = TimeStr.split(":")[0]
    let minute = TimeStr.split(":")[1]
    let day = DateStr.split("-")[2]
    let month = DateStr.split("-")[1]
    let year = DateStr.split("-")[0]

    return new Date(year, month, day, hour, minute)
}

export function getTime(DateJsObj=null) {
    if(!DateJsObj) return ''
    let hours = DateJsObj.getHours()+''
    hours.length==1 ? hours = '0'+hours : hours = hours
    let minute = DateJsObj.getMinutes()+''
    minute.length==1 ? minute = '0'+minute : minute = minute
    return hours+':'+minute
}

export function getDate(DateJsObj=null) {
    if(!DateJsObj) return ''
    let month = DateJsObj.getMonth()+''
    month.length==1 ? month = '0'+month : month = month

    let date = DateJsObj.getDate()+''
    date.length==1 ? date = '0'+date : date = date

    return DateJsObj.getFullYear()+'-'+month+'-'+date
}