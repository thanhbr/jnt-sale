import Box from '@mui/material/Box'
import './index.scss'
import {ORDER_ICONS} from "../../../refactorOrder/interfaces/_icons";
import {Input} from "../../../../common/form/input";
import useOrderOrigin from '../../hooks/useOrderOrigin'

export default () => {
  const {search} = useOrderOrigin()
  return (
    <Box
      component="div"
      noValidate
      autoComplete="off"
      className="grcustomer-filter"
    >
      <div className="grcustomer-filter__group">
        <Input
          className="grcustomer-filter__input-wide"
          icon={ORDER_ICONS.searchMd}
          placeholder="Tìm kiếm theo nguồn đơn hàng"
          onChange={search.onChange}
        />
        
      </div>
      
    </Box>

  )

}