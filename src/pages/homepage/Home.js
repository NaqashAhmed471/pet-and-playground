import React from "react";
import Banner from "../../components/banner/Banner";
import Budget from "../../components/budget/Budget";
import DiscoverProducts from "../../components/discover-products/DiscoverProducts";
import NewLetter from "../../components/newsletter.js/NewLetter";
import Playgrounds from "../../components/playgrounds/Playgrounds";

const Home = () => {
  return (
    <>
      <Banner />
      <div className="content">
        <Playgrounds />
        <Budget />
        <DiscoverProducts />
        <NewLetter />
      </div>
    </>
  );
};

export default Home;
