import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BookCart from "../BookCard/BookCart";
import Slider from "react-slick";
import Loder from "../../Layouts/Loder/Loder";

const RecentlyAdded = () => {
  const [Data, setData] = useState();

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/api/v1/get-recent-books");
      setData(response.data.data);
    };
    fetch();
  }, []);

  // Slider settings for mobile only
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    
  };

  return (
    <>
      <div className="mt-8 px-4">
        <h4 className="text-ywhite text-lg lg:text-2xl font-semibold">Recently Added Books</h4>

        {!Data && <div className="flex items-center justify-center my-8"><Loder /></div>}

        {/* Grid Layout for Tablets and Large Screens */}
        <div className="my-8 hidden md:grid grid-cols-2 lg:grid-cols-4 md:grid-cols-2 gap-4">
          {Data && Data.map((items, i) => (
            <div key={i}>
              <BookCart data={items} />
            </div>
          ))}
        </div>

        {/* Slider for Mobile Screens ONLY */}
        {Data && (
          <div className="my-8 md:hidden">
            <Slider {...settings}>
              {Data.map((items, i) => (
                <div key={i}>
                  <BookCart data={items} />
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </>
  );
};

export default RecentlyAdded;
