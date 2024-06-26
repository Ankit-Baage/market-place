import React from "react";
import { useNavigate } from "react-router-dom";
import vrp from "../../assets/vrp.svg";
import classes from "./vrpItem.module.css";

export const VrpItem = ({ item, index, totalItems, onClick }) => {
  const navigate = useNavigate();
  const id = "vrpDetail";

  const handleVrpDetail = (requestId) => {
    onClick(requestId);
  };
  return (
    <div className={classes.container}>
      <div
        className={classes.box}
        onClick={() => handleVrpDetail(item.request_id)}
      >
        <div className={classes.box__img}>
          <img src={vrp} alt="VRP" />
        </div>
        <div className={classes.box__info}>
          <div className={classes.box__info__content}>
            <div className={classes.box__info__container}>
              <div className={classes.box__info__id}>
                <h1 className={classes.box__info__id__title}>Lot ID:</h1>
                <h2 className={classes.box__info__id__number}>
                  #{item.lot_id}
                </h2>
              </div>
              <span className={classes.box__info__fav} />
            </div>
            <div className={classes.box__info__quant}>
              <h1 className={classes.box__info__id__title}>Total Phones:</h1>
              <h2 className={classes.box__info__id__number}>
                {item.total_phones}
              </h2>
            </div>
            <div className={classes.box__info__percent}>
              <div className={classes.box__info__quant}>
                <h1 className={classes.box__info__id__title}>ASP:</h1>
                <h2 className={classes.box__info__id__number}>
                  Rs.{item.ASP}
                </h2>
              </div>
              <div className={classes.box__info__quant}>
                <h1 className={classes.box__info__id__title}>P4:</h1>
                <h2 className={classes.box__info__id__number}>
                  {item.p4_percentage}%
                </h2>
              </div>
              <div className={classes.box__info__quant}>
                <h1 className={classes.box__info__id__title}>Apple:</h1>
                <h2 className={classes.box__info__id__number}>
                  {item.apple_percentage}%
                </h2>
              </div>
            </div>
            {item["5g_percentage"] && (
              <div className={classes.box__info__quant}>
                <h1 className={classes.box__info__id__title}>5G Phones:</h1>
                <h2 className={classes.box__info__id__number}>
                  {item["5g_percentage"]}%
                </h2>
              </div>
            )}

            <div className={classes.box__discount}>
              <div className={classes.box__discount__container}>
                
                <h3 className={classes.box__discount__container__price__disc}>
                  Rs.{item.rate_card}
                </h3>
                <h3 className={classes.box__discount__container__price}>
                  Rs.{item.original_price}
                </h3>
              </div>
              <span className={classes.box__discount__img}>
                {item.discount_percentage}% DISCOUNT
              </span>
            </div>
          </div>

          <div className={classes.box__info__btns}>
            <button className={classes.box__info__btns__cart}>
              Add to Cart
            </button>
            <button className={classes.box__info__btns__buy}>Buy Now</button>
          </div>
        </div>
      </div>

      {index === totalItems - 1 ? null : (
        <hr className={classes.box__item__divider} />
      )}
    </div>
  );
};
