import {Skeleton} from '@mui/material'
import {sendRequestAuth} from 'api/api'
import {Switch} from 'common/switch'
import config from 'config'
import ArrayUtils from 'Pages/facebookManament/utils/array'
import {useState} from 'react'
import useFacebookLiveStreamScript from '../../hooks/useFacecbookLivestreamScript'
import {FacebookLivestreamScriptConfirmDeactivateModal} from '../confirmDeactivateModal'
import {FacebookLivestreamScriptConfirmDuplicateModal} from '../confirmDuplicateModal'
import {FacebookLivestreamScript_FanpageLogoList} from '../_fanpageLogoList'
import {FacebookLivestreamScript_RowMenu} from '../_rowMenu'
import {FacebookLivestreamScript_Tags} from '../_tags'
import {StyledFacebookLivestreamScript_Tbody} from './_styled'

export const FacebookLivestreamScript_Tbody = ({
  rawListData,
  data,
  loading,
  ...props
}) => {
  const {properties, methods} = useFacebookLiveStreamScript()

  const [
    shouldOpenConfirmDeactivateModal,
    setShouldOpenConfirmDeactivateModal,
  ] = useState(false)
  const [shouldOpenConfirmDuplicateModal, setShouldOpenConfirmDuplicateModal] =
    useState(false)

  const keywords = data?.keywords
    ? ArrayUtils.getQualifiedArray(JSON.parse(data?.keywords)[0]?.keyword)
    : []

  const handleSwicthToggle = async () => {
    if (!properties.isStatusLoading) {
      if (data?.status !== '1') {
        const response = await sendRequestAuth(
          'get',
          `${config.API}/fb/setting/order-script/check?id=${data?.id}&page_id=${
            data?.page || ''
          }`,
        )

        if (response?.data?.success === false)
          setShouldOpenConfirmDuplicateModal(response?.data?.errors)
        else{
            setShouldOpenConfirmDuplicateModal(false)
            methods.handleRowStatusChange(data?.id, true)
        }
      } else setShouldOpenConfirmDeactivateModal(true)
    }
  }

  if (loading)
    return (
      <StyledFacebookLivestreamScript_Tbody {...props}>
        {Array.from(Array(6), (e, i) => (
          <div key={i} className="facebook-livestream-script-tbody__td">
            <Skeleton
              sx={{
                width: '100%',
                height: 33,
                background:
                  'linear-gradient(0deg, rgba(244, 247, 252, 0.98), rgba(244, 247, 252, 0.98)), #00081D;',
              }}
            />
          </div>
        ))}
      </StyledFacebookLivestreamScript_Tbody>
    )

  return (
    <StyledFacebookLivestreamScript_Tbody {...props}>
      <div className="facebook-livestream-script-tbody__td">
        {data?.name || '---'}
      </div>
      <div className="facebook-livestream-script-tbody__td">
        <FacebookLivestreamScript_Tags list={keywords} />
      </div>
      <div className="facebook-livestream-script-tbody__td">
        <FacebookLivestreamScript_FanpageLogoList
          list={ArrayUtils.getQualifiedArray(data?.arr_page)}
          name={data?.name}
        />
      </div>
      <div className="facebook-livestream-script-tbody__td">
        <img
          src={`/img/fb/collections/shipping-partner-${data?.shipping_partner}.png`}
          alt={data?.shipping_name}
        />
      </div>
      <div className="facebook-livestream-script-tbody__td">
        <Switch
          checked={data?.status === '1'}
          style={{cursor: properties.isStatusLoading ? 'progress' : 'pointer'}}
          onClick={handleSwicthToggle}
        />
        {shouldOpenConfirmDeactivateModal && (
          <FacebookLivestreamScriptConfirmDeactivateModal
            loading={properties.isStatusLoading}
            onClose={() => setShouldOpenConfirmDeactivateModal(false)}
            onSubmit={() => {
              const response = methods.handleRowStatusChange(data?.id, false)
              response.then(
                res =>
                  res?.data?.success &&
                  setShouldOpenConfirmDeactivateModal(false),
              )
            }}
          />
        )}

        {shouldOpenConfirmDuplicateModal && (
          <FacebookLivestreamScriptConfirmDuplicateModal
            data={shouldOpenConfirmDuplicateModal}
            name={data?.name}
            loading={properties.isStatusLoading}
            onClose={() => setShouldOpenConfirmDuplicateModal(false)}
            onSubmit={() => {
              const response = methods.handleRowStatusChange(data?.id, true)
              response.then(
                res =>
                  res?.data?.success &&
                  setShouldOpenConfirmDuplicateModal(false),
              )
            }}
          />
        )}
      </div>
      <div className="facebook-livestream-script-tbody__td">
        <FacebookLivestreamScript_RowMenu data={data} />
      </div>
    </StyledFacebookLivestreamScript_Tbody>
  )
}
