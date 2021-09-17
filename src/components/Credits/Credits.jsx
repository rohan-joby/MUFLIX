import React from "react";
import classes from "./Credits.module.css";

const Credits = () => {
  return (
    <footer className={classes.credits}>
      <h4>
        developed by
        <span className={classes.link}>
          <a
            href="https://github.com/rohan-joby"
            alt="Github URL"
            target="_blank"
            rel="noreferrer"
          >
            Rohan Joby
          </a>
        </span>
      </h4>
    </footer>
  );
};

export default Credits;
