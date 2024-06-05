import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import {Option} from 'common/form/autoComplete/_option'
import useFacebookLiveStreamScript from '../../hooks/useFacecbookLivestreamScript'

export const FacebookLivestreamScript_FanpageAutocomplete = ({...props}) => {
  const {data, fanpageMethods} = useFacebookLiveStreamScript()
  const {fanpage} = data.filter

  return (
    <AlternativeAutoComplete
      {...props}
      className="livestream-filter-form__input-wide"
      // main input
      inputProps={{
        categoryList: [{name: 'Trang áp dụng', value: ''}], // menu list in category dropdown
        categoryWidth: 110,
        placeholder: 'Chọn trang',
        readOnly: true,
        value:
          fanpage.value.length > 0 ? `Đã chọn ${fanpage.value.length}` : '',
        onIconClick: fanpageMethods.onReset,
      }}
      // menu
      menuProps={{
        empty:
          fanpage.list.length <= 0
            ? fanpage.tab === 'all'
              ? 'Không tìm thấy trang'
              : 'Bạn chưa chọn trang nào'
            : '',
        multipleChoices: true,
        onReset: fanpageMethods.onReset, // only use this prop for multiple choice
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: 'Tìm kiếm trang của bạn',
        value: fanpage.keyword,
        onChange: fanpageMethods.onKeywordChange,
      }}
      // tab list <only use this prop for multiple choices>
      tabProps={{
        active: fanpage.tab,
        checkedNumber: fanpage.value.length,
        onChange: fanpageMethods.onTabChange,
      }}
      submitProps={{onSubmit: fanpageMethods.onSubmit}}
    >
      {fanpage.list.length > 0 &&
        fanpage.list.map(item => (
          <Option
            key={item.page_id}
            checked={!!fanpage.value.find(find => find?.value === item?.value)}
            multipleChoices={true}
            style={{marginBottom: 8}}
            onClick={() => fanpageMethods.onChange(item)}
          >
            <div
              style={{
                minHeight: 52,
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <img
                src={item?.data?.page_avatar}
                alt={item?.data?.page_name}
                style={{
                  width: 44,
                  height: 44,
                  marginRight: 12,
                  borderRadius: '50%',
                }}
              />
              <span style={{flex: 1, fontSize: 14}}>
                {item?.data?.page_name}
              </span>
            </div>
          </Option>
        ))}
    </AlternativeAutoComplete>
  )
}
