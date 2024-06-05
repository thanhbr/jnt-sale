import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import {Option} from 'common/form/autoComplete/_option'
import useFacebookFilterForm from "../../hooks/useFacebookFilterForm";
export const OrderFacebookStatus = () => {
    const {orderStatus} = useFacebookFilterForm()
    return (
        <AlternativeAutoComplete
            className="order-filter-facebook-form__input-wide"
            // main input
            inputProps={{
                categoryList: [{name: 'Trạng thái đơn hàng', value: ''}], // menu list in category dropdown
                categoryWidth: 140,
                placeholder: 'Chọn trạng thái',
                readOnly: true,
                value:
                    orderStatus.value.length > 0
                        ? `Đã chọn ${orderStatus.value.length}`
                        : '',
                onIconClick: orderStatus.onInputReset,
            }}
            // menu
            menuProps={{
                empty:
                    orderStatus.list.length <= 0
                        ? orderStatus.tab === 'all'
                        ? 'Không tìm thấy trạng thái đơn hàng'
                        : 'Bạn chưa chọn trạng thái đơn hàng nào'
                        : '',
                multipleChoices: true,
                onReset: orderStatus.onInputReset, // only use this prop for multiple choice
            }}
            // search input in dropdown menu
            searchInputProps={{
                placeholder: 'Tìm kiếm trạng thái đơn hàng',
                value: orderStatus.keyword,
                onChange: orderStatus.onKeywordChange,
            }}
            // tab list <only use this prop for multiple choices>
            tabProps={{
                active: orderStatus.tab,
                checkedNumber: orderStatus.value.length,
                onChange: orderStatus.onTabChange,
            }}
        >
            {orderStatus.list.length > 0 &&
            orderStatus.list.map(item => (
                <Option
                    key={item.value}
                    className="order-filter-facebook-form__option-text"
                    checked={
                        !!orderStatus.value.find(find => find.value === item.value)
                    }
                    multipleChoices={true}
                    onClick={() => orderStatus.onChange(item)}
                >
                    {item.name}
                </Option>
            ))}
        </AlternativeAutoComplete>

    )
}