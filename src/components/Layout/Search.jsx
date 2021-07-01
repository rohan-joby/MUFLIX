import React, { useRef, useEffect } from "react";
import { BsSearch } from "react-icons/bs";

import useHttp from "../../hooks/use-http";
import { searchMovies } from "../../lib/api";

import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./Search.module.css";

const Search = () => {
    const inputRef = useRef();
    let searchFormatted;

    const searchHandler = (event) => {
        event.preventDefault();
        const search = inputRef.current.value;
        searchFormatted = search.toLowerCase().split(" ").join("+");
        console.log(searchFormatted);
        inputRef.current.value="";
    }
    
    const { sendRequest, status, data: searchResults } = useHttp(searchMovies);

    useEffect(() => {
        sendRequest(searchFormatted);
    }, [searchFormatted,sendRequest])

    if ( status === "pending"){
        return <LoadingSpinner />;
    }
      
    if (status === "completed" && searchResults) {
        //LOGIC TO DISPLAY RESULTS
        console.log(searchResults);
        console.log("completed");
      }
    return (
        <form onSubmit={searchHandler} className={classes.search}>
            <label htmlFor="query"></label>
            <input autocomplete="off" type="search" ref={inputRef} id="query"/>        
            <button className={classes.search__btn}><BsSearch size={25} style={{fill:"white"}}/></button>
        </form>
    )
}

export default Search;
