import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {Tooltip} from 'common/tooltip'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import styled from 'styled-components'
import CountUp from 'react-countup'
import {useTranslation} from "react-i18next";

export const ForControlCODPanel = ({
  currency,
  title,
  titleTooltip,
  value,
  orderNumb,
  ...props
}) => {
  const { t } = useTranslation()
  return (
    <StyledOrderPanel {...props}>
      <div className="order-panel__heading">
        <div>
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="40"
              height="40"
              rx="8"
              fill="#00AB56"
              fill-opacity="0.15"
            />
            <path
              d="M27.9609 15.5315C27.9589 15.5315 27.9569 15.5307 27.9554 15.5292C27.954 15.5278 27.9531 15.5258 27.9531 15.5237C27.8402 15.3315 27.6785 15.1724 27.4844 15.0628L20.6094 11.1956C20.4231 11.0916 20.2133 11.037 20 11.037C19.7867 11.037 19.5769 11.0916 19.3906 11.1956L12.5156 15.0628C12.3215 15.1724 12.1598 15.3315 12.0469 15.5237C12.0469 15.5258 12.0461 15.5278 12.0446 15.5292C12.0431 15.5307 12.0411 15.5315 12.0391 15.5315V15.5471C11.9311 15.7292 11.8744 15.9371 11.875 16.1487V23.8518C11.8754 24.0745 11.9349 24.2931 12.0475 24.4853C12.16 24.6775 12.3216 24.8363 12.5156 24.9456L19.3906 28.8128C19.5637 28.9072 19.7561 28.9606 19.9531 28.969H20.0625C20.2545 28.9605 20.4418 28.907 20.6094 28.8128L27.4844 24.9456C27.6784 24.8363 27.84 24.6775 27.9525 24.4853C28.0651 24.2931 28.1246 24.0745 28.125 23.8518V16.1487C28.1261 15.9321 28.0695 15.719 27.9609 15.5315ZM20 12.2815L26.2266 15.7815L23.8359 17.1409L17.5313 13.6643L20 12.2815ZM20.0703 19.2815L13.7813 15.7815L16.25 14.3909L22.5625 17.8675L20.0703 19.2815ZM20.6328 27.3675L20.6953 20.3675L23.2031 18.9378V21.9143C23.2031 22.0801 23.269 22.2391 23.3862 22.3563C23.5034 22.4735 23.6624 22.5393 23.8281 22.5393C23.9939 22.5393 24.1529 22.4735 24.2701 22.3563C24.3873 22.2391 24.4531 22.0801 24.4531 21.9143V18.2268L26.875 16.8518V23.8518L20.6328 27.3675Z"
              fill="#00AB56"
            />
          </svg>
        </div>
        <div className="order-panel__quantity">
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Text fontSize={14} fontWeight={600} lineHeight={20}>
              {title}
            </Text>
            {titleTooltip && (
              <Tooltip placement="bottom" title={titleTooltip}>
                <span style={{display: 'flex', alignItems: 'center'}}>
                  {ORDER_ICONS.question}
                </span>
              </Tooltip>
            )}
          </div>

          <Text color="#7C88A6" fontSize={12}>
            {orderNumb} {t("order_")}
          </Text>
        </div>
      </div>

      <Text
        as="h4"
        color={THEME_COLORS.secondary_100}
        fontSize={16}
        lineHeight={22}
        className="countup"
      >
        <CountUp start={0} end={value} duration={1} separator="," /> {currency}
      </Text>
    </StyledOrderPanel>
  )
}

const StyledOrderPanel = styled.div`
  padding: 8px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  .order-panel {
    &__heading {
      margin-bottom: 4px;

      display: flex;
      align-items: center;
      justify-content: flex-start;

      svg {
        margin-left: 4px;

        transform: translateY(2px);
      }
    }

    &__quantity {
      display: gird;
      margin-left: 12px;
    }
  }
`
