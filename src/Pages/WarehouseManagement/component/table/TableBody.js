import { WarehouseManager } from 'Pages/WarehouseManagement'
import { useContext } from 'react'
import Item from './Item'

export default function TableBody(item) {
  const {state, dispatch} = useContext(WarehouseManager)
  const list = state.list

  const show = () => {
    if (list) {
      return list.map((item, index) => 
        <Item item={item} index={index} />
      )
    }
  }
  return <>{show()}</>
}
