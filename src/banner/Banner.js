import React, { useEffect, useState } from "react";
import "./Banner.css";
import axios from "../axiosSetup";
import requests from "../api/requests";

function Banner() {
  function shorten(str, num) {
    return str?.length > num ? str.substr(0, num - 1) + "..." : str;
  }

  const [bannerData, setBannerData] = useState([]);
  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function getData() {
      const req = await axios.get(requests.getNetflixOriginals);
      setBannerData(
        req.data.results[
          Math.floor(Math.random() * req.data.results.length - 1)
        ]
      );
      return req;
    }
    getData();
  }, []);

  return (
    bannerData && (
      <header
        className="banner_container"
        style={{
          backgroundImage: `url(${BASE_IMAGE_URL}${bannerData?.backdrop_path})`,
        }}
      >
        <div className="banner_items">
          <h1 className="banner_name"> {bannerData.name}</h1>
          <div className="buttons">
            <button className="banner_button"> Play</button>
            <button className="banner_button">Add To List</button>
          </div>
          <h1 className="banner_desc">{shorten(bannerData.overview, 150)}</h1>
        </div>
        <div className="bottomFade"></div>
      </header>
    )
  );
}

export default Banner;
