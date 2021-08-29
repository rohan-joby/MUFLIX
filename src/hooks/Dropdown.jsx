import { useState, useEffect, useRef } from "react";
import classes from "./Dropdown.module.css";
import { BiCaretDown } from "react-icons/bi";
import { BiCaretUp } from "react-icons/bi";

const Dropdown = ({ title, items, onClick }) => {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState();
  const dropdownRef = useRef(null);

  const toggle = () => setOpen((prev) => !prev);

  const handleOnClick = (item) => {
    setSelection(item);
    onClick(item.name);
  };
  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isItemInSelection = (item) =>
    selection?.id === item.id ? true : false;

  return (
    <div ref={dropdownRef} className={classes.dropdown}>
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
            <span className={classes.button}>
              {open ? <BiCaretUp size={14} /> : <BiCaretDown size={14} />}
            </span>
          </p>
        </div>
      </div>
      {open && (
        <ul className={classes[`dropdown-list`]}>
          {items.map((item) => (
            <li key={item.id}>
              <button
                className={classes[`dropdown-list_button`]}
                type="button"
                onClick={() => handleOnClick(item)}
              >
                <span
                  className={isItemInSelection(item) ? classes.selected : null}
                >
                  {item.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;

