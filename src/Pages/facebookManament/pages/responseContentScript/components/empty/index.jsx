import {Button} from 'common/button'
import {Text} from 'common/text'
import {FACEBOOK_ICONS} from 'Pages/facebookManament/interfaces/_icons'
import useFacebookResponseContentScript from '../../hooks/useFacebookResponseContentScript'

export const FacebookResponseContentScriptEmpty = ({...props}) => {
  const {data, methods} = useFacebookResponseContentScript()

  return (
    <div
      {...props}
      style={{
        height: 'calc(100vh - 340px)',
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
        {!!data.filter.keyword.trim()
          ? 'Không tìm thấy kết quả phù hợp'
          : 'Chưa có mẫu nội dung phản hồi nào!'}
      </Text>
      <Text
        as="div"
        color="#7C88A6"
        style={{marginBottom: 16, textAlign: 'center'}}
      >
        Hãy thiết lập mẫu nội dung để tiết kiệm thời gian phản hồi cho các câu
        hỏi chung thường gặp.
      </Text>
      {!data.filter.keyword.trim() && (
        <Button
          style={{minWidth: 148}}
          icon={FACEBOOK_ICONS.plus01}
          onClick={() => methods.handleDetailChange({type: 'create'})}
        >
          Thêm mẫu nội dung phản hồi
        </Button>
      )}
    </div>
  )
}
