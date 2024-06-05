export function formateDecimal(val) {
    if (val === 0) return val
    else if (val < 1000000) return ' ~ \n' + checkIsInterger(val / 1000) + '\n k'
    else if (val < 100000000) return ' ~ \n' + checkIsInterger(val / 1000000) + '\n tr'
    else if (val < 1000000000) return ' ~ \n' + checkIsInterger(val / 1000000)+ '\n tr'
    else if (val < 100000000000) return ' ~ \n' + checkIsInterger(val / 1000000000) + '\n tỷ'
    else return ' ~ \n' + checkIsInterger(val / 1000000000) + '\n tỷ'
}
const checkIsInterger = (val)=>{
    if(Number.isInteger(val)) return parseFloat(val)
    else return parseFloat(val).toFixed(2)
}