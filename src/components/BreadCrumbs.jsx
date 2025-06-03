import React from "react";
import { HiChevronRight } from "react-icons/hi";

const Breadcrumbs = ({ activeStep = 0, steps,handleClick }) => {
  return (
    <div className="flex items-center space-x-1 border border-gray-300 rounded-l px-4 py-2 text-sm bg-white">
      {steps.map((step, index) => {
        const isActive = index+1 === activeStep;


        return (
          <React.Fragment key={index}>
            {index > 0 && (
              <HiChevronRight className="text-gray-400 text-base" />
            )}
            <button
              className={`cursor-pointer ${
                isActive ? "font-bold text-black" : "text-gray-500"
              } `}
              onClick={()=>{
                handleClick(index+1)
              }}
            >
              {step}
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
