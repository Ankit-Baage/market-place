import React from "react";
import classes from "./lotTable.module.css";

export const LotTable = ({ transformedLotTable, tableHeaders }) => {
  
  return (
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
            {transformedLotTable.map((row, index) => (
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
    </div>
  );
};
