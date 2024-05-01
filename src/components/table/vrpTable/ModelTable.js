import React from "react";
import classes from "./modelTable.module.css";

export const ModelTable = ({ transformedModelTable, tableHeaders, onOpen }) => {
  const handleExpand = () => {
    onOpen();
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <div className={classes.box__table}>
          <table className={classes.box__modelTable}>
            <thead className={classes.box__modelTable__head}>
              <tr className={classes.box__modelTable__head__row}>
                {tableHeaders.map((header) => (
                  <th
                    key={header}
                    className={classes.box__modelTable__head__row__cell}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={classes.box__modelTable__body}>
              {transformedModelTable.map((row, index) => (
                <tr key={index} className={classes.box__modelTable__body__row}>
                  {tableHeaders.map((header) => (
                    <td
                      key={header}
                      className={classes.box__modelTable__body__row__data}
                    >
                      {row[header]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className={classes.box__table__btn} onClick={handleExpand}>
          <span className={classes.box__table__btn__img} />{" "}
          <h5 className={classes.box__table__btn__text}>Click to expand</h5>
        </button>
      </div>
    </div>
  );
};
