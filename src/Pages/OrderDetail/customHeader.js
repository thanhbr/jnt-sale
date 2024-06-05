import { useTranslation } from "react-i18next";

export default function CustomHeader({ ...props }) {
  console.log("custom header create");
  const { t } = useTranslation();
  const { label } = props;
  return <div className="order-custom-header">{label ? t(label) : ""}</div>;
}
