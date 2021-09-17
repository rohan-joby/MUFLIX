import React from "react";

import Navigation from "../components/Header/Navigation";
import Banner from "../components/Banner/Banner";
import AllGenre from "../components/BrowseMovies/AllGenre";
import Credits from "../components/Credits/Credits";

const HomePage = () => {
    return (
        <>
           <Navigation/>
           <Banner/>
           <AllGenre /> 
           <Credits/>
        </>
    )
}

export default HomePage
