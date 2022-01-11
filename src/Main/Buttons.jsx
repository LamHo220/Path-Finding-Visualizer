import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";

const StartButton = (props) => {
  const { buttonName, setStart } = props;
  return (
    <div className="relative">
      <button
        type="button"
        className="dark:bg-sky-800 dark:text-white bg-sky-200 text-gray-700 transition ease-in-out delay-150 hover:scale-105 duration-200 px-5 py-1 group bg-white rounded-md inline-flex items-center text-base font-medium"
        aria-expanded="false"
        onClick={() => {
          setStart();
        }}
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
          flag
            ? "bg-green-300 dark:bg-green-700"
            : "bg-rose-300 dark:bg-rose-900"
        } dark:text-white text-gray-700 transition ease-in-out delay-150 hover:scale-105 duration-300 px-5 py-1 group bg-white rounded-md inline-flex items-center text-base font-medium`}
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
  const { buttonName, icon } = props;
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (open && ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [open]);
  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className="dark:bg-gray-900 text-gray-400 dark:text-white px-5 py-1 transition ease-in-out delay-150 hover:scale-105 duration-300 hover:text-gray-600 group bg-white rounded-md inline-flex items-center text-base font-medium"
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

const DarkMode = (props) => {
  return (
    <a href="#" onClick={() => props.f()} className="px-5">
      <FontAwesomeIcon icon={faMoon} />
    </a>
  );
};

export { SelectionButton, StartButton, TrueFalseButton, DarkMode };
