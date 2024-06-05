import {Button} from 'common/button'
import {Text} from 'common/text'
import {FACEBOOK_ICONS} from 'Pages/facebookManament/interfaces/_icons'
import useFacebookLiveStreamScript from '../../hooks/useFacecbookLivestreamScript'

export const FacebookLivestreamScriptEmpty = ({...props}) => {
  const {data} = useFacebookLiveStreamScript()
  const {search, fanpage} = data.filter

  const isSearching = !!search.value.trim() || fanpage.activeValue.length > 0

  return (
    <div
      {...props}
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img src="/img/fb/collections/empty-livestream.png" alt="empty" />
      <Text
        as="div"
        color="#7C88A6"
        fontWeight={600}
        style={{marginBottom: 4, textAlign: 'center'}}
      >
        {isSearching ? 'Không tìm thấy kết quả phù hợp' : 'Chưa có kịch bản!'}
      </Text>
      <Text
        as="div"
        color="#7C88A6"
        style={{marginBottom: 16, textAlign: 'center'}}
      >
        Hãy thiết lập kịch bản lên đơn để tự động hóa quy trình lên đơn.
      </Text>
      {!isSearching && (
        <Button
          href="/facebook/livestream-scripts/create"
          style={{minWidth: 148}}
          icon={FACEBOOK_ICONS.plus01}
        >
          Thêm kịch bản
        </Button>
      )}
    </div>
  )
}
