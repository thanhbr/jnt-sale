import { ListTab } from './listTabOrder'
import { OrderContent } from './orderContent'

export const CreateOrder = () => {

  return (
    <div>
      {/*order tab*/}
      <ListTab/>
      {/*order details*/}
      <OrderContent/>
    </div>
  )
}