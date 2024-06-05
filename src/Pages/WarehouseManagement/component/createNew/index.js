import { Text } from 'common/text'
import { THEME_COLORS } from 'common/theme/_colors'
import useInfo from 'Pages/WarehouseManagement/hooks/useInfo'
import Address from './fields/_address'
import District from './fields/_district'
import Name from './fields/_name'
import Province from './fields/_province'
import Purchase from './fields/_purchase'
import Main from './fields/_main'
import Status from './fields/_status'
import Ward from './fields/_ward'
import './index.scss'

export default function CreateWarehouseManager() {

  return (
    <div className="warehouse-create">
      <div className="warehouse-create-header">
        <Text
          as={'p'}
          color={THEME_COLORS.gray_300}
          fontSize={20}
          fontWeight={600}
          lineHeight={28}
        >
          Thông tin kho
        </Text>
        <Text
          as={'p'}
          color={THEME_COLORS.gray_300}
          fontSize={15}
          fontWeight={400}
          lineHeight={21}
          className="warehouse-creater__create-p"
        >
          “Giúp bạn lưu trữ và quản lý tồn kho hàng hoá”
        </Text>
      </div>
      <div className="warehouse-create-body">
        <div className="warehouse-create-note">
          <Name />
        </div>
        <div className="warehouse-create-position">
          <Address />
        </div>
        <div className="warehouse-create__location" data-size="xl">
          <Province className="warehouse__form-input-item" />
          <District className="warehouse__form-input-item" />
          <Ward className="warehouse__form-input-item" />
        </div>
        <div className="warehouse-create-checkbox">
          <Purchase />
        </div>
        <div className="warehouse-create-checkbox">
          <Main />
        </div>
        <div className="warehouse-create-status">
          <Status />
        </div>
      </div>
    </div>
  )
}
