import React, { useState } from "react";

import classes from "./InputPasswordField.module.css";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const InputPasswordField = ({
  placeholder,
  passwordHasError,
  value,
  onChange,
  onBlur,
}) => {
  const [viewPassword, setViewPassword] = useState(false);
  const passwordViewChangelHandler = () => {
    setViewPassword((prev) => !prev);
  };
  return (
    <span className={classes.wrapper}>
      <input
        type={viewPassword ? "text" : "password"}
        name="password"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        className={`${classes.password} ${
          passwordHasError ? classes.invalid : ""
        }`}
      />
      <button className={classes.eye} type="button" onClick={passwordViewChangelHandler} tabIndex={-1} >
        {viewPassword ? <FaEyeSlash size={17} style={{ fill: '#fff' }}/>: <FaEye size={17} style={{ fill: '#fff' }}/>}
      </button>
    </span>
  );
};

export default InputPasswordField;
