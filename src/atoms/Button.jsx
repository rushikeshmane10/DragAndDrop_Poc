import React from "react";
import { GoPlus } from "react-icons/go";

const Button = ({ title, icon, background, size ,onClick ,type="button",disable=false}) => {
  const className =
    background === "primary"
      ? `bg-[#015254] flex items-center ${size} cursor-pointer gap-x-1 text-[#FFF]  text-sm font-semibold px-4 py-2  rounded-md justify-center ${disable && "bg-gray-300 cursor-not-allowed"}`
      : background === "secondary"
      ? `bg-[#fff] flex items-center gap-x-1 ${size} cursor-pointer text-[#015254] border border-[#015254] text-sm font-semibold px-4 py-2 rounded-md justify-center  ${disable && "bg-gray-300 cursor-not-allowed"}`
      : background === "noBackground"
      ? `bg-[#B0B0B0] flex items-center  gap-x-1 ${size} cursor-pointer text-[#fff]  text-sm font-semibold px-4 py-2 rounded-md justify-center  ${disable && "bg-gray-300 cursor-not-allowed"}`
      : ``;

  return (
    <button onClick={onClick} className={className} type={type} disabled={disable}>
      {icon && <GoPlus />}
      {title}
    </button>
  );
};

export default Button;
