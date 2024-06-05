import {CategoryDateTimeRangePicker} from 'common/form/datePicker/_categoryDateTimeRangePicker'
import useBulkOrderFilter from 'Pages/bulkOrder/hooks/useBulkOrderFilter'

export const BulkOrderFilterDateTime = ({...props}) => {
  const {dateTime} = useBulkOrderFilter()
  const {data, properties, methods} = dateTime

  return (
    <CategoryDateTimeRangePicker
      {...props}
      categoryList={[]}
      categoryValue={{name: 'Thời gian tải lên', value: ''}}
      categoryWidth={115}
      value={data.value}
      triggerDefault={data.trigger}
      onChange={methods.onChange}
      datePickerProps={{
        defaultValue: [data.start, data.end],
        disabledDate: properties.allowRangeDate,
        placeholder: 'dd/mm/yyyy hh:mm ~ dd/mm/yyyy hh:mm',
      }}
    />
  )
}
