import React from "react";
import { motion } from "framer-motion";
import classes from "./expandedModelTable.module.css";
import sort from "../../../assets/sort.svg";

export const ExpandedModelTable = ({
  transformedExpandedModelTable,
  tableHeaders,
  onClose,
  onSort,
}) => {
  const collapseTable = () => {
    onClose();
  };

  const handleSort = (columName) => {
    onSort(columName);
    console.log(columName);
  };
  return (
    <motion.div
      className={classes.backDrop}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 0.5, ease: "easeInOut" },
      }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
      onClick={collapseTable}
    >
      <div className={classes.box} onClick={(event) => event.stopPropagation()}>
        <div className={classes.box__table}>
          <div className={classes.box__table__container}>
            <table className={classes.box__modelTable}>
              <thead className={classes.box__modelTable__head}>
                <tr className={classes.box__modelTable__head__row}>
                  {tableHeaders.map((header) => (
                    <th
                      key={header}
                      className={classes.box__modelTable__head__row__cell}
                      onClick={() => handleSort(header)}
                    >
                      {header}
                      <img
                        src={sort}
                        alt="Sort"
                        className={
                          classes.box__modelTable__head__row__cell__sort
                        }
                      />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className={classes.box__modelTable__body}>
                {transformedExpandedModelTable.map((row, index) => (
                  <tr
                    key={index}
                    className={classes.box__modelTable__body__row}
                  >
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

          <button
            className={classes.box__table__btn}
            onClick={collapseTable}
          ></button>
        </div>
      </div>
    </motion.div>
  );
};
