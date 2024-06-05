import useInfo from '../../../hooks/useInfo'
import { Checkbox } from './checkbox'

const Main = () => {
  const {data, methods} = useInfo()
  const {isMain} = data
  const {onIsMainChange} = methods

  return (
    <Checkbox checked={isMain.value} onChange={onIsMainChange} label='Sử dụng làm kho mặc định' id='isMainWarehouse'/>
  )
}

export default Main
