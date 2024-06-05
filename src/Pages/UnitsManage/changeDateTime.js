export const changeDateTime=()=>{
    const formatTime=(time)=>{
        const slitDateTime= time? time.split(' ') : [];
        const slitdate=slitDateTime[0].split('-')
        const newDate = `${slitdate[2]}/${slitdate[1]}/${slitdate[0]}`;
        const slitTime = slitDateTime[1].split(":");
        const newTime= `${slitTime[0]}:${slitTime[1]}`;
        return `${newDate} ${newTime}`
    }
   
    return {
        formatTime,
    }
}