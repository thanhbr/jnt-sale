import { useTranslation } from "react-i18next";

export default function CustomHeader({ ...props }) {
  const { t } = useTranslation();
  const { label } = props;
  if (label ==="inventory") return <div className="order-custom-header upos-header-cell-center">{label ? t(label) : ""}</div>;
  return <div className="order-custom-header">{label ? t(label) : ""}</div>;
}
