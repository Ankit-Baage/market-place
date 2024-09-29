import React, { useEffect, useState } from "react";
import classes from "./customSelect.module.css";

export const CustomSelect = ({
  optionData = [],
  onSelection,
  selectedId,
  label,
  register,
  name, // name prop to register it with react-hook-form
}) => {
  const [currentSelection, setCurrentSelection] = useState(selectedId);

  // Update currentSelection if selectedId prop changes
  useEffect(() => {
    setCurrentSelection(selectedId);
  }, [selectedId]);

  const handleChange = (event) => {
    const optionId = event.target.value;
    setCurrentSelection(optionId);
    onSelection && onSelection(label, optionId);
  };

  return (
    <div className={classes.box}>
      <span className={classes.box__chevronDown}/>
      <select
        name={name}
        className={classes.box__select}
        onChange={handleChange}
        value={currentSelection || ""}
        {...(register ? register(name) : {})} // Register input for react-hook-form
      >
        <option value="" className={classes.box__option}>
          {label}
        </option>
        {optionData.length > 0 ? (
          optionData.map((option) => (
            <option
              key={option.id}
              value={option.id}
              className={classes.box__option}
            >
              {option.label}
            </option>
          ))
        ) : (
          <option disabled>No options available</option>
        )}
      </select>
    </div>
  );
};
