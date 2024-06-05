import React from 'react'
import {ICONS_LIVE_STREAM_CONFIG} from '../../../../interface/icon'
import {Switch} from '../../../../../../../customer/components/switch'
import {Checkbox} from '../../../../../../../../common/form/checkbox'
import {Text} from '../../../../../../../../common/text'
import {Input} from '../../../../../../../../common/form/input'
import {Textarea} from '../../../../../../../../common/form/textarea'
import {TagInput} from '../../../../../../../../common/form/tagInput'
import useLiveStreamConfig from '../../../../hooks/useLiveStreamConfig'

const TagComment = () => {
  const {methods, data, tags} = useLiveStreamConfig()
  return (
    <>
      <div className={'live-stream-tag__auto-config'}>
        <Text className={'live-stream-tag__auto-config--title'}>Cấu hình ẩn bình luận tự động</Text>
        <Switch checked={data?.configLiveStream?.tagComment?.autoHideComment}
                onChange={methods?.handleChangeTagCommentStatus}
        />
      </div>
      {data?.configLiveStream?.tagComment?.autoHideComment && (
        <div>
          <div className={'live-stream-tag__wrapper'}>
            <div className={'live-stream-tag__wrapper-option'}
                 onClick={_ => methods?.handleChangeTagAutoComment(1)}
            >
              <Checkbox checked={!!data?.configLiveStream?.tagComment?.listOption?.find(item => +item === 1)}/>
              <Text className={'live-stream-tag__wrapper-option--title'}>Tất cả bình luận</Text>
            </div>
            <div className={'live-stream-tag__wrapper-option'}
                 onClick={_ => methods?.handleChangeTagAutoComment(2)}
            >
              <Checkbox checked={!!data?.configLiveStream?.tagComment?.listOption?.find(item => +item === 2)}/>
              <Text className={'live-stream-tag__wrapper-option--title'}>Bình luận chứa Số điện thoại</Text>
            </div>
            <div className={'live-stream-tag__wrapper-option'}
                 onClick={_ => methods?.handleChangeTagAutoComment(3)}
            >
              <Checkbox checked={!!data?.configLiveStream?.tagComment?.listOption?.find(item => +item === 3)}/>
              <Text className={'live-stream-tag__wrapper-option--title'}>Bình luận chứa từ khóa</Text>
            </div>
          </div>
          {!!data?.configLiveStream?.tagComment?.listOption?.find(item => item === 3) && (
            <div>
              <TagInput
                defaultValue={tags}
                onChange={val => methods?.handleChangeTags(val)}
                onDelete={val => methods?.handleChangeTags(val)}
                length={9}
                // validate={tagValidate?.content}
                // triggerDefault={triggerDefault}
                // warningTags={warningTags}
                // inputProps={{
                //   onFocus: () =>
                //     state.methods.handleRemoveValidate([
                //       {
                //         name: 'productTableTags',
                //         value: validate.productTableTags.filter(
                //           item => item?.id !== data?.id,
                //         ),
                //       },
                //     ]),
                // }}
              />
            </div>
          )}
        </div>
      )}
      <div className={'live-stream-tag__setting-print'}>
        <div className="live-stream-tag__setting-print--header">
          <Text fontSize={15} fontWeight={600}>Cấu hình in bình luận</Text>
          {!data.socketPrinter &&
            <Text as={'a'} target={'_blank'} href={'/facebook/printer-settings'}
                  color={'#0088FF'}
                  className={'live-stream-tag__setting-print--header_right'}
            >Thiết lập máy in {ICONS_LIVE_STREAM_CONFIG.arrowRight}</Text>
          }
        </div>
        {!data.socketPrinter
          ?
          <div className={'live-stream-tag__setting-print--notify-error'}>
            {ICONS_LIVE_STREAM_CONFIG?.error}
            <Text className={'live-stream-tag__setting-print--label-text'}>Hãy kết nối Webapp Hardware Bridge để bắt đầu
              in</Text>
          </div>
          :
          <div className={'live-stream-tag__setting-print--notify-success'}>
            {ICONS_LIVE_STREAM_CONFIG?.success}
            <Text className={'live-stream-tag__setting-print--label-text'}>Đã kết nối Webapp Hardware Bridge
              in</Text>
          </div>
        }
      </div>

      <div className={'live-stream-tag__setting-height'}>
        <Input label={'Chiều cao khoảng trống (tối đa 600)'}
               placeholder={'Nhập chiều cao khoảng trống'}
               value={data?.configLiveStream?.tagComment?.height || 0}
               onChange={e => methods?.handleChangeTagCommentHeight(e?.target?.value)}
        />
      </div>

      <div className={'live-stream-tag__setting-area'}>
        <Textarea label={'Nội dung in đơn'}
                  placeholder={'Nhập nội dung in đơn'}
                  style={{resize: 'none', height: 88}}
                  value={data?.configLiveStream?.tagComment?.content || ''}
                  onChange={e => methods?.handleChangeTagCommentContent(e?.target?.value)}
                  maxLength={255}
        />
      </div>
      <div className={'live-stream-tag__auto-print-phone'} style={{cursor: 'pointer'}} onClick={_ => methods?.handleChangeTagCommentAutoPrint(+data?.configLiveStream?.tagComment?.auto_print ===1 ? 0 : 1)}>
        <Checkbox checked={!data.socketPrinter ? 0 : +data?.configLiveStream?.tagComment?.auto_print === 1}
                    disabled={!data.socketPrinter ? true: false}
        />
        <Text className={'live-stream-tag__auto-print-phone--title'}
        >Tự động in bình luận có chứa số điện thoại</Text>
      </div>
    </>
  )
}

export default TagComment