import React from "react";
import classes from "./order.module.css";
import { formatDate, formatNumber } from "../../utils/helpers/formatNumber";

export const Order = ({ order }) => {
  return (
    <div className={classes.box}>
      <div className={classes.box__upper}>
        <div className={classes.box__upper__order}>
          <div className={classes.box__upper__order__info}>
            <h1 className={classes.box__upper__order__info__key}>Order:</h1>
            <h1 className={classes.box__upper__order__info__value}>
              #{order.order_id}
            </h1>
          </div>
          <div className={classes.box__upper__order__info}>
            <h1 className={classes.box__upper__order__info__key}>
              No of items :
            </h1>
            <h1 className={classes.box__upper__order__info__value}>
              {order.num_of_items}
            </h1>
          </div>
        </div>
        <div className={classes.box__upper__order__date}>
          <h1 className={classes.box__upper__order__date__text}>
            {formatDate(order.ordered_on)}
          </h1>
          <span className={classes.box__expand}></span>
        </div>
      </div>
      <hr className={classes.box__sep} />
      <div className={classes.box__upper}>
        <div className={classes.box__upper__order__info}>
          <h1 className={classes.box__upper__order__info__key__amt}>
            Total Amt:
          </h1>
          <h1 className={classes.box__upper__order__info__value__amt}>
            Rs {formatNumber(order.total_amount)}
          </h1>
        </div>

        <div className={classes.box__downLoad}>
          <span className={classes.box__downLoad__icon} />
          <h3 className={classes.box__downLoad__text}>Download Invoice</h3>
        </div>
      </div>
    </div>
  );
};
