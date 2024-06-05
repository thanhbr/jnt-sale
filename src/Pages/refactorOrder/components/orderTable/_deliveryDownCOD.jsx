import {Button} from 'common/button'
import {Text} from 'common/text'
import {Input} from 'common/form/input'
import {useContext, useState} from 'react'
import {sendRequestAuth} from 'api/api'
import config from 'config'
import {THEME_COLORS} from 'common/theme/_colors'
import {formatMoney} from 'util/functionUtil'
import { fNumber } from 'util/formatNumber'
import useAlert from 'hook/useAlert'
import styled from 'styled-components'
import useOrderRow from 'Pages/refactorOrder/hooks/useOrderRow'

export const DeliveryDownCOD = ({curValue, billCode, ...props}) => {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const {showAlert} = useAlert()
  const {row} = useOrderRow(props.data)


  const handleUpdateCOD = async () => { 
    const res = await sendRequestAuth(
      'post',
      `${config.API}/delivery/down-cod/${billCode}`,
      {cod: value},
    )
    if (res?.data.success) {
     
        row.onFetchDetail();
      showAlert({content: 'Cập nhật giá trị COD thành công', type: 'success'})
      props.onClose()
    } else {
      setError(res?.data.message)
    }
  }

  return (
    <StyledDownCODPP {...props}>
      <div className="delivery-down-COD__container">
        <div className="delivery-down-COD__header">
          <Text
            as="h5"
            fontSize={20}
            fontWeight={600}
            lineHeight={22}
            style={{marginRight: 6}}
          >
            CHỈNH SỬA GIÁ TRỊ COD VẬN ĐƠN
          </Text>
          <Text color="#1A94FF" fontSize={20} fontWeight={600}>
            #{billCode}
          </Text>
        </div>
        <div className="delivery-down-COD__body">
          <div className="delivery-down-COD__list common-scrollbar">
            <Text
              color="#7C88A6"
              fontSize={14}
              lineHeight={22}
              style={{display: 'block', marginBottom: 12}}
            >
              Giá trị hiện tại
            </Text>
            <Text
              color={THEME_COLORS.secondary_100}
              fontSize={16}
              lineHeight={22}
              style={{marginBottom: 12}}
            >
              {formatMoney(curValue)}
            </Text>
          </div>
          <div className="delivery-down-COD__list common-scrollbar">
            {' '}
            <Text
              color="#7C88A6"
              fontSize={14}
              lineHeight={22}
              style={{marginBottom: 12}}
            >
              Giá trị COD điều chỉnh
            </Text>
            <div className="delivery-down-COD__style-input">
              <Input
                style={{width: '276px', marginTop: '4px'}}
                className={error ? 'border-error' : 'input__input'}
                placeholder={'Nhập giá trị COD điều chỉnh '}
                autoComplete={'false'}
                value={value}
                onChange={e => {
                  setValue(fNumber(e.target.value))
                  setError('')
                }}
              />
              <span className="delivery-down-COD__icon-price">&#8363;</span>
            </div>
            <Text color="#FF424E" lineHeight={18} fontSize={12}>
              {error}
            </Text>
          </div>
        </div>
        <div className="delivery-down-COD__note">
          <div style={{margin: '4px 18px 0 0'}}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M7.99613 16C12.3809 16 16 12.3791 16 8C16 3.62089 12.3731 0 7.9884 0C3.61141 0 0 3.62089 0 8C0 12.3791 3.61914 16 7.99613 16ZM7.81054 9.59381C7.30788 9.59381 7.02948 9.3617 7.02948 8.89749V8.81238C7.02948 8.08511 7.44708 7.67505 8.01933 7.27273C8.69985 6.80077 9.03238 6.54545 9.03238 6.05029C9.03238 5.51644 8.62252 5.16054 7.9884 5.16054C7.52441 5.16054 7.18415 5.39265 6.92895 5.78723C6.68149 6.06576 6.56549 6.30561 6.1015 6.30561C5.72257 6.30561 5.41324 6.05803 5.41324 5.67118C5.41324 5.51644 5.44418 5.37718 5.49831 5.23791C5.7535 4.47969 6.68149 3.86074 8.06573 3.86074C9.50411 3.86074 10.7182 4.62669 10.7182 5.97292C10.7182 6.90135 10.2078 7.36557 9.40358 7.88395C8.89319 8.21663 8.59932 8.49516 8.57612 8.91296C8.57612 8.93617 8.56839 8.97486 8.56839 9.0058C8.54519 9.33849 8.25906 9.59381 7.81054 9.59381ZM7.8028 12.0696C7.27695 12.0696 6.84389 11.6905 6.84389 11.1799C6.84389 10.6692 7.26921 10.2901 7.8028 10.2901C8.32866 10.2901 8.75399 10.6692 8.75399 11.1799C8.75399 11.6983 8.32093 12.0696 7.8028 12.0696Z"
                fill="#1A94FF"
              />
            </svg>
          </div>
          <div>
            <Text as="h4" fontSize={14} lineHeight={22}>
              Lưu ý:
            </Text>
            <ul type="disc">
              <li>
                <div>
                &bull;
                </div>
                <div style={{marginLeft: '8px'}}> Chỉ có thể điều chỉnh COD đối với các đơn có đơn vị vận
                chuyển là J&T Express.</div>
              </li>
              <li>
                <div>&bull; </div><div style={{marginLeft: '8px'}}>Được điều chỉnh COD tối đa {' '}
                <span style={{color: '#1A94FF', fontWeight: 600}}>
                 3 lần  {' '}
                </span>
                từ lúc đơn chuyển sang trạng thái “Lấy hàng thành công” và trước khi chuyển sang trạng thái “Giao hàng thành công” hoặc “Chuyển hoàn”.
                </div>
              </li>
              <li><div>&bull; </div><div style={{marginLeft: '8px'}}>Giá trị COD điều chỉnh phải &gt; 0 và &lt; COD gốc</div></li>
            </ul>
          </div>
        </div>
        <div className="delivery-down-COD__footer">
          <Button
            appearance="ghost"
            size="sm"
            style={{minWidth: 110, marginRight: 8}}
            onClick={props.onClose}
          >
            Đóng
          </Button>
          <Button
            disabled={!value}
            onClick={handleUpdateCOD}
            className="delivery-down-COD__btn-update-cod"
          >
            Cập nhật COD
          </Button>
        </div>
      </div>
    </StyledDownCODPP>
  )
}

export const StyledDownCODPP = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;

  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(0, 0, 0, 0.25);

  .delivery-down-COD {
    &__container {
      position: relative;

      width: 600px;
      height: 402px;
      padding: 24px;

      overflow: hidden;

      background: #ffffff;
      border-radius: 8px;
      box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
    }

    &__bg {
      position: absolute;
      top: -38px;
      left: 13px;

      width: calc(100% - 26px);
      height: 172px;

      img {
        width: 100%;
        height: 100%;

        object-fit: contain;
        object-position: center;
      }
    }

    &__header {
      margin-bottom: 24px;
      padding-top: 8px;

      display: flex;
      align-items: center;

      text-align: center;
    }

    &__body {
      display: flex;
      height: 84px;
      justify-content: space-between;
      margin-bottom: 0.75rem;
    }

    &__note {
      width: 550px;
      height: 136px;
      display: flex;
      justify-content: flex-start;

      background: rgba(26, 148, 255, 0.1);
      border: 1px solid #1a94ff;
      border-radius: 6px;
      padding: 6.5px 12px;
      margin-bottom: 2rem;

      li {
        font-size: 14px;
        display: flex;
        ::marker {
          list-style-type: disc;
          font-size: 12px;
          display: inline-block;
        }
      }
    }

    &__style-input {
      position: relative;

      .border-error input {
        border: 1px solid #ff424e;
      }
    }

    &__icon-price {
      position: absolute;
      top: 12px;
      right: 10px;
    }

    &__footer {
      display: flex;
      justify-content: flex-end;
    }

    &__btn-update-cod {
      width: 110px;
      height: 32px;
      padding: 10.5px 6px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__banner {
      margin-bottom: 12px;

      svg {
        width: 44px;
        height: 44px;
      }
    }

    &__list {
      max-height: 276px;
      padding-right: 8px;

      overflow: auto;
    }

    &__item {
      padding: 12px 16px;

      display: flex;
      align-items: center;

      border-radius: 6px;

      transition: background 0.25s;

      &:hover {
        background: linear-gradient(
            0deg,
            rgba(244, 247, 252, 0.6),
            rgba(244, 247, 252, 0.6)
          ),
          #ffffff;

        .delivery-down-COD__cancel {
          display: block;
        }
      }
    }

    &__info {
      flex: 1;
    }

    &__action {
      position: relative;

      width: 28px;
      height: 28px;
      margin-left: 24px;

      &::before {
        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;

        border: 3px solid #f0f3f9;
        border-radius: 50%;

        content: '';
      }
    }

    &__loading {
      color: ${THEME_COLORS.primary_300}!important;
    }

    &__download {
      position: absolute;
      top: 50%;
      left: 50%;

      padding-top: 2px;

      transform: translate(-50%, -50%);

      cursor: pointer;
    }

    &__cancel {
      position: absolute;
      top: 50%;
      left: 50%;

      transform: translate(-50%, -50%);

      display: none;
    }
  }

  .input__input {
    &::placeholder {
      color: #9ca0ab;
      font-weight: 400;
    }
  }
`

