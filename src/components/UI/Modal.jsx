import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import { useHistory } from "react-router-dom";
import { VscChromeClose } from "react-icons/vsc";

const Backdrop = (props) => {
  const history = useHistory();
  const handleClose = () => {
    history.goBack();
  };
  return <div className={classes.backdrop} onClick={handleClose} />;
};

const ModalOverlay = (props) => {
  const history = useHistory();
  const handleClose = () => {
    history.goBack();
  };
  return (
    <div className={classes.overlay}>
      <button className={`${classes[`close-button`]}`} onClick={handleClose}>
        <VscChromeClose size={20} style={{ fill: "white" }} />
      </button>
      {props.children}
    </div>
  );
};

const Modal = (props) => {
  const modalElement = document.getElementById("overlay");
  return (
    <div>
      {ReactDOM.createPortal(<Backdrop />, modalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        modalElement
      )}
    </div>
  );
};

export default Modal;
