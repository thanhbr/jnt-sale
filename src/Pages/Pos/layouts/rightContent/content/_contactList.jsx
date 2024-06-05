import React, {useRef} from 'react';
import {CircularProgress} from "@mui/material";
import {Text} from "../../../../../common/text";
import StringUtils from "../../../../orderSingle/utils/string";
import styled from "styled-components";
import {THEME_COLORS} from "../../../../../common/theme/_colors";

export const ContactList = ({
                       data,
                       isExistOriginData,
                       isLoading,
                       isLoadMore,
                       value,
                       onClose,
                       onSelect,
                       ...props
                     }) => {

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
          <div className="contact-list__loading">
            <CircularProgress
              className="contact-list__spinner"
              color="success"
              size={54}
              thickness={5}
            />
            <Text style={{marginTop: 5}}>Loading...</Text>
          </div>
        ) : (
          <>
            <div ref={menuList} className="contact-list__list">
              {data?.length > 0
                ? data.map(item => (
                  <div
                    key={item?.value}
                    className="contact-list__item"
                    onClick={() => handleSelect(item)}
                  >
                    <div className="contact-list__avatar">
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
                    <div className="contact-list__info">
                      <Text className="contact-list__name">
                        {item?.name || '---'}
                      </Text>
                      <Text color="#7C88A6" fontSize={13}>{item?.data?.mobile || '---'}</Text>
                    </div>
                  </div>
                ))
                : <div className={'contact-list__empty'}>
                    <img src={'/img/pos/empty-state.png'}/>
                     <Text as={'p'} style={{marginTop: 12}}>Không tìm thấy khách hàng nào</Text>
                  </div>
              }
              {isLoadMore && !isLoading && (
                <div className="contact-list__load-more">
                  <CircularProgress
                    className="contact-list__spinner"
                    color="success"
                    size={48}
                    thickness={4}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </StyledOrderSingleContactList>
    </>
  )
}

const StyledOrderSingleContactList = styled.div`
  width: calc(100% + 16px);
  margin: 0 -8px;

  position: relative;

  .contact-list {
     &__empty {
      height: 220px;
     }
    &__loading {
      min-height: 260px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    &__load-more {
      padding: 16px 0;

      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__spinner {
      position: relative;

      overflow: hidden;

      border-radius: 50%;

      &::before {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;

        width: 100%;
        height: 100%;

        border: 6px solid #c7e6e5;
        border-radius: 50%;

        content: '';
      }

      svg {
        position: relative;
        z-index: 2;

        color: ${THEME_COLORS.primary_300};
      }
    }

    &__item {
      min-height: 48px;
      padding: 4px 8px;
      margin-bottom: 16px;

      display: flex;

      border-radius: 4px;

      cursor: pointer;

      transition: background 0.25s;

      &:last-child {
        margin-bottom: 0;
      }

      &:hover {
        background: #f3f6fc;
      }
      &[data-hover="true"] {
        background: #f3f6fc;
      }
    }

    &__avatar {
      width: 32px;
      height: 32px;
      margin: 4px 12px 0 0;

      display: flex;
      align-items: center;
      justify-content: center;

      background: ${THEME_COLORS.primary_300};
      border-radius: 50%;
    }

    &__info {
      flex: 1;
    }

    &__name {
      display: -webkit-box;
      overflow: hidden;

      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }

    &__empty {
      min-height: 150px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    &__footer {
      position: sticky;
      bottom: 0;

      width: 100% !important;
      height: 48px;
      padding: 0 4px;

      display: flex;
      align-items: center;

      background: #fff;

      transform: translateY(12px);
    }
  }
`

