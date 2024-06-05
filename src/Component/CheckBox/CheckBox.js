import { useTranslation } from "react-i18next";

export default function CheckBox({ ...props }) {
  const {
    status,
    onCallBack = () => {},
    pathCheck = "/svg/grid-check.svg",
    pathUncheck = "/svg/grid-uncheck.svg",
    text = "content",
  } = props;
  const { t } = useTranslation();
  return (
    <div
      className="checkbox-wrapper"
    >
      <img className="cursor-pointer" onClick={() => onCallBack(!!status)} src={!!status ? pathCheck : pathUncheck} />
      <div className="cursor-pointer upos-text" onClick={() => onCallBack(!!status)}>{t(text)}</div>
    </div>
  );
}
