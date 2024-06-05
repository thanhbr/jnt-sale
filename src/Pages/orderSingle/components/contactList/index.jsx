import {CircularProgress, Drawer} from '@mui/material'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {ORDER_SINGLE_ICONS} from 'Pages/orderSingle/interface/_icons'
import StringUtils from 'Pages/orderSingle/utils/string'
import {useState} from 'react'
import {useRef} from 'react'
import styled from 'styled-components'
import {CreateCustomerDrawer} from '../createCustomerDrawer'
import {StyledOrderSingleContactList} from './_styled'

export const OrderSingleContactList = ({
  data,
  isExistOriginData,
  isLoading,
  isLoadMore,
  value,
  onClose,
  onSelect,
  ...props
}) => {
  const [isModified, setIsModified] = useState(false)

  const [shouldOpenDrawer, setShouldOpenDrawer] = useState(false)
  const [shouldOpenConfirmModal, setShouldOpenConfirmModal] = useState(false)
  const [shouldOpenLoadingModal, setShouldOpenLoadingModal] = useState(false)

  const menuList = useRef(null)

  const handleSelect = opt => {
    if (onClose) onClose()

    if (onSelect)
      onSelect(opt?.value, {
        data: opt?.data,
        isChosen: true,
      })
  }

  return (
    <>
      <StyledOrderSingleContactList {...props}>
        {isLoading ? (
          <div className="order-single-contact-list__loading">
            <CircularProgress
              className="order-single-contact-list__spinner"
              color="success"
              size={54}
              thickness={5}
            />
            <Text style={{marginTop: 5}}>Loading...</Text>
          </div>
        ) : (
          <>
            <div ref={menuList} className="order-single-contact-list__list">
              {data.map(item => (
                <div
                  key={item?.value}
                  className="order-single-contact-list__item"
                  onClick={() => handleSelect(item)}
                >
                  <div className="order-single-contact-list__avatar">
                    <Text
                      as="b"
                      color="#fff"
                      fontSize={12}
                      lineHeight={17}
                      style={{textTransform: 'uppercase'}}
                    >
                      {!!item?.name
                        ? StringUtils.getFirstLetters(item.name).substring(0, 2)
                        : '--'}
                    </Text>
                  </div>
                  <div className="order-single-contact-list__info">
                    <Text className="order-single-contact-list__name">
                      {item?.name || '---'}
                    </Text>
                    <Text color="#7C88A6">{item?.data?.mobile || '---'}</Text>
                  </div>
                </div>
              ))}
              {isLoadMore && !isLoading && (
                <div className="order-single-contact-list__load-more">
                  <CircularProgress
                    className="order-single-contact-list__spinner"
                    color="success"
                    size={48}
                    thickness={4}
                  />
                </div>
              )}
            </div>
            <div className="order-single-contact-list__footer">
              <Text
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: 4,
                  display: 'flex',
                  alignItems: 'center',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                }}
                onClick={() => setShouldOpenDrawer(true)}
              >
                <i
                  style={{
                    marginRight: 4,
                    display: 'inline-block',
                    transform: 'translateY(2px)',
                  }}
                >
                  {ORDER_SINGLE_ICONS.plus}
                </i>
                <Text color={THEME_SEMANTICS.delivering}>
                  Thêm mới khách hàng
                </Text>
              </Text>
            </div>
          </>
        )}
      </StyledOrderSingleContactList>
      <StyledRightDrawer
        anchor="right"
        open={shouldOpenDrawer}
        onClose={() =>
          isModified
            ? setShouldOpenConfirmModal(true)
            : setShouldOpenDrawer(false)
        }
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: -24,
            width: 24,
            height: 24,
            cursor: 'pointer',
          }}
          onClick={e => {
            e.stopPropagation()
            if (isModified) setShouldOpenConfirmModal(true)
            else setShouldOpenDrawer(false)
          }}
        >
          {ORDER_SINGLE_ICONS.x01}
        </div>
        <CreateCustomerDrawer
          exit={shouldOpenConfirmModal}
          loading={shouldOpenLoadingModal}
          onClose={() => setShouldOpenDrawer(false)}
          onExitToggle={setShouldOpenConfirmModal}
          onLoadingToggle={setShouldOpenLoadingModal}
          onModified={setIsModified}
          onRefetch={() => onSelect && onSelect('')}
        />
      </StyledRightDrawer>
    </>
  )
}

const StyledRightDrawer = styled(Drawer)`
  & > .MuiPaper-root {
    height: calc(100% - 3.5rem);
    margin-top: 3.5rem;

    overflow: unset;
  }
`
