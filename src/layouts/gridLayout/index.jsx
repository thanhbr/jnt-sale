import {Text} from 'common/text'
import {Fragment} from 'react'
import {useEffect} from 'react'
import {useState} from 'react'
import {StyledGridLayout} from './_styled'

export const GridLayout = ({
  header,
  headerProps,
  grid,
  gridProps,
  ...props
}) => {
  return (
    <StyledGridLayout {...props}>
      {!!header && (
        <div
          {...headerProps}
          className={`grid-layout__header ${headerProps?.className || ''}`}
        >
          {header}
        </div>
      )}
      {Array.isArray(grid) && grid.length > 0 && (
        <div
          {...gridProps}
          className={`grid-layout__container ${gridProps?.className || ''}`}
        >
          {grid.map((column, i) => (
            <div
              {...column?.props}
              key={i}
              className={`grid-layout__column ${column?.className || ''}`}
              style={{
                width: `${column?.width || 100}%`,
                ...column?.props?.style,
              }}
            >
              {Array.isArray(column?.sections) &&
              column.sections.map((section, j) =>
                section ? (
                  <Section key={j} data={section} {...section?.props} />
                ) : (
                  <></>
                ),
              )}
            </div>
          ))}
        </div>
      )}
    </StyledGridLayout>
  )
}

const Section = ({data, ...props}) => {
  const [shouldTransparent, setShouldTransparent] = useState(false)

  const handleWrapperScroll = () => {
    const wrapper = document.querySelector('#content-wrap')
    if (!wrapper) return

    const clientHeight = wrapper.clientHeight
    const scrollHeight = wrapper.scrollHeight
    const scrollTop = wrapper.scrollTop

    setShouldTransparent(clientHeight + scrollTop > scrollHeight - 50)
  }

  useEffect(() => {
    if (data?.type === 'sticky-bottom-transparent') {
      const wrapper = document.querySelector('#content-wrap')
      if (!wrapper) return

      wrapper.addEventListener('scroll', handleWrapperScroll)

      return () => wrapper.removeEventListener('scroll', handleWrapperScroll)
    }
  }, [data?.type])

  return (
    <div
      {...props}
      className={`grid-layout__section ${props?.className || ''}`}
      style={{
        width: `calc(${data?.width || 100}% - 24px)`,
        padding: '24px 24px 0 24px',
        background: shouldTransparent ? 'transparent' : '#fff',
        ...props?.style,
      }}
    >
      {[!!data?.title, !!data?.description].includes(true) && (
        <div className="grid-layout__section-header">
          {!!data?.title && (
            <Text as="h3" fontSize={18} lineHeight={25} style={{width: '100%'}}>
              {data.title}
            </Text>
          )}
          {!!data?.description && (
            <Text
              {...props?.descriptionProps}
              as={props?.descriptionProps?.as || 'p'}
              color={props?.descriptionProps?.color || '#7C88A6'}
              fontSize={props?.descriptionProps?.fontSize || 15}
              lineHeight={props?.descriptionProps?.lineHeight || 21}
              style={{marginTop: 12, ...props?.descriptionProps?.style}}
            >
              {data.description}
            </Text>
          )}
          {Array.isArray(data?.actions) && data.actions.length > 0 && (
            <div
              className="grid-layout__section-header-actions"
              {...data?.actionProps}
            >
              {data.actions.map((item, i) => (
                <Fragment key={i}>{item}</Fragment>
              ))}
            </div>
          )}
        </div>
      )}
      {!!props?.children && (
        <div
          className={`grid-layout__section-container ${props?.className || ''}`}
        >
          {props.children}
        </div>
      )}
    </div>
  )
}
