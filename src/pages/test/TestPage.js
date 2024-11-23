import React, { useState } from 'react';

// Sample data structure with nested arrays
export const dropdownData = [
  {
    id: 1,
    title: 'Category 1',
    subitems: [
      {
        id: 11,
        title: 'Subcategory 1.1',
        subitems: [
          { id: 111, title: 'Sub-subcategory 1.1.1' },
          { id: 112, title: 'Sub-subcategory 1.1.2' },
        ],
      },
      {
        id: 12,
        title: 'Subcategory 1.2',
      },
    ],
  },
  {
    id: 2,
    title: 'Category 2',
    subitems: [
      {
        id: 21,
        title: 'Subcategory 2.1',
      },
      {
        id: 22,
        title: 'Subcategory 2.2',
      },
    ],
  },
];

export const NestedDropdown = ({ data }) => {
  const [openItems, setOpenItems] = useState([]);

  // Function to toggle the dropdown for a specific item
  const toggleDropdown = (id) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Recursive function to render the dropdown
  const renderDropdown = (items) => (
    <ul className="dropdown-list">
      {items?.map((item) => (
        <li key={item.id}>
          <div>
            <button
              onClick={() => toggleDropdown(item.id)}
              aria-expanded={openItems.includes(item.id)}
              aria-controls={`dropdown-${item.id}`}
            >
              {item.title}
            </button>
            {item.subitems && (
              <div
                id={`dropdown-${item.id}`}
                className="nested-dropdown"
                style={{ display: openItems.includes(item.id) ? 'block' : 'none' }}
              >
                {renderDropdown(item.subitems)}
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );

  return <div>{renderDropdown(data)}</div>;
};

