export default function ItemGuild({ ...rest }) {
  const { data } = { ...rest };
  return (
    <div className="time-line-guide">
      <div className="line-time-wrapper">
        <div className="circle-time" />
        <div className="line-time" />
      </div>
      <div className="content-time-line">
        <div className="date-time">
          <div className="date-wrapper">
            <img src="svg/date.svg" />
            <div className="date upos-text">{data && data.date}</div>
          </div>
          <div className="time-wrapper">
            <img src="svg/time.svg" />
            <div className="time upos-text">{data && data.time}</div>
          </div>
        </div>
        <div className="content upos-text">{data && data.content}</div>
      </div>
    </div>
  );
}
