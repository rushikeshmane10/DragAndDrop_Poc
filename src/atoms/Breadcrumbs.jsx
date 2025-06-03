import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

const Breadcrumbs = ({ items = [] }) => {
  return (
    <div className="flex items-center gap-x-2 mt-4">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <MdKeyboardArrowRight className="pt-0.5 size-5 text-[#4F4F4F]" />
          )}
          {item.onClick ? (
            <button
              onClick={item.onClick}
              className={`text-sm ${
                item.isActive
                  ? "text-[#000] font-semibold"
                  : "text-[#4F4F4F] font-medium"
              }`}
            >
              {item.label}
            </button>
          ) : (
            <p
              className={`text-sm ${
                item.isActive
                  ? "text-[#000] font-semibold"
                  : "text-[#4F4F4F] font-medium"
              }`}
            >
              {item.label}
            </p>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;
