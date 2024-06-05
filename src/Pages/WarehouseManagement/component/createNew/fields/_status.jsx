import { Text } from 'common/text'
import { THEME_COLORS } from 'common/theme/_colors'
import useInfo from '../../../hooks/useInfo'
import {SwitchStatus} from 'Component/SwitchStatus/SwitchStatus'

const Purchase = () => {
  const {data, methods} = useInfo()
  const {status, isMain} = data
  const {onStatusChange} = methods

  if (isMain.value) return

  return (
    <>
      <SwitchStatus
        name="status"
        status={status.value}
        handleChange={onStatusChange}
      />
      <Text
        className="units-manage-statusText"
        color={THEME_COLORS.gray_300}
        fontSize={14}
        fontWeight={400}
      >
        Kích hoạt/Ngưng sử dụng
      </Text>
    </>
  )
}

export default Purchase
