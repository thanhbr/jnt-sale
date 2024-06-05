import {Button} from 'common/button'
import {Modal} from 'common/modal'
import {Spinner} from 'common/spinner'
import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import ArrayUtils from 'Pages/facebookManament/utils/array'
import {useEffect} from 'react'
import styled from 'styled-components'

export const FacebookLivestreamScriptConfirmDuplicateModal = ({
  data,
  name,
  loading,
  onClose,
  onSubmit,
}) => {
  const checkData = ArrayUtils.getQualifiedArray(data)
  // useEffect(() => {
  //   if (checkData.length <= 0 && onSubmit) onSubmit()
  // }, [data])

  return (
    <Modal
      title="Kích hoạt kịch bản"
      actions={
        loading
          ? []
          : [
              <Button
                appearance="ghost"
                size="sm"
                style={{minWidth: 110}}
                onClick={onClose}
              >
                Huỷ
              </Button>,
              <Button
                size="sm"
                style={{minWidth: 110, marginLeft: 8}}
                onClick={onSubmit}
              >
                Xác nhận
              </Button>,
            ]
      }
      width={640}
      onClose={() => onClose && !loading && onClose()}
    >
      {loading ? (
        <div
          style={{
            minHeight: 150,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Spinner size={48} thickness={4} />
        </div>
      ) : (
        <div style={{paddingBottom: 16}}>
          {checkData.map(item => (
            <Text as="p" key={item?.page_id}>
              Trang <Text as="b">{item?.page_name || '---'}</Text> đang sử dụng
              kịch bản{' '}
              <Text color={THEME_SEMANTICS.delivering}>
                {item?.order_script_name || '---'}
              </Text>
              .
            </Text>
          ))}
          <Text as="p" style={{marginTop: 20}}>
            Bạn có chắc chắn muốn kích hoạt kịch bản{' '}
            <Text as="b">{name || '---'}</Text> đang chọn?
          </Text>
          <Li style={{marginTop: 20}}>
            <Text as="p">
              Lựa chọn <Text as="b">Xác nhận</Text>: Hệ thống sẽ áp dụng{' '}
              {checkData.map((item, i) => (
                <>
                  {i > 0 && ', '}
                  <Text as="b">{item?.page_name || '---'}</Text>
                </>
              ))}{' '}
              cho kịch bản <Text as="b">{name || '---'}</Text> và loại bỏ các
              trang này ra khỏi kịch bản cũ.
            </Text>
          </Li>
        </div>
      )}
    </Modal>
  )
}

const Li = styled.li`
  position: relative;

  padding-left: 20px;

  display: block;

  list-style-type: none;

  &::before {
    position: absolute;
    top: 8px;
    left: 8px;

    width: 4px;
    height: 4px;

    background: ${THEME_COLORS.secondary_100};
    border-radius: 50%;

    content: '';
  }
`
