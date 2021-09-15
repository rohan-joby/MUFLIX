import React from "react";

import Navigation from "../components/Layout/Navigation";
import Banner from "../components/Browse/Banner/Banner";
import AllGenre from "../components/Browse/AllGenre";

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
