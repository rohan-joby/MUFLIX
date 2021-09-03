import { useState } from "react";

const useInput = (validateInput) => {
  const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validateInput(value);
  const hasError = !isValid && isTouched;

  const updateValue = (e) => {
    setValue(e.target.value);
  };

  const updateTouch = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setValue("");
    setIsTouched(false);
  };

  return {
    value,
    isValid,
    hasError,
    updateValue,
    updateTouch,
    reset,
  };
};

export default useInput;
