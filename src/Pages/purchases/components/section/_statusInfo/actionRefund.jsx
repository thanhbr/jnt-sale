import { Button } from '../../../../../common/button'
import {useNavigate, useParams} from "react-router-dom";

export const ActionRefund = () => {
  const nav = useNavigate()
  const {purchaseId} = useParams()
  return (
    <Button size={'md-'}
            onClick={() => nav(`/purchase/refund/${purchaseId}`)}
            style={{position: 'absolute', top: '21px', right: '24px'}}>Hoàn trả</Button>
  )
}