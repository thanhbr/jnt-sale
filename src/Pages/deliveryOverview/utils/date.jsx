export const getDateFromNow = (n,otp = {type: 'start'}) => {
    let date = new Date()
    const res = date.setDate(date.getDate() + n )
    return new Date(res)
}
