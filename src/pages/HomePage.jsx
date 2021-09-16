import React from "react";

import Navigation from "../components/Header/Navigation";
import Banner from "../components/Banner/Banner";
import AllGenre from "../components/BrowseMovies/AllGenre";

const HomePage = () => {
    return (
        <>
           <Navigation/>
           <Banner/>
           <AllGenre /> 
        </>
    )
}

export default HomePage
