import React, { useState, useEffect } from "react";

import { IoChevronDownOutline } from "react-icons/io5";
import useComponentVisible from "../hooks/useComponentVisible";

const DropDownCheckbox = ({
  options,
  onChange,
  placeholder = "Select options",
  disabled = false,
  touched = false,
  error = "",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const [hasSelection, setHasSelection] = useState(false);
  const toggleDropdown = () => {
    setIsComponentVisible(!isComponentVisible);
  };

  const handleCheckboxChange = (option) => {
    const updatedOptions = options.map((item) => {
      if (item.value === option.value) {
        return { ...item, isCheck: !item.isCheck };
      }
      return item;
    });
    onChange(updatedOptions);
  };


useEffect(() => {
    const selectedCount = options.filter(
      (option) => option.isCheck
    ).length;
    setHasSelection(selectedCount );
  }, [options]);



  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const mainDivClassName = `items-left relative border bg-gray-50 py-0.5 text-gray-500 rounded-lg leading-tight focus:outline-none focus:border-[#002c43] focus:ring-[#002c43] cursor-pointer ${
    disabled ? " !bg-gray-200 border-1 border-gray-300" : ""
  } ${isComponentVisible ? "ring-1 ring-[#002c43]" : ""} ${
    touched && error && !isComponentVisible
      ? "bg-red-100 ring-1 ring-red-500 text-red-700"
      : ""
  }`;

  return (
   <div className={mainDivClassName}>
        <div
          className="flex p-2 bg-white rounded-md text-sm justify-between items-center"
          onClick={toggleDropdown}
        >
          {`${hasSelection} Selected Campaign `}
          <div className="text-gray-500">
            <IoChevronDownOutline />
          </div>
        </div>
 
        {isComponentVisible && (
          <div
            ref={ref}
            className="absolute shadow-md shadow-bottom shadow-right shadow-left rounded-md translate-y-4 w-[100%] max-h-52 z-10 bg-white"
          >
            <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200">
              {filteredOptions.map((option, index) => (
                <li key={index}>
                  <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input
                      id={`checkbox-item-${index}`}
                      type="checkbox"
                      checked={option.isCheck}
                      onChange={() => handleCheckboxChange(option)}
                      className="w-4 h-4 text-[#015254] bg-gray-100 border-gray-300 rounded focus:ring-[#015254] dark:focus:ring-[#015254] dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor={`checkbox-item-${index}`}
                      className="w-full ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {option.label}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
  );
};


export default DropDownCheckbox;
