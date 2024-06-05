import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import { STATUS_SERVICE } from "../../const/service";

const useStyles = makeStyles({
  root: {
    minWidth: 96,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
function RenderIconLeft(params) {
  const {status} = params;
  switch (status) {
    case STATUS_SERVICE.EXPIRE:
      return <img src="/svg/arr-expire.svg" />;
    case STATUS_SERVICE.NOT_REGISTER:
      return <img src="/svg/arr-current.svg" />;
    case STATUS_SERVICE.REGISTED:
      return <img src="/svg/arr-current.svg" />;
    default:
      return <img src="/svg/arr-current.svg" />;
  }
}
function onClickButton(params) {}
function RenderButtonRight(data) {
  const { t } = useTranslation();
  switch (data.status) {
    case STATUS_SERVICE.EXPIRE:
      return (
        <div className="button-item-service cursor-pointer upos-text extend">
          {t("extend")}
        </div>
      );
    case STATUS_SERVICE.NOT_REGISTER:
      return (
        <div className="button-item-service cursor-pointer upos-text not-register">
          {t("register")}
        </div>
      );
    case STATUS_SERVICE.REGISTED:
      return (
        <div className="button-item-service cursor-pointer upos-text register">
          {t("register")}
        </div>
      );
    default:
      break;
  }
}
function caclClassNameRoot(data) {
  switch (data.status) {
    case STATUS_SERVICE.EXPIRE:
      return "item-service-expire";
    case STATUS_SERVICE.NOT_REGISTER:
      return "item-service-not-register";
    case STATUS_SERVICE.REGISTED:
      return "item-service-register";
    default:
      return "item-service-not-register";
  }
}
export default function ItemService({ children, ...rest }) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const props = { ...rest };
  const { data } = props;
  const { t } = useTranslation();
  return (
    <div className={caclClassNameRoot(data)}>
      <div className="header-item-service">
        <div className="title-item-service ">
          {data.display_name || "--"}
        </div>
        <div className="feature-item-service">
          <div className="feature-item-service-1 ">
            {RenderIconLeft(data)}{" "}
            {(data.feature[0] && data.feature[0].feature_1) || "--"}
          </div>
          <div className="feature-item-service-2 ">
            {RenderIconLeft(data)}{" "}
            {(data.feature[1] && data.feature[1].feature_2) || "--"}
          </div>
        </div>
      </div>
      <div className="bottom-item-service">
        <div className="price-item-service ">{data.price || "--"}</div>
        {RenderButtonRight(data)}
      </div>
    </div>
  );
}
