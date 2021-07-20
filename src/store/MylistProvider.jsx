import React, { useState } from "react";
import MylistContext from "./mylist-context";

const MylistProvider = (props) => {
  const initialList = JSON.parse(localStorage.getItem("mylist")) || [];

  const [mylist, setMylist] = useState(initialList);
  const isListEmpty = mylist.length > 0;

  const addToListHandler = (id) => {
    console.log(JSON.stringify([id]))
    const newList = mylist.length > 0 ? [id,...mylist] : [id];
    setMylist((prevValue) => {
      return prevValue.length > 0 ? [id, ...prevValue] : [id];
    });
    localStorage.setItem("mylist", JSON.stringify(newList));
  };
  const removeFromListHandler = (id) => {
    const list = mylist;
    const newList = list.filter((item) => item !== id);
    setMylist(newList);
    localStorage.setItem("mylist", JSON.stringify(newList));
  };
  const checkMylist = (id) => {
    const isMoviePresent = mylist.find((movie) => id === movie);
    return isMoviePresent === undefined ? false : true;
  };

  const mylistValue = {
    isEmpty: isListEmpty,
    mylist: mylist,
    addToList: addToListHandler,
    removeFromList: removeFromListHandler,
    isInList: checkMylist,
  };
  return (
    <MylistContext.Provider value={mylistValue}>
      {props.children}
    </MylistContext.Provider>
  );
};

export default MylistProvider;
