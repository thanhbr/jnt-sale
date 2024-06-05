export const formatTime = (n, otp)=>{
    const splitDate = n?.split('-')
    const splitDateTime = splitDate[2]?.split(' ')
    const newDate = `${splitDateTime[0]}/${splitDate[1]}/${splitDate[0]} ${splitDateTime[1]}`
    return newDate
}