import React from "react";

const MylistContext = React.createContext({
    isEmpty:false,
    mylist:[],
    addToList: (id) => {},
    removeFromList: (id) => {},
    isInList: (id) => {}
})

export default MylistContext;