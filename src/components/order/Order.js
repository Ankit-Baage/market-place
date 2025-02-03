import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import classes from "./order.module.css";
import { formatDate, formatNumber } from "../../utils/helpers/formatNumber";
import useGetOrderDetail from "../../tanstack-query/orderDetail/useGetOrderDetail";
import returnImage from "../../assets/return.png";

export const Order = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [openShipments, setOpenShipments] = useState({});
  const { data, isSuccess } = useGetOrderDetail(selectedOrderId);

  const shipments = useMemo(() => {
    if (isSuccess && data?.data?.data) {
      return Object.entries(data.data.data).map(([key, value], index) => ({
        id: index + 1, // Adding 'id' as index + 1
        title: key.replace("_", " "), // Format title by replacing underscores with spaces
        ...value, // Spread the properties from the inner object
      }));
    }
    return []; // Return an empty array if data is not available
  }, [isSuccess, data?.data?.data]);
  const handleToggleDropdown = () => {
    setIsExpanded((prev) => {
      if (!prev) {
        setSelectedOrderId(order.id); // Set order ID for expanded dropdown
      } else {
        setSelectedOrderId(null); // Reset order ID when collapsing
      }
      return !prev; // Toggle the expanded state
    });
  };

  const handleToggleSubDropdown = (id) => {
    setOpenShipments((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Toggle the open state for the specific shipment
    }));
  };
  console.log(shipments ? shipments : null);
  return (
    <motion.div className={classes.box}>
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

          {/* <div className={classes.box__return}>
            <hr className={classes.box__sep} />
            <div className={classes.box__return__info}>
              <img
                src={returnImage}
                alt="return"
                className={classes.box__return__info__img}
              />
              <h3 className={classes.box__return__info__title}>
                3 days left to return
              </h3>
            </div>
          </div> */}
        </div>
        <div className={classes.box__upper__order__date}>
          <h1 className={classes.box__upper__order__date__text}>
            {formatDate(order.ordered_on)}
          </h1>
          <span
            className={classes.box__expand}
            onClick={handleToggleDropdown}
          />
        </div>
      </div>

      {shipments.map((shipment) => (
        <motion.div
          className={classes.box__content}
          key={shipment.id}
          initial={{ height: 0, opacity: 0 }}
          animate={
            isExpanded
              ? { height: "auto", opacity: 1 }
              : { height: 0, opacity: 0 }
          }
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={classes.box__content__info}>
            <h1 className={classes.box__content__info__title}>
              {shipment.title}
            </h1>
            <div className={classes.box__content__info__box}>
              <h2
                className={classes.box__content__info__box__status}
                style={{
                  backgroundColor:
                    shipment.status === "pending"
                      ? "#FBE8B3"
                      : shipment.status === "shipped"
                      ? "#D0F1FF"
                      : shipment.status === "outfordelivery"
                      ? "#EFEFEF"
                      : shipment.status === "order placed"
                      ? "#E4FDEF"
                      : "transparent", // Default background color
                  color:
                    shipment.status === "pending"
                      ? "#F2B200"
                      : shipment.status === "shipped"
                      ? "#27BEFC"
                      : shipment.status === "outfordelivery"
                      ? "#4A4C5F"
                      : shipment.status === "order placed"
                      ? "#46CD80"
                      : "inherit", // Default text color
                }}
              >
                {shipment.status}
              </h2>

              <span
                className={classes.box__content__expand}
                onClick={() => handleToggleSubDropdown(shipment.id)}
              />
            </div>
          </div>
          <motion.div
            className={classes.box__content__detail__info}
            initial={{ height: 0, opacity: 0 }}
            animate={
              openShipments[shipment.id]
                ? { height: "auto", opacity: 1 }
                : { height: 0, opacity: 0 }
            }
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={classes.box__content__detail__item__shipment}>
              <h2
                className={classes.box__content__detail__item__info__shipment}
              >
                {shipment.category}
              </h2>
              <h2
                className={classes.box__content__detail__item__info__shipment}
              >
                {shipment.quantity}
              </h2>
              <h2
                className={classes.box__content__detail__item__info__shipment}
              >
                Rs {formatNumber(shipment.total)}
              </h2>
            </div>
            {shipment.items.map((item) => (
              <div key={item.id} className={classes.box__content__detail__item}>
                <h2 className={classes.box__content__detail__item__info}>
                  {item.category_id === 5 ? item.lot_id : item.item}
                </h2>
                <h2 className={classes.box__content__detail__item__info}>
                  {item.qty}
                </h2>
                <h2 className={classes.box__content__detail__item__info}>
                  Rs {formatNumber(item.price)}
                </h2>
              </div>
            ))}
          </motion.div>
          <hr className={classes.box__sep} />
        </motion.div>
      ))}

      {!isExpanded && <hr className={classes.box__sep} />}

      <div className={classes.box__upper}>
        <div className={classes.box__upper__order__info}>
          <h1 className={classes.box__upper__order__info__key__amt}>
            Total Amt:
          </h1>
          <h1 className={classes.box__upper__order__info__value__amt}>
            Rs {formatNumber(order?.total_amount)}
          </h1>
        </div>
        {order.is_invoice === 1 ? (
          <div className={classes.box__downLoad}>
            <span className={classes.box__downLoad__icon} />
            <h3 className={classes.box__downLoad__text}>Download Invoice</h3>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
};
