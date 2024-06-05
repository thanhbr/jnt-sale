export default function TabView({...rest}) {
  try {
    const {selected = {}, t, list = [], cb, path, child} = rest
    const onChangTabView = item => {
      if (cb && typeof cb === 'function') {
        cb(item)
      }
    }
    return (
      <div className="tabview-wrapper">
        {list.map((item, index) => {
          const isSelect =
            item.value === selected || item.value === selected.value
          return (
            <>
              <div
                key={index}
                className={
                  isSelect
                    ? 'item-tabview-wrapper active-tab'
                    : 'item-tabview-wrapper'
                }
              >
                <div
                  onClick={ele => {
                    onChangTabView(item)
                  }}
                  className="item-tabview-label upos-text-header"
                >
                  {t(item.label)}
                </div>
              </div>
              <div className="upos-tabview-empty" />
            </>
          )
        })}
        {child || null}
      </div>
    )
  } catch (error) {
    console.error(`================${error}`)
  }
}
