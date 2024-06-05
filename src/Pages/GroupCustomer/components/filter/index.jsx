import Box from '@mui/material/Box'
import './index.scss'
import {ORDER_ICONS} from "../../../refactorOrder/interfaces/_icons";
import {Input} from "../../../../common/form/input";
import useGroupCustomer from '../../hooks/useGroupCustomer'
import { useTranslation } from "react-i18next";

export default () => {
  const {search} = useGroupCustomer()
  const { t } = useTranslation();
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
          placeholder={t("search_customer_group")}
          onChange={search.onChange}
        />
        
      </div>
      
    </Box>

  )

}