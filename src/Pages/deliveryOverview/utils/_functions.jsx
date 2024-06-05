export const formatDatetime = data => {
    const D = new Date(data)

    let d = D.getDate()
    d = d < 10 ? `0${d}` : d

    let m = D.getMonth()
    m = m + 1
    m = m < 10 ? `0${m}` : m

    let y = D.getFullYear()

    return `${d}/${m}/${y}`
}

export const convertDateTimeToApiFormat = data => {
    const dateTimeSplit = data.split('/')
    const ymd = `${dateTimeSplit[2]}-${dateTimeSplit[1]}-${dateTimeSplit[0]}`
    return `${ymd} || ''}`.trim()
}
