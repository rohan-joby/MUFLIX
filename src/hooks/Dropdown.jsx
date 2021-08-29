import { useState } from "react";
// import onClickOutside from "react-onclickoutside";
import classes from "./Dropdown.module.css";
import { BiCaretDown } from "react-icons/bi";
import { BiCaretUp } from "react-icons/bi";

const Dropdown = ({ title, items, onClick }) => {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState();

  const toggle = () => setOpen((prev) => !prev);
  // Dropdown.handleClickOutside = () => setOpen(false);

  const handleOnClick = (item) => {
    setSelection(item);
    onClick(item.name)
  };
  const isItemInSelection = (item) =>
    selection?.id === item.id ? true : false;

  return (
    <div className={classes.dropdown}>
      <div
        className={classes[`dropdown-title`]}
        tabIndex={0}
        role="button"
        onKeyPress={toggle}
        onClick={toggle}
      >
        <div>
          <p>
            <span className={classes.label}>{selection?.name || title}</span>
            <span className={classes.button}>{open ? <BiCaretUp size={14}/> : <BiCaretDown size={14}/>}</span>
          </p>
          {/* <p>{title}</p> */}
        </div>
      </div>
      {open && (
        <ul className={classes[`dropdown-list`]}>
          {items.map((item) => (
            <li key={item.id}>
              <button className={classes[`dropdown-list_button`]} type="button" onClick={() => handleOnClick(item)}>
                <span className={isItemInSelection(item)? classes.selected:null}>{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// const clickOutsideConfig = {
//   handleClickOutside: () => Dropdown.handleClickOutside,
// };

export default Dropdown;
// export default onClickOutside(Dropdown, clickOutsideConfig);
