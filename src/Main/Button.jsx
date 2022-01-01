import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StartButton = (props) => {
  const { buttonName, setStart } = props;
  return (
    <div className="relative">
      <button
        type="button"
        className="bg-sky-200 text-gray-700 transition ease-in-out delay-150 hover:scale-105 duration-200 px-5 py-1 group bg-white rounded-md inline-flex items-center text-base font-medium"
        aria-expanded="false"
        onClick={() => setStart()}
      >
        <span>{buttonName}</span>
      </button>
    </div>
  );
};

const TrueFalseButton = (props) => {
  const { buttonName, flag, setFlag } = props;
  return (
    <div className="relative">
      <button
        type="button"
        className={`${
          flag ? "bg-green-300" : "bg-rose-300"
        } text-gray-700 transition ease-in-out delay-150 hover:scale-105 duration-300 px-5 py-1 group bg-white rounded-md inline-flex items-center text-base font-medium`}
        aria-expanded="false"
        onClick={() => {
          setFlag();
        }}
      >
        <span>{buttonName}</span>
      </button>
    </div>
  );
};

const SelectionButton = (props) => {
  const [open, setOpen] = useState(false);
  const { buttonName, icon } = props;
  return (
    <div className="relative">
      <button
        type="button"
        className="text-gray-400 px-5 py-1 group bg-white rounded-md inline-flex items-center text-base font-medium"
        aria-expanded="false"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <span>{buttonName}</span>
        {icon && <FontAwesomeIcon icon={icon} />}
      </button>
      {open && props.children}
    </div>
  );
};

export { SelectionButton, StartButton, TrueFalseButton };
