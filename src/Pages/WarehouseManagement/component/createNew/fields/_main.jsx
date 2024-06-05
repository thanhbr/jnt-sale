import useInfo from '../../../hooks/useInfo'
import { Checkbox } from './checkbox'

const Main = () => {
  const {data, methods} = useInfo()
  const {isMain, status} = data
  const {onIsMainChange} = methods

  const handleChange = (e) => {
    if (!status.value) return
    onIsMainChange(e)
  }

  return (
    <Checkbox checked={isMain.value} disabled={!status.value} onChange={handleChange} label='Sử dụng làm kho mặc định' id='isMainWarehouse'/>
  )
}

export default Main
