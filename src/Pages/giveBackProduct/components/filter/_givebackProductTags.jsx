import React from 'react';
import styled from "styled-components";
import {THEME_SEMANTICS} from "../../../../common/theme/_semantics";
import {Text} from "../../../../common/text";
import {GIVEBACK_PRODUCT_ICONS} from "../../interfaces/icon";
import useHeaderGivebackProduct from "../../hooks/useHeaderGivebackProduct";
import {formatDatetime} from "../../../../common/form/datePicker/_functions";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";

const GivebackProductTags = () => {
  const {t} = useTranslation()
  const { filter, functions } = useHeaderGivebackProduct()
  return (
    <>
      {!!filter?.dateTime?.activeValue && (
        <StyledOrderTag>
          <div>
            <Text>{t(DISPLAY_NAME_MENU.GENERAL.DATE_CREATED)}: {formatDatetime(filter?.dateTime?.activeValue[0])} ~ {formatDatetime(filter?.dateTime?.activeValue[1])}</Text>
            <div className="giveback-product-tag__delete"
              onClick={() => functions?.handleDeleteTag('date')}
            >
              {GIVEBACK_PRODUCT_ICONS.x}
            </div>
          </div>
        </StyledOrderTag>
      )}
      {!!filter?.warehouse?.activeValue?.id && (
        <StyledOrderTag>
          <div>
            <Text>{t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.WAREHOUSE_EXPORT)}: {filter?.warehouse?.activeValue?.warehouse_name}</Text>
            <div className="giveback-product-tag__delete"
                 onClick={() => functions?.handleDeleteTag('warehouse')}
            >
              {GIVEBACK_PRODUCT_ICONS.x}
            </div>
          </div>
        </StyledOrderTag>
      )}
      {!!filter?.receivingState?.activeValue?.id && (
        <StyledOrderTag>
          <div>
            <Text>{t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.REFUND_STATUS)}: {t(filter?.receivingState?.activeValue?.name)}</Text>
            <div className="giveback-product-tag__delete"
                 onClick={() => functions?.handleDeleteTag('status')}
            >
              {GIVEBACK_PRODUCT_ICONS.x}
            </div>
          </div>
        </StyledOrderTag>
      )}
      {(!!filter?.dateTime?.activeValue || !!filter?.warehouse?.activeValue?.id || !!filter?.receivingState?.activeValue?.id) && (
        <Text
          as="b"
          color={THEME_SEMANTICS.delivering}
          lineHeight={28}
          style={{cursor: 'pointer'}}
          onClick={() => functions?.handleDeleteTag('all')}
        >
          {t(DISPLAY_NAME_MENU.GENERAL.RESET_TO_DEFAULT)}
        </Text>
      )}
    </>
  )
}

export default GivebackProductTags

const StyledOrderTag = styled.li`
  position: relative;

  margin: 0 12px 12px 0;
  padding: 2px 28px 2px 12px;

  display: inline-block;

  background: rgba(229, 16, 29, 0.1);
  border-radius: 6px;

  .giveback-product-tag {
    &__delete {
      position: absolute;
      top: 4px;
      right: 8px;

      width: 16px;
      height: 16px;

      border-radius: 6px;

      transition: all 0.25s;

      cursor: pointer;

      &:hover {
        background: ${THEME_SEMANTICS.failed};

        svg {
          color: #fff;

          path[stroke] {
            stroke: #fff;
          }

          path[fill] {
            fill: #fff;
          }
        }
      }
    }
  }
`
