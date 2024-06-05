import {sendRequestAuth} from 'api/api'
import {AUTO_COMPLETE_ICONS} from 'common/form/autoComplete/_icons'
import {Input} from 'common/form/input'
import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import config from 'config'
import {BULK_ORDER_ICONS} from 'Pages/bulkOrder/interface/_icons'
import {getArrayFromValue} from 'Pages/bulkOrder/utils/array'
import {useEffect, useState} from 'react'
import styled from 'styled-components'

export const SuggestNote = ({onChange, ...props}) => {
  const [noteList, setNoteList] = useState([])
  const [noteKeyword, setNoteKeyword] = useState('')

  const [shouldOpenMenu, setShouldOpenMenu] = useState(false)

  const handleNoteKeywordChange = async val => {
    setNoteKeyword(val)

    const response = await sendRequestAuth(
      'get',
      `${
        config.API
      }/setting/delivery-note/list?keyword=${val.trim()}&status=1&per_page=20&start=0`,
    )

    if (response?.data?.success)
      setNoteList(getArrayFromValue(response?.data?.data))
  }

  const handleChange = val => {
    if (onChange) onChange(val)
    setShouldOpenMenu(false)
  }

  useEffect(() => {
    handleNoteKeywordChange('')
  }, [])

  return (
    <StyledSuggestNote {...props}>
      <span
        className="suggest-note__toggle"
        onClick={() => setShouldOpenMenu(true)}
      >
        {BULK_ORDER_ICONS.note}
      </span>
      {shouldOpenMenu && (
        <>
          <div
            className="suggest-note__backdrop"
            onClick={() => setShouldOpenMenu(false)}
          ></div>
          <div className="suggest-note__menu common-scrollbar">
            <div className="suggest-note__header">
              <Input
                icon={AUTO_COMPLETE_ICONS.search}
                placeholder="Tìm mẫu ghi chú"
                value={noteKeyword}
                onChange={e => handleNoteKeywordChange(e.target.value)}
              />
            </div>
            {noteList.length > 0 ? (
              <div className="suggest-note__menu-list">
                {noteList.map(item => (
                  <div
                    key={item.id}
                    className="suggest-note__menu-item"
                    onClick={() => handleChange(item?.content)}
                  >
                    {item?.content || '---'}
                  </div>
                ))}
              </div>
            ) : (
              <div className="suggest-note__empty">
                <img
                  src="/img/empty-multiple-choice.png"
                  alt="empty"
                  width={80}
                  height={80}
                  style={{
                    marginBottom: 16,
                    objectFit: 'contain',
                    objectPosition: 'center',
                  }}
                />
                <Text fontSize={13} lineHeight={18}>
                  {!!noteKeyword.trim()
                    ? 'Không tìm thấy mẫu ghi chú'
                    : 'Bạn chưa có mẫu ghi chú nào'}
                </Text>
              </div>
            )}
          </div>
        </>
      )}
    </StyledSuggestNote>
  )
}

const StyledSuggestNote = styled.span`
  position: relative;

  .suggest-note {
    &__toggle {
      width: 20px;
      height: 20px;

      cursor: pointer;

      svg {
        width: 20px;
        height: 20px;
      }
    }

    &__backdrop {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10;

      width: 100vw;
      height: 100vh;
    }

    &__menu {
      position: absolute;
      bottom: 100%;
      right: 0;
      z-index: 11;

      width: 436px;
      max-height: 286px;
      margin-bottom: 16px;
      padding: 0 20px;

      overflow: auto;

      background: #fff;
      border-radius: 6px;
      box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
    }

    &__header {
      position: sticky;
      top: 0;

      height: 70px;
      padding: 20px 0 16px 0;

      background: #fff;
    }

    &__menu-item {
      width: 100%;
      height: 20px;
      margin-bottom: 24px;

      overflow: hidden;
      white-space: nowrap;

      color: #151624;
      font-size: 14px;
      line-height: 20px;
      text-overflow: ellipsis;

      transition: color 0.25s;

      cursor: pointer;

      &:hover {
        color: ${THEME_COLORS.primary_300};
      }
    }

    &__empty {
      height: 200px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
`
