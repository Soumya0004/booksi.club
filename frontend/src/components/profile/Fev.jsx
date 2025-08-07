import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCart from "../BookCard/BookCart";
const BACKEND_API = import.meta.env.VITE_BACKEND_API;

const fev = () => {
  const [FevouriteBook, setFevouriteBook] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `${BACKEND_API}/api/v1/get-favorite-book`,
        { headers }
      );
      setFevouriteBook(response.data.data);
    };
    fetch();
  }, []);

  return (
    <>
      {FevouriteBook && FevouriteBook.length === 0 && (
        <div className="text-5xl font-semibold flex items-center justify-center h-[100%] text-zinc-700">
          No Such Books Added
        </div>
      )}

      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4  px-8 md:px-0">
        {FevouriteBook &&
          FevouriteBook.map((items, i) => (
            <div key={i}>
              <BookCart data={items} favourite={true} />
            </div>
          ))}
      </div>
    </>
  );
};

export default fev;
