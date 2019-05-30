export function getDateString (DateJsObj = new Date() ) {
    let day = DateJsObj.getDate()
    let month = DateJsObj.getMonth()
    let year = DateJsObj.getFullYear()
    let hour = DateJsObj.getHours()
    let minut = DateJsObj.getMinutes()

    return day+'.'+month+'.'+year+' '+hour+':'+minut
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

