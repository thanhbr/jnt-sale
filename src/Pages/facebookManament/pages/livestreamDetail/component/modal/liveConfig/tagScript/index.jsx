import React, {useEffect} from 'react';
import {ICONS_LIVE_STREAM_CONFIG} from "../../../../interface/icon";
import {Switch} from "../../../../../../../customer/components/switch";
import {Text} from "../../../../../../../../common/text";
import {Button} from "../../../../../../../../common/button";
import {ORDER_ICONS} from "../../../../../../../refactorOrder/interfaces/_icons";
import {Select} from "../../../../../../../../common/form/select";
import {Option} from "../../../../../../../../common/form/select/_option";
import useLiveStreamConfig from "../../../../hooks/useLiveStreamConfig";
import {Tooltip} from "../../../../../../../../common/tooltip";
import { Spinner } from 'common/spinner';
import {THEME_COLORS} from "../../../../../../../../common/theme/_colors";

const TabScript = () => {
  const {methods, data} = useLiveStreamConfig()
  const listPage = data?.configLiveStream?.tagScript?.listPage?.connected
  // const listPage = data?.configLiveStream?.tagScript?.listPage?.connected.filter(item => !!item.manage_permission)
  const statusActive = data?.configLiveStream?.tagScript?.autoPostScript
  const listAutoPost = data?.configLiveStream?.tagScript?.autoPost?.list
  const activeAutoPost = data?.configLiveStream?.tagScript?.autoPost?.active
  useEffect(() => {
    const actPost = listAutoPost?.length > 0 ?  Object.keys(activeAutoPost).length !== 0 ? activeAutoPost : listAutoPost[0]  : []
    methods.handleChangeActionConfig(actPost)
    window.addEventListener('click', function (e) {
      const isPopup = document.getElementById('live-stream-script-btn')?.contains(e.target)
      const isPopupBtn = document.getElementById('live-stream-script-list')?.contains(e.target)
      if (!isPopup && !isPopupBtn) {
        methods.handleToggleDropdownPage(false)
      }
    })
    return function cleanupListener() {
      window.removeEventListener('click', () => {})
    }
  }, [])

  return (
    <>
      <div className={'live-stream-tag__script-config'}>
        <div className={'live-stream-tag__script-config--title'}>
          <p>Áp dụng kịch bản lên đơn tự động</p>
          {statusActive
            ? <Text onClick={methods?.getListPage}>{ICONS_LIVE_STREAM_CONFIG.refresh}</Text>
            : null}
        </div>
        <Switch checked={statusActive}
                onChange={() => methods.handleSwitchAutoPost()}/>
      </div>
      {statusActive ? (
        <div className={'live-stream-tag__script-config--action'}>
          <Text>Chọn kịch bản áp dụng từ trang:</Text>
          <Button
            className={'live-stream-tag__script-config--btn-list'}
            size="xs"
            onClick={() => methods.handleToggleDropdownPage(!data?.configLiveStream?.tagScript?.toggleDropdownPage)}
            id={'live-stream-script-btn'}
          >
            {data?.configLiveStream?.tagScript?.pageActive?.page_name || data?.liveStream?.detail?.page_name} {ORDER_ICONS.caretRight}
          </Button>
          {data?.configLiveStream?.tagScript?.toggleDropdownPage && (
            <ul className={"live-stream-tag__script-config-menu common-popover scroll-custom"}
                id={'live-stream-script-list'}
            >
              {listPage?.map(item => {
                return (
                  <li
                    key={item.page_id}
                    className={"live-stream-tag__script-config-menu-item"}
                    onClick={_ => methods.handleClickPageDropdown(item)}
                  >
                    <Text color={+data?.configLiveStream?.tagScript?.pageActive?.page_id === +item.page_id && THEME_COLORS.primary_300} className={"live-stream-tag__script-config-menu-item--text"}>{item?.page_name}</Text>
                  </li>
                )
              })}
            </ul>
          )}
          {!!data?.configLiveStream?.tagScript?.pageActive?.page_name ? (
            <div style={{marginTop: 12}}>
             {!!data?.configLiveStream?.tagScript?.autoPost?.loading ?
              <div style={{width: '100%',height: '34px',padding: '0 21px 0 11px',border: '1px solid #ebeef5',borderRadius: '6px',}}>
                <Spinner size={12} thickness={5} />
              </div> :
              <Select
                className={'live-stream-tag__script-config--select'}
                value={listAutoPost?.length > 0 ?  Object.keys(activeAutoPost).length !== 0 ? activeAutoPost?.name : listAutoPost[0]?.name  : 'Chưa có kịch bản lên đơn tự động'}
              >
                {listAutoPost?.length > 0 &&
                listAutoPost?.map(item => (
                  <>
                    <Option
                      key={item.id}
                      className={'live-stream-tag__script-config--option'}
                      data-active={item.id === activeAutoPost?.id}
                      onClick={_ => methods.handleChangeActionConfig(item)}
                    >
                      <div className={'live-stream-tag__script-config--option-text-active'}>
                        <p className={'live-stream-tag__script-config--option-status-title'}>
                          {item?.name}
                        </p>
                        {(item?.arr_page?.length > 0 && +(item?.id === data?.configLiveStream?.tagScript?.autoPost?.active?.id)) ? (
                          <p>
                            <Text className={'live-stream-tag__script-config--option-status'}>
                              Đang áp dụng cho {item?.arr_page?.length} trang </Text>
                          </p>
                        ) : (
                          <p>
                            <Text className={'live-stream-tag__script-config--option-status--not-active'}>Chưa sử dụng </Text>
                          </p>
                        )}
                      </div>
                    </Option>
                    {/*<Option className={'live-stream-tag__script-config--option'}>*/}
                    {/*  <div className={'live-stream-tag__script-config--option-text'}>*/}
                    {/*    <p className={'live-stream-tag__script-config--option-status-title'}>*/}
                    {/*      [Tên kịch bản lên đơn tự động đang được chọn]*/}
                    {/*    </p>*/}
                    {/*  </div>*/}
                    {/*</Option>*/}
                  </>
                ))}
              </Select> }
              {listAutoPost?.length > 0 && (
                <a className={'live-stream-tag__script-config--btn-detail'}
                   href={`/facebook/livestream-scripts/${activeAutoPost?.id}`}
                   target='_blank'
                >
                  <span>Xem chi tiết kịch bản</span> {ICONS_LIVE_STREAM_CONFIG.arrowRigth}
                </a>
              )}
            </div>
          ) : (
            <div className={'live-stream-tag__script-config--post-order'}>
              <img src={'/img/facebook/live-stream-config/empty-script.png'} alt={'live-stream-img'}/>
              <p className={'live-stream-tag__script-config--post-order-title'}>Trang được chọn chưa có áp dụng kịch bản nào, <br/> hãy thiết lập tại trang quản lý hoặc chọn kịch bản từ trang khác.</p>
              <a className={'live-stream-tag__script-config--post-order-sub-title'}
                 href={'/facebook/livestream-scripts'}
                 target='_blank'
              >Xem tất cả kịch bản</a>
            </div>
          )}
          {(listAutoPost?.length === 0 && !!data?.configLiveStream?.tagScript?.pageActive?.page_name) && (
            <div className={'live-stream-tag__script-config--post-order'}>
              <img src={'/img/facebook/live-stream-config/empty-script.png'} alt={'live-stream-img'}/>
              <p className={'live-stream-tag__script-config--post-order-title'}>Trang được chọn chưa có áp dụng kịch bản nào, <br/> hãy thiết lập tại trang quản lý hoặc chọn kịch bản từ trang khác.</p>
              <a className={'live-stream-tag__script-config--post-order-sub-title'}
                 href={'/facebook/livestream-scripts'}
                 target='_blank'
              >Xem tất cả kịch bản</a>
            </div>
          )}
        </div>
      ) : null}

    </>
  );
};

export default TabScript;