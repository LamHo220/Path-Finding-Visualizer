import { faChevronDown, faCog } from "@fortawesome/free-solid-svg-icons";
import { SelectionButton } from "./Buttons";

const Dropdown = (props) => {
  const { name } = props;

  return (
    <SelectionButton buttonName={name} icon={name===""?faCog:faChevronDown}>
      <div className="absolute">
        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden ">
          {props.children}
        </div>
      </div>
    </SelectionButton>
  );
};

const DropdownItem = (props) => {
  const { f } = props;
  return (
    <div className="dark:bg-gray-800 relative grid gap-2 bg-white px-3 py-2">
      <a
        onClick={() => f()}
        href="#"
        className="transition ease-in-out delay-150 hover:scale-105 duration-100 hover:text-gray-900 text-gray-400 dark:text-white text-sm whitespace-nowrap p-1 flex items-start rounded-lg "
      >
        {props.children}
      </a>
    </div>
  );
};

export { Dropdown, DropdownItem };
