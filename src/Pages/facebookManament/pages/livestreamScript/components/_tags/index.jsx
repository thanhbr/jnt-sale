import {Text} from 'common/text'

export const FacebookLivestreamScript_Tags = ({list}) => {
  return (
    <>
      {list.map((item, i) => (
        <Text
          key={i}
          color="#717483"
          fontSize={10}
          fontWeight={500}
          lineHeight={18}
          style={{
            margin: '2px 4px 2px 0',
            padding: '3px 12px',
            background: '#EFF2F8',
            borderRadius: 4,
          }}
        >
          {item}
        </Text>
      ))}
    </>
  )
}
