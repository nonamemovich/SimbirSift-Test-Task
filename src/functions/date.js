export function getDateString (DateJsObj = new Date() ) {
    let day = DateJsObj.getDate()
    let month = DateJsObj.getMonth()
    let year = DateJsObj.getFullYear()
    let hour = DateJsObj.getHours()
    let minut = DateJsObj.getMinutes()

    return day+'.'+month+'.'+year+' '+hour+':'+minut
}
