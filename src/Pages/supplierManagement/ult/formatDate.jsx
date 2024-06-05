export function formateDate(date) {
    const splitDate= date?.split('-')
    const newDate = `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`
    return newDate
}