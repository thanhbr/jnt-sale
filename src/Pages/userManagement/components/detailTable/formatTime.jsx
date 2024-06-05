export const changeDateTime=()=>{
    const formatTime=(time)=>{
        const slitDateTime= time? time.split('-') : [];
        const newDate = time?`${slitDateTime[2]}/${slitDateTime[1]}/${slitDateTime[0]}`:'---';
        return `${newDate}`
    }
   
    return {
        formatTime,
    }
}